import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  const cookieStore = cookies()

  // Delete the session cookie
  cookieStore.delete("lyf180_session")

  return NextResponse.json({ message: "Logged out successfully" })
}
