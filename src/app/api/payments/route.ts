// import { NextResponse } from "next/server";
// import { google } from "googleapis";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const {
//       name,
//       college,
//       courseName,
//       totalCoursePayment,
//       paidAmount,
//       balanceAmount,
//       paymentType,
//       paymentMethod,
//       transactionId,
//       billingBy,
//       dateTime,
//     } = body;

//     // 1. Initialize Server-to-Sheet Authentication Credentials
//     // Replace newlines encoded in service account environment strings safely
//     const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

//     const auth = new google.auth.JWT(
//       process.env.GOOGLE_CLIENT_EMAIL,
//       undefined,
//       privateKey,
//       ["https://www.googleapis.com/auth/spreadsheets"]
//     );

//     const sheets = google.sheets({ version: "v4", auth });

//     // 2. Append incoming records as a new single structural row matrix
//     await sheets.spreadsheets.values.append({
//       spreadsheetId: process.env.GOOGLE_SHEET_ID,
//       range: "Sheet1!A:K", // Maps to the first 11 columns (A through K)
//       valueInputOption: "USER_ENTERED",
//       requestBody: {
//         values: [
//           [
//             name,
//             college,
//             courseName,
//             totalCoursePayment,
//             paidAmount,
//             balanceAmount,
//             paymentType,
//             paymentMethod,
//             transactionId,
//             billingBy,
//             dateTime,
//           ],
//         ],
//       },
//     });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error: any) {
//     console.error("Google Sheets Sync Engine Exception:", error);
//     return NextResponse.json(
//       { success: false, error: error.message || "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      college,
      courseName,
      totalCoursePayment,
      paidAmount,
      balanceAmount,
      paymentType,
      paymentMethod,
      transactionId,
      billingBy,
      dateTime,
    } = body;

    // 1. Initialize Server-to-Sheet Authentication Credentials
    // Replace newlines encoded in service account environment strings safely
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // 2. Append incoming records as a new single structural row matrix
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:K", // Maps to the first 11 columns (A through K)
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            name,
            college,
            courseName,
            totalCoursePayment,
            paidAmount,
            balanceAmount,
            paymentType,
            paymentMethod,
            transactionId,
            billingBy,
            dateTime,
          ],
        ],
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Google Sheets Sync Engine Exception:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}