import { NextRequest, NextResponse } from "next/server";
import { Student } from "@/models/Student";
import { connectToDatabase } from "@/lib/db";

// ─── GET: HIGH-SPEED PAGINATED STUDENT DIRECTORY FEEDS ──────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    
    const search = searchParams.get("search")?.trim() || "";
    const domainFilter = searchParams.get("domain") || "All";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const limit = Math.max(1, Number(searchParams.get("limit")) || 20); 
    const skip = (page - 1) * limit;

    // 1. Build database level match filtration criteria map
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

    // 2. Run multi-faceted pipeline calculations in one server pass
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
                  $sum: { $cond: [ { $gt: ["$pendingAmount", 0] }, 1, 0 ] }
                },
                clearedAccounts: {
                  $sum: { $cond: [ { $lte: ["$pendingAmount", 0] }, 1, 0 ] }
                }
              }
            }
          ],
          uniqueDomains: [
            { $group: { _id: "$domain" } },
            { $match: { _id: { $ne: null } } },
            { $sort: { _id: 1 } }
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
                totalCollection: 1,
                balanceAmount: { $ifNull: ["$pendingAmount", 0] },
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
    console.error("Student directory aggregation failure:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ─── PUT: EDIT EXISTING STUDENT DATA SAFELY (ENUM CONSTRAINTS ALIGNED) ──────
export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const { id, name, phone, college, domain, duration, totalBilling } = data;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing Target Document Student ID." }, { status: 400 });
    }

    const currentStudent = await Student.findById(id);
    if (!currentStudent) {
      return NextResponse.json({ success: false, error: "Student profile not found." }, { status: 404 });
    }

    const updatedBilling = Number(totalBilling) || currentStudent.totalBilling;
    const newPendingAmount = Math.max(0, updatedBilling - (currentStudent.totalCollection || 0));
    
    // 🎯 SCHEMA FIX: Changed from "Cleared" to match your exact IStudent model enum string ("Fully Paid")
    const newFeesStatus = newPendingAmount === 0 ? "Fully Paid" : "Pending";

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      {
        $set: {
          name: name?.trim(),
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