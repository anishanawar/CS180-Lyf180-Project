import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getUserById } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("lyf180_session")

    if (!sessionCookie) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const session = JSON.parse(sessionCookie.value)
    const user = await getUserById(session.userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
