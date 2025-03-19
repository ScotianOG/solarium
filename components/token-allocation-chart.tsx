import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const data = [
  { name: 'Liquidity Pool', value: 30 },
  { name: 'NFT Backing', value: 25 },
  { name: 'Community Rewards', value: 20 },
  { name: 'Development', value: 15 },
  { name: 'Marketing', value: 10 },
]

const COLORS = ['#4ea4f6', '#8b55ff', '#1ede8d', '#ff3e3e', '#f96919']

export function TokenAllocationChart() {
  return (
    <div className="h-[400px] w-full bg-[#161616] rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

