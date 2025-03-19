import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const creators = [
  { id: 1, name: "Creator Name", volume: "12.5K USD", sales: "5,124", items: "3,100" },
  { id: 2, name: "Creator Name", volume: "12.5K USD", sales: "5,124", items: "3,100" },
  { id: 3, name: "Creator Name", volume: "12.5K USD", sales: "5,124", items: "3,100" },
]

export function CreatorTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search creators" 
            className="pl-10 bg-[#161616] border-gray-800"
          />
        </div>
        <Button variant="outline" className="border-gray-800">
          Sort by
        </Button>
      </div>
      <div className="bg-[#161616] rounded-lg border border-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">#</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Creator</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Volume</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Sales</th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Items</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator) => (
              <tr key={creator.id} className="border-b border-gray-800 last:border-0">
                <td className="py-4 px-6">{creator.id}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{creator.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6">{creator.volume}</td>
                <td className="py-4 px-6">{creator.sales}</td>
                <td className="py-4 px-6">{creator.items}</td>
                <td className="py-4 px-6">
                  <Button 
                    variant="outline" 
                    className="border-gray-800 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                  >
                    Unfollow
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

