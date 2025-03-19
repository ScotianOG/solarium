import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const activities = [
  { type: "Purchase", item: "Cheems #1337", price: 95, date: "2023-06-15" },
  { type: "Sale", item: "Daft Droid #42", price: 75, date: "2023-06-14" },
  { type: "Purchase", item: "Toke.n Seed #007", price: 60, date: "2023-06-13" },
  { type: "Sale", item: "Pixel Cheems #24", price: 70, date: "2023-06-12" },
]

export function UserActivity() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold gradient-text">Recent Activity</h2>
        <Button variant="link" className="text-cyan-400">View All</Button>
      </div>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {activity.type === "Purchase" ? (
                    <ArrowDownRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">{activity.item}</p>
                    <p className="text-sm text-gray-400">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.price} SOUL</p>
                  <p className="text-sm text-gray-400">{activity.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

