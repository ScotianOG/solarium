import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, LogOut } from 'lucide-react'
import Link from "next/link"

export function ProfileHeader() {
  const stats = [
    { label: "Joined", value: "March 2023" },
    { label: "Collected", value: "155" },
    { label: "Created", value: "4" },
    { label: "Floor Price", value: "0.001" },
    { label: "Volume Traded", value: "221" },
    { label: "Followers", value: "1235" }
  ]

  return (
    <div className="bg-[#161616] pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center pt-12 pb-6">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-2">Username</h1>
          <p className="text-gray-400 text-sm mb-4">011bc913...5fzz0e21</p>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-gray-800">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" className="border-gray-800">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-sm text-gray-400">{stat.label}</div>
              <div className="font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

