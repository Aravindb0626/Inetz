import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

// ─── GET: HIGH-SPEED PAGINATED STUDENT DIRECTORY FEEDS ──────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.trim() || "";
    const domainFilter = searchParams.get("domain")?.trim() || "All";
    const fromDate = searchParams.get("fromDate")?.trim() || "";
    const toDate = searchParams.get("toDate")?.trim() || "";
    
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 20);
    const skip = (page - 1) * limit;

    const matchStage: any = {};

    // 1. Search Query Match
    if (search) {
      matchStage.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { college: { $regex: search, $options: "i" } },
        { domain: { $regex: search, $options: "i" } },
      ];
    }

    // 2. Domain Filter Match
    if (domainFilter && domainFilter !== "All") {
      const escapedDomain = domainFilter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      matchStage.domain = new RegExp(`^${escapedDomain}$`, "i");
    }

    // 🎯 3. Date Range Filter Match
    if (fromDate || toDate) {
      matchStage.createdAt = {};
      if (fromDate) {
        // Start of selected day (00:00:00)
        matchStage.createdAt.$gte = new Date(`${fromDate}T00:00:00.000Z`);
      }
      if (toDate) {
        // End of selected day (23:59:59)
        matchStage.createdAt.$lte = new Date(`${toDate}T23:59:59.999Z`);
      }
    }

    const [aggregationResult, rawDistinctDomains] = await Promise.all([
      Student.aggregate([
        { $match: matchStage },
        {
          $facet: {
            metadata: [
              {
                $group: {
                  _id: null,
                  totalStudents: { $sum: 1 },
                  totalCollected: { $sum: { $ifNull: ["$totalCollection", 0] } },
                  totalPending: { $sum: { $ifNull: ["$pendingAmount", 0] } },
                  accountsWithDues: {
                    $sum: { $cond: [{ $gt: ["$pendingAmount", 0] }, 1, 0] },
                  },
                  clearedAccounts: {
                    $sum: { $cond: [{ $lte: ["$pendingAmount", 0] }, 1, 0] },
                  },
                },
              },
            ],
            dataRows: [
              { $sort: { updatedAt: -1 } },
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  sNo: 1,
                  doj: 1,
                  name: 1,
                  email: 1,
                  phone: 1,
                  college: 1,
                  domain: 1,
                  duration: 1,
                  totalBilling: 1,
                  totalCollection: 1,
                  balanceAmount: { $ifNull: ["$pendingAmount", 0] },
                  pendingAmount: 1,
                  feesStatus: 1,
                  certificateStatus: 1,
                  installments: 1,
                  createdAt: 1,
                },
              },
            ],
          },
        },
      ]),
      Student.distinct("domain"),
    ]);

    const facet = aggregationResult[0];
    const meta = facet.metadata[0] || {
      totalStudents: 0,
      totalCollected: 0,
      totalPending: 0,
      accountsWithDues: 0,
      clearedAccounts: 0,
    };

    const cleanAppliedDomains = (rawDistinctDomains || [])
      .filter((d: any) => typeof d === "string" && d.trim().length > 0)
      .map((d: string) => d.trim())
      .sort();

    return NextResponse.json({
      success: true,
      students: facet.dataRows,
      availableDomains: Array.from(new Set(["All", ...cleanAppliedDomains])),
      summary: {
        totalStudents: meta.totalStudents || 0,
        totalCollected: meta.totalCollected || 0,
        totalPending: meta.totalPending || 0,
        duesCount: meta.accountsWithDues || 0,
        clearCount: meta.clearedAccounts || 0,
      },
      pagination: {
        total: meta.totalStudents,
        currentPage: page,
        totalPages: Math.ceil(meta.totalStudents / limit) || 1,
      },
    });
  } catch (error: any) {
    console.error("Student directory aggregation failure:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server Error" },
      { status: 500 }
    );
  }
}

// ─── POST: CREATE A NEW STUDENT PROFILE (ADMIN MANUAL ENTRY) ─────────────────
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const {
      name,
      email,
      phone,
      college,
      domain,
      duration,
      totalBilling,
      initialPayment,
      paymentMethod,
      billingBy
    } = body;

    const studentName = (name || "").trim();
    const studentPhone = (phone || "").trim();
    const studentEmail = (email || "").trim().toLowerCase();

    if (!studentName || !studentPhone) {
      return NextResponse.json(
        { success: false, error: "Student Name and Phone Number are required." },
        { status: 400 }
      );
    }

    // Check if phone or email already exists
    const existingStudent = await Student.findOne({
      $or: [
        { phone: studentPhone },
        ...(studentEmail ? [{ email: studentEmail }] : [])
      ]
    });

    if (existingStudent) {
      return NextResponse.json(
        { success: false, error: "A student record with this phone number or email already exists." },
        { status: 400 }
      );
    }

    // Auto-calculate Next Serial Number (sNo)
    const lastStudent = await Student.findOne({}, { sNo: 1 }).sort({ sNo: -1 }).lean();
    const nextSNo = lastStudent && typeof lastStudent.sNo === "number" ? lastStudent.sNo + 1 : 1;

    // Format Date of Joining
    const displayDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const billingTotal = Number(totalBilling) || 0;
    const initialPaid = Number(initialPayment) || 0;

    // Optional initial installment if cash/gpay collected at time of creation
    const installments = initialPaid > 0 ? [{
      receiptNo: `IT-ADM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: displayDate,
      paidAmount: initialPaid,
      paymentMethod: paymentMethod === "GPay" ? "GPay" : "Cash",
      transactionId: "N/A",
      billingBy: billingBy || "Admin Manual Entry"
    }] : [];

    const newStudent = new Student({
      sNo: nextSNo,
      doj: displayDate,
      name: studentName,
      email: studentEmail || "",
      phone: studentPhone,
      college: college?.trim() || "N/A",
      domain: domain || "Web Development",
      duration: duration || "1 Month",
      totalBilling: billingTotal,
      installments: installments,
      totalCollection: initialPaid,
      pendingAmount: Math.max(0, billingTotal - initialPaid),
      feesStatus: (billingTotal - initialPaid) === 0 && billingTotal > 0 ? "Clear" : "Pending",
      certificateStatus: "Pending"
    });

    await newStudent.save();

    return NextResponse.json({
      success: true,
      message: "Student record created successfully.",
      data: newStudent
    }, { status: 201 });

  } catch (error: any) {
    console.error("Student manual creation failure:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create student record." }, { status: 500 });
  }
}

// ─── PUT: EDIT EXISTING STUDENT DATA SAFELY (ENUM CONSTRAINTS ALIGNED) ──────
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id, name, email, phone, college, domain, duration, totalBilling } = data;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Target Document Student ID." }, { status: 400 });
    }

    const currentStudent = await Student.findById(id);
    if (!currentStudent) {
      return NextResponse.json({ success: false, error: "Student profile not found." }, { status: 404 });
    }

    const updatedBilling = Number(totalBilling) || currentStudent.totalBilling;
    const newPendingAmount = Math.max(0, updatedBilling - (currentStudent.totalCollection || 0));
    
    const newFeesStatus = newPendingAmount === 0 ? "Clear" : "Pending";

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name?.trim(),
          email: email?.trim().toLowerCase(),
          phone: phone?.trim(),
          college: college?.trim(),
          domain,
          duration,
          totalBilling: updatedBilling,
          pendingAmount: newPendingAmount,
          feesStatus: newFeesStatus
        }
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, data: updatedStudent });
  } catch (error: any) {
    console.error("Student directory update failure:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─── DELETE: REMOVE A STUDENT RECORD ENTIRELY ───────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Target Document ID." }, { status: 400 });
    }

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Profile does not exist or was already deleted." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Student record dropped successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}