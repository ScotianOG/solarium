"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'

interface LoginDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const router = useRouter()

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  // Simulating an API call
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay

    // Test mode: allow any email/password combination
    const isTestMode = true; // Set this to false to disable test mode

    if (isTestMode || (email === "user@example.com" && password === "password")) {
      // Successful login
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/profile') // Redirect to profile page
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred")
  } finally {
    setIsLoading(false)
  }
}

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
        <form onSubmit={handleLogin} className="space-y-6">
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-yellow-500 text-black px-4 py-2 rounded-md mb-4">
              Test Mode: Any email/password combination will work
            </div>
          )}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">Login to SOLarium</h2>
            <p className="text-sm text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              type="submit"
              className="w-full gradient-button"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-cyan-400 hover:underline">
                Sign up
              </Link>
            </p>
            <Link href="/forgot-password" className="text-sm text-cyan-400 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

