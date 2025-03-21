"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/loading"
import { useToast } from "@/hooks/use-toast"
import { ApiError, ApiErrorType } from "@/lib/api-client"
import { safeLocalStorage } from "@/lib/utils/client-utils"

interface LoginDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  redirectUrl?: string
}

export function LoginDialog({ 
  open, 
  onOpenChange, 
  redirectUrl = '/profile' 
}: LoginDialogProps) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [error, setError] = React.useState("")
  
  // Dev mode flag for testing without a backend
  const isDevelopmentMode = process.env.NODE_ENV === 'development'
  const useDevModeAuth = isDevelopmentMode && !process.env.NEXT_PUBLIC_API_URL

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (useDevModeAuth) {
        // Development mode: simulate login success
        await new Promise(resolve => setTimeout(resolve, 800))
        safeLocalStorage.setItem('auth_token', 'test-token')
        safeLocalStorage.setItem('user_data', JSON.stringify({
          id: '1',
          email,
          username: email.split('@')[0],
          fullName: 'Test User',
        }))
        
        toast({
          title: "Logged in successfully",
          description: "Using development mode authentication",
        })
        
        if (onOpenChange) {
          onOpenChange(false)
        }
        
        router.push(redirectUrl)
        return
      }
      
      // Real authentication
      await login({
        email,
        password,
        rememberMe
      })
      
      toast({
        title: "Welcome back!",
        description: "You've been logged in successfully.",
      })
      
      if (onOpenChange) {
        onOpenChange(false)
      }
      
      router.push(redirectUrl)
    } catch (err) {
      if (err instanceof ApiError) {
        switch (err.type) {
          case ApiErrorType.UNAUTHORIZED:
            setError("Invalid email or password")
            break
          case ApiErrorType.NETWORK_ERROR:
            setError("Network error. Please check your connection.")
            break
          default:
            setError(err.message || "An error occurred during login")
        }
      } else {
        setError(err instanceof Error ? err.message : "An error occurred")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
        <form onSubmit={handleLogin} className="space-y-6">
          {useDevModeAuth && (
            <div className="bg-yellow-500 text-black px-4 py-2 rounded-md mb-4">
              Dev Mode: Email/password validation is bypassed
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-700 bg-gray-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-gray-900"
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm text-gray-400">
                Remember me
              </Label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button 
              type="submit"
              className="w-full gradient-button"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 
                <span className="flex items-center justify-center gap-2">
                  <Spinner size="sm" /> 
                  Logging in...
                </span> : 
                "Login"
              }
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
