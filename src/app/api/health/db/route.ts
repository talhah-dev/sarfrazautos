import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const result = await sql`SELECT NOW() as current_time, version() as version`
    return NextResponse.json({
      status: "connected",
      database: "Neon PostgreSQL",
      data: result[0],
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}
