// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { jwtVerify } from "jose";

// export async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
//   }

//   try {
//     const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    
//     // 1. Verify and Extract the payload from the JWT
//     const { payload } = await jwtVerify(token, SECRET);

//     // 2. Return the user data (including the role) to the Navbar
//     return NextResponse.json({ 
//       authenticated: true, 
//       user: {
//         id: payload.id,
//         email: payload.email,
//         role: payload.role // This is what triggers your Admin button
//       } 
//     });
//   } catch (err) {
//     console.error("JWT Verification failed:", err);
//     return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
//   }
// }

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const SECRET = new TextEncoder().encode(jwtSecret);
    
    // Verify and Extract the payload
    const { payload } = await jwtVerify(token, SECRET);

    // Return the user data to the frontend
    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role 
      } 
    });
  } catch (err) {
    // If token is expired or invalid, jose throws an error
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }
}