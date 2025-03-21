"use client"

import { LoginDialog } from "@/components/login-dialog"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { safeLocalStorage } from "@/lib/utils/client-utils"

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = safeLocalStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      router.push('/profile')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <LoginDialog 
        open={showLogin} 
        onOpenChange={setShowLogin} 
      />
    </div>
  )
}
