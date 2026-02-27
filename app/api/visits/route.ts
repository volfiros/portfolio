import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.counterapi.dev/v1/volfiros/portfolio/up",
      { cache: "no-store" }
    );
    if (!res.ok) return NextResponse.json({ count: null });
    const data = await res.json();
    return NextResponse.json({ count: typeof data.count === "number" ? data.count : null });
  } catch {
    return NextResponse.json({ count: null });
  }
}
