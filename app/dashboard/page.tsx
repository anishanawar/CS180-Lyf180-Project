"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [goals, setGoals] = useState<string[]>([])
  const [newGoal, setNewGoal] = useState("")
  const [showOverlay, setShowOverlay] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Get user data from session
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/user")
        if (!response.ok) {
          throw new Error("Not authenticated")
        }
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error("Error fetching user data:", error)
        router.push("/")
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()])
      setNewGoal("")
      setShowOverlay(false)
    }
  }

  const clearGoals = () => {
    setGoals([])
  }

  if (!user) {
    return <div className="min-h-screen bg-[#FFF7E8] flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="bg-[#FFF7E8] min-h-screen" style={{ backgroundImage: "url(/images/lyf180_Background.png)" }}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1>
            <span className="text-[#76A5AF] font-[Pacifico] text-6xl">Lyf</span>
            <span className="text-[#EA9999] font-[Pacifico] text-4xl">180</span>
            <span className="text-[#014240] font-[DynaPuff] text-3xl ml-2">Dashboard</span>
          </h1>
          <button
            onClick={handleLogout}
            className="bg-[#EA9999] text-[#014240] px-4 py-2 rounded-md font-[Wix_Madefor_Display] hover:bg-[#e27e7e]"
          >
            Logout
          </button>
        </div>

        <h1 className="font-[DynaPuff] text-[#014240] text-5xl my-4">Welcome, {user.username}</h1>

        <div>
          <h4 className="font-[Wix_Madefor_Display] text-3xl text-center">
            "The only way to do great work is to love what you do." - Steve Jobs
          </h4>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-[#BFD4D9] p-5 border-[3px] border-[#014240] rounded-lg h-[300px]">
              <h6 className="font-[Wix_Madefor_Display] text-[#014240] text-xl flex justify-center items-center">
                Daily Habits
              </h6>
            </div>
            <div className="bg-[#BFD4D9] p-5 border-[3px] border-[#014240] rounded-lg h-[300px]">
              <div className="flex justify-center items-center gap-4">
                <h6 className="font-[Wix_Madefor_Display] text-[#014240] text-xl">Long Term Goals</h6>
                <button onClick={() => setShowOverlay(true)} className="bg-transparent border-none cursor-pointer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 4V20M4 12H20"
                      stroke="#014240"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button onClick={clearGoals} className="text-sm text-[#014240] hover:text-[#EA9999]">
                  Clear All
                </button>
              </div>
              <div className="mt-4 h-[220px] overflow-y-auto">
                <ol className="list-decimal pl-8">
                  {goals.map((goal, index) => (
                    <li key={index} className="font-[Wix_Madefor_Display] text-[#014240] mb-2">
                      {goal}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className="bg-[#BFD4D9] p-5 border-[3px] border-[#014240] rounded-lg h-[300px]">
              <h6 className="font-[Wix_Madefor_Display] text-[#014240] text-xl flex justify-center items-center">
                Your Stats
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Goal overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#EA9999] border-[3px] border-[#014240] rounded-lg p-6 max-w-md w-full">
            <h6 className="font-[Wix_Madefor_Display] text-[#014240] text-2xl mb-4 text-center">
              What goal would you like to add?
            </h6>
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="w-full px-4 py-3 rounded border-2 border-[#014240] focus:outline-none focus:ring-2 focus:ring-[#76A5AF] font-[Wix_Madefor_Display]"
              placeholder="Enter your goal"
            />
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowOverlay(false)}
                className="bg-[#014240] text-white px-4 py-2 rounded-md font-[Wix_Madefor_Display] hover:bg-opacity-90"
              >
                Cancel
              </button>
              <button
                onClick={addGoal}
                className="bg-[#014240] text-white px-4 py-2 rounded-md font-[Wix_Madefor_Display] hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
