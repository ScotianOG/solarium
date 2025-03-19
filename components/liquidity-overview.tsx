import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', tvl: 4000 },
  { name: 'Feb', tvl: 3000 },
  { name: 'Mar', tvl: 5000 },
  { name: 'Apr', tvl: 2780 },
  { name: 'May', tvl: 1890 },
  { name: 'Jun', tvl: 2390 },
  { name: 'Jul', tvl: 3490 },
]

export function LiquidityOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader>
            <CardTitle>Total Value Locked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$3,490,000</p>
          </CardContent>
        </Card>
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader>
            <CardTitle>24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$1,245,678</p>
          </CardContent>
        </Card>
        <Card className="bg-[#161616] border-gray-800">
          <CardHeader>
            <CardTitle>APY</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">12.5%</p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-[#161616] border-gray-800">
        <CardHeader>
          <CardTitle>TVL Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161616', border: '1px solid #333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="tvl" stroke="#4ea4f6" fill="#4ea4f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

