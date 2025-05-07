"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Successful login
        router.push("/dashboard")
      } else {
        // Failed login
        setError(data.message || "Invalid Lyf180 username or password.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#FFF7E8] flex flex-col items-center justify-center p-4"
      style={{ backgroundImage: "url(/images/lyf180_Background.png)" }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-center">
            <span className="text-[#76A5AF] font-[Pacifico] text-6xl">Lyf</span>
            <span className="text-[#EA9999] font-[Pacifico] text-4xl">180</span>
          </h1>
          <h2 className="text-[#014240] font-[DynaPuff] text-2xl mt-2">=== Welcome to the Lyf180 Experience ===</h2>
        </div>

        <div className="bg-[#BFD4D9] border-[3px] border-[#014240] rounded-lg p-8 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-[#014240] font-[Wix_Madefor_Display] font-medium mb-2">
                Enter your Lyf180 username:
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded border-2 border-[#014240] focus:outline-none focus:ring-2 focus:ring-[#76A5AF]"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#014240] font-[Wix_Madefor_Display] font-medium mb-2">
                Enter your Lyf180 password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded border-2 border-[#014240] focus:outline-none focus:ring-2 focus:ring-[#76A5AF]"
                required
                disabled={isLoading}
              />
            </div>

            {error && <div className="text-red-600 font-[Wix_Madefor_Display] text-center">{error}</div>}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#76A5AF] hover:bg-[#5A8A94] text-white font-[Wix_Madefor_Display] font-bold py-3 px-4 rounded-md transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#014240] font-[Wix_Madefor_Display] italic">
            "The only way to do great work is to love what you do." - Steve Jobs
          </p>
        </div>
      </div>
    </div>
  )
}
