import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone")?.trim();
    
    // ─── OPTIMIZATION ENGINE: PAGING & FILTER CONSTANTS ───
    const search = searchParams.get("search")?.trim() || "";
    const domainFilter = searchParams.get("domain") || "All";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 20); // Sends only 20 rows per batch
    const skip = (page - 1) * limit;

    // ─── BRANCH A: SINGLE STUDENT LOOKUP BY PHONE ───
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

    // ─── BRANCH B: SCALABLE HIGH-SPEED LOOKUP LOGIC ───
    // 1. Build Query Match Filters dynamically on the database level
    const matchStage: any = {};
    
    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { college: { $regex: search, $options: "i" } }
      ];
    }
    
    if (domainFilter !== "All") {
      matchStage.domain = domainFilter;
    }

    // 2. High-Speed Database Facet Query Aggregation Loop Pipeline
    // This calculates metadata stats and pages profiles simultaneously in 1 query pass!
    const aggregationResult = await Student.aggregate([
      { $match: matchStage },
      {
        $facet: {
          metadata: [
            {
              $group: {
                _id: null,
                totalStudents: { $sum: 1 },
                accountsWithDues: {
                  $sum: { $cond: [ { $gt: [ { $subtract: ["$totalBilling", "$totalCollection"] }, 0 ] }, 1, 0 ] }
                },
                clearedAccounts: {
                  $sum: { $cond: [ { $lte: [ { $subtract: ["$totalBilling", "$totalCollection"] }, 0 ] }, 1, 0 ] }
                }
              }
            }
          ],
          uniqueDomains: [
            { $group: { _id: "$domain" } },
            { $match: { _id: { $ne: null } } }
          ],
          dataRows: [
            { $sort: { updatedAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                name: 1,
                phone: 1,
                college: 1,
                domain: 1,
                duration: 1,
                totalBilling: 1,
                balanceAmount: { $subtract: ["$totalBilling", "$totalCollection"] },
                installments: 1
              }
            }
          ]
        }
      }
    ]);

    const facet = aggregationResult[0];
    const meta = facet.metadata[0] || { totalStudents: 0, accountsWithDues: 0, clearedAccounts: 0 };
    const cleanDomains = facet.uniqueDomains.map((d: any) => d._id);

    return NextResponse.json({
      success: true,
      students: facet.dataRows,
      availableDomains: ["All", ...cleanDomains],
      pagination: {
        total: meta.totalStudents,
        duesCount: meta.accountsWithDues,
        clearCount: meta.clearedAccounts,
        currentPage: page,
        totalPages: Math.ceil(meta.totalStudents / limit)
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// ─── POST: SAVE PAYMENT (HANDLES CREATION & NESTED INSTALLMENT APPENDS) ───
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    const currentPaid = Number(data.paidAmount) || 0;
    const phone = data.phone.trim();

    const newInstallment = {
      receiptNo: data.receiptNo,
      date: data.displayDate,
      paidAmount: currentPaid,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      billingBy: data.billingBy
    };

    // 🎯 FIX: Atomic Upsert Operation
    // If student exists, it pushes the installment and increments balances safely.
    // If student doesn't exist, 'upsert: true' creates the document from scratch.
    const updatedStudent = await Student.findOneAndUpdate(
      { phone: phone },
      {
        // 1. Atomically push into the array without loading it into memory
        $push: { installments: newInstallment },
        
        // 2. Atomically increment total collections and reduce pending values
        $inc: { 
          totalCollection: currentPaid,
          pendingAmount: -currentPaid 
        },
        
        // 3. Set standard static field parameters securely if it's a new document
        $setOnInsert: {
          doj: data.displayDate,
          name: data.name.trim(),
          college: data.college.trim(),
          domain: data.domain,
          duration: data.courseName,
          totalBilling: Number(data.totalCoursePayment) || 0,
        }
      },
      { 
        new: true, 
        upsert: true, // Auto-creates profile if phone number isn't registered yet
        runValidators: true 
      }
    );

    // Dynamic double check fallback to fix pendingAmount edge cases on brand new students
    if (updatedStudent && updatedStudent.installments.length === 1) {
      updatedStudent.pendingAmount = updatedStudent.totalBilling - currentPaid;
      await updatedStudent.save();
    }

    return NextResponse.json({ success: true, receiptNo: data.receiptNo });
  } catch (error: any) {
    console.error("Critical Concurrent Write Exception: ", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}