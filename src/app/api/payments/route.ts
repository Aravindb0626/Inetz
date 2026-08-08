import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone")?.trim();

    // ─── BRANCH A: SINGLE STUDENT LOOKUP BY PHONE (FOR MODAL AUTOFILL) ───
    if (phone) {
      const student = await Student.findOne({ phone });
      if (!student) return NextResponse.json({ exists: false });
      return NextResponse.json({
        exists: true,
        name: student.name,
        college: student.college,
        domain: student.domain,
        courseName: student.duration, 
        totalBilling: student.totalBilling,
        totalAccumulatedPaid: student.totalCollection || 0
      });
    }

    // ─── BRANCH B: TRANSACTIONS LEDGER (ISOLATED DATE BOUNDARY FILTERS) ───
    const search = searchParams.get("search")?.trim() || "";
    const isDownload = searchParams.get("download") === "true"; 
    
    const startDateParam = searchParams.get("startDate")?.trim();
    const endDateParam = searchParams.get("endDate")?.trim();
    
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 20);
    const skip = (page - 1) * limit;

    // 1. Core text search stage matching student parameters
    const matchStage: any = {};
    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { college: { $regex: search, $options: "i" } },
        { "installments.receiptNo": { $regex: search, $options: "i" } }
      ];
    }

    // 2. High-Performance Aggregation Matrix
    const pipeline: any[] = [
      { $match: matchStage },
      { $unwind: { path: "$installments", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          receiptNo: { $ifNull: ["$installments.receiptNo", "REGISTRATION-PENDING"] },
          date: { $ifNull: ["$installments.date", "$doj"] },
          name: 1,
          phone: 1,
          college: { $ifNull: ["$college", "N/A"] },
          domain: { $ifNull: ["$domain", "Web development"] },
          courseName: { $ifNull: ["$duration", "1 Month"] },
          paidAmount: { $ifNull: ["$installments.paidAmount", 0] },
          paymentMethod: { $ifNull: ["$installments.paymentMethod", "Cash"] },
          transactionId: { $ifNull: ["$installments.transactionId", "N/A"] },
          billingBy: { $ifNull: ["$installments.billingBy", "System Registration"] },
          totalCoursePayment: { $ifNull: ["$totalBilling", 0] },
          createdAt: { $ifNull: ["$installments.createdAt", "$createdAt"] }
        }
      }
    ];

    // 🎯 LOCALIZED DATE FILTER LAYER
    if (startDateParam || endDateParam) {
      const dateFilter: any = {};
      if (startDateParam) {
        dateFilter.$gte = new Date(`${startDateParam}T00:00:00.000Z`);
      }
      if (endDateParam) {
        dateFilter.$lte = new Date(`${endDateParam}T23:59:59.999Z`);
      }
      pipeline.push({ $match: { createdAt: dateFilter } });
    }

    // Global Chronological Sort
    pipeline.push({ $sort: { createdAt: -1, receiptNo: -1 } });

    let finalTransactions = [];
    let totalLogs = 0;

    // 🎯 FIXED: When isDownload is true, execute the array without injection of $skip and $limit facets
    if (isDownload) {
      finalTransactions = await Student.aggregate(pipeline);
      totalLogs = finalTransactions.length;
    } else {
      pipeline.push({
        $facet: {
          metadata: [{ $count: "totalLogs" }],
          dataRows: [{ $skip: skip }, { $limit: limit }]
        }
      });
      const aggregationResult = await Student.aggregate(pipeline);
      const facet = aggregationResult[0];
      totalLogs = facet.metadata[0]?.totalLogs || 0;
      finalTransactions = facet.dataRows || [];
    }

    // 3. Reconstruct running totals over the targeted active viewport data records
    const activeStudents = await Student.find({
      phone: { $in: finalTransactions.map((t: any) => t.phone) }
    }).lean();

    const formattedTransactions = finalTransactions.map((tx: any) => {
      const match = activeStudents.find((s: any) => s.phone === tx.phone);
      let calculatedAlreadyPaid = 0;

      if (match && match.installments && tx.receiptNo !== "REGISTRATION-PENDING") {
        const sortedHistory = [...match.installments].sort(
          (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        let runningSum = 0;
        for (const inst of sortedHistory) {
          if (inst.receiptNo === tx.receiptNo) {
            calculatedAlreadyPaid = runningSum;
            break;
          }
          runningSum += Number(inst.paidAmount) || 0;
        }
      }

      return {
        receiptNo: tx.receiptNo,
        date: tx.date,
        name: tx.name,
        phone: tx.phone,
        college: tx.college,
        domain: tx.domain,
        courseName: tx.courseName,
        paidAmount: tx.paidAmount,
        paymentMethod: tx.paymentMethod,
        transactionId: tx.transactionId,
        billingBy: tx.billingBy,
        totalCoursePayment: tx.totalCoursePayment,
        alreadyPaidAmount: calculatedAlreadyPaid,
        balanceAmount: Math.max(0, tx.totalCoursePayment - (calculatedAlreadyPaid + tx.paidAmount))
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedTransactions,
      pagination: isDownload ? null : {
        total: totalLogs,
        currentPage: page,
        totalPages: Math.ceil(totalLogs / limit)
      }
    });

  } catch (error: any) {
    console.error("Audit ledger generation failure: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─── POST: SAVE PAYMENT (HANDLES CREATION & NESTED INSTALLMENT APPENDS) ───
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const currentPaid = Number(data.paidAmount) || 0;
    
    const newInstallment = {
      receiptNo: data.receiptNo,
      date: data.displayDate,
      paidAmount: currentPaid,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId || "N/A",
      billingBy: data.billingBy,
      createdAt: new Date() 
    };

    let student = await Student.findOne({ phone: data.phone.trim() });

    if (student) {
      student.installments.push(newInstallment);
      await student.save(); 
    } else {
      const count = await Student.countDocuments();
      student = new Student({
        sNo: count + 1,
        doj: data.displayDate,
        name: data.name.trim(),
        phone: data.phone.trim(),
        college: data.college.trim(),
        domain: data.domain,
        duration: data.courseName, 
        totalBilling: Number(data.totalCoursePayment) || 0,
        installments: [newInstallment],
        pendingAmount: (Number(data.totalCoursePayment) || 0) - currentPaid
      });
      await student.save();
    }
    
    return NextResponse.json({ success: true, receiptNo: data.receiptNo });
  } catch (error: any) {
    console.error("Payment registration route crash: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}