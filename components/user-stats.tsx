import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, PaintbrushIcon as PaintBrush, TrendingUp, Users } from 'lucide-react'

export function UserStats() {
  const stats = [
    { title: "Items Owned", value: "4,850", icon: Layers },
    { title: "Items Created", value: "120", icon: PaintBrush },
    { title: "Floor Value", value: "397,187 SOUL", icon: TrendingUp },
    { title: "Followers", value: "1.2K", icon: Users },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

