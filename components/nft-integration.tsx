import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'NFT 1', floorPrice: 100, tokenBacking: 80 },
  { name: 'NFT 2', floorPrice: 150, tokenBacking: 120 },
  { name: 'NFT 3', floorPrice: 200, tokenBacking: 180 },
  { name: 'NFT 4', floorPrice: 120, tokenBacking: 100 },
  { name: 'NFT 5', floorPrice: 180, tokenBacking: 150 },
]

export function NFTIntegration() {
  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>NFT Floor Price vs Token Backing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#161616', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="floorPrice" fill="#4ea4f6" name="Floor Price" />
              <Bar dataKey="tokenBacking" fill="#8b55ff" name="Token Backing" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

