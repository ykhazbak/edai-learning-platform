"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (session) {
      // User is authenticated, redirect to dashboard
      router.push("/dashboard")
    } else {
      // User is not authenticated, redirect to sign-in
      router.push("/auth/signin")
    }
  }, [session, status, router])

  // Show loading spinner while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Image 
            src="/edai-logo.svg" 
            alt="EdAI Logo" 
            width={120} 
            height={84}
            className="mr-3"
          />
          <h1 className="text-2xl font-bold text-gray-900">EdAI</h1>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
