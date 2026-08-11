import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

// ─── GET: HIGH-SPEED PAGINATED STUDENT DIRECTORY FEEDS ──────────────────────

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);

    // 1. Extract Query Parameters
    const search = searchParams.get("search")?.trim() || "";
    const domain = searchParams.get("domain")?.trim() || "";
    const duration = searchParams.get("duration")?.trim() || ""; // 🎯 Duration filter
    const fromDate = searchParams.get("fromDate")?.trim() || "";
    const toDate = searchParams.get("toDate")?.trim() || "";

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "15", 10);
    const skip = (page - 1) * limit;

    // 2. Build MongoDB Match Query
    const query: Record<string, any> = {};

    // Domain Filter
    if (domain && domain !== "All") {
      query.domain = domain;
    }

    // 🎯 Duration Filter (Exact match or case-insensitive regex match)
    if (duration && duration !== "All") {
      const escapedDuration = duration.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.duration = { $regex: new RegExp(`^${escapedDuration}$`, "i") };
    }

    // Date Range Filter (Supports ISO date string or createdAt)
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) query.createdAt.$gte = new Date(fromDate);
      if (toDate) {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999);
        query.createdAt.$lte = endOfDay;
      }
    }

    // Search Filter (Matches Name, Email, or Phone)
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const searchRegex = new RegExp(escapedSearch, "i");

      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { college: searchRegex },
      ];
    }

    // 3. Fetch Students & Total Count
    const [students, totalStudents] = await Promise.all([
      Student.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Student.countDocuments(query),
    ]);

    // 4. Calculate Dynamic Summary Metrics based on Filtered Results
    const allFilteredStudents = await Student.find(query)
      .select("totalBilling totalCollection installments pendingAmount feesStatus")
      .lean();

    let totalCollected = 0;
    let totalBilling = 0;
    let duesCount = 0;

    allFilteredStudents.forEach((student: any) => {
      const billing = Number(student.totalBilling || 0);

      // Sum installments array if present
      let collected = 0;
      if (Array.isArray(student.installments) && student.installments.length > 0) {
        collected = student.installments.reduce(
          (sum: number, inst: any) => sum + (Number(inst.paidAmount) || 0),
          0
        );
      } else {
        collected = Number(student.totalCollection || 0);
      }

      totalBilling += billing;
      totalCollected += collected;

      if (billing - collected > 0) {
        duesCount++;
      }
    });

    const totalPending = Math.max(0, totalBilling - totalCollected);

    // 5. Fetch Unique Domains for Dropdown
    const availableDomainsRaw = await Student.distinct("domain");
    const availableDomains = [
      "All",
      ...availableDomainsRaw.filter((d: string) => d && d.trim() !== ""),
    ];

    return NextResponse.json(
      {
        success: true,
        students,
        availableDomains,
        pagination: {
          totalStudents,
          totalPages: Math.ceil(totalStudents / limit) || 1,
          currentPage: page,
          limit,
        },
        summary: {
          totalStudents,
          totalCollected,
          totalPending,
          duesCount,
          clearCount: totalStudents - duesCount,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET_STUDENTS_ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
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