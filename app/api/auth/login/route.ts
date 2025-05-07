import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getUserByCredentials } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    // Check credentials against our user database
    const user = await getUserByCredentials(username, password)

    if (!user) {
      return NextResponse.json({ message: "Invalid Lyf180 username or password" }, { status: 401 })
    }

    // Set a session cookie
    const cookieStore = cookies()
    cookieStore.set(
      "lyf180_session",
      JSON.stringify({
        userId: user.id,
        username: user.username,
        // Don't include password in the cookie!
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      },
    )

    // Return success
    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "An error occurred during login" }, { status: 500 })
  }
}
