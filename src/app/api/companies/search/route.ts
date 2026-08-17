import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.trim() || "";

    if (!query) {
      return NextResponse.json({ success: true, companies: [] });
    }

    // Free & reliable Clearbit autocomplete API
    const res = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    const companies = (data || []).map((item: any) => ({
      name: item.name,
      domain: item.domain,
      logo: item.logo || `https://logo.clearbit.com/${item.domain}`,
    }));

    return NextResponse.json({ success: true, companies });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to search companies" },
      { status: 500 }
    );
  }
}