import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame } from 'lucide-react'

const burningMechanisms = [
  { name: 'Gas Fee Burns', description: 'A portion of transaction fees is permanently burned.' },
  { name: 'Ad Removal', description: 'Users burn tokens to remove advertisements.' },
  { name: 'Premium Content Access', description: 'Tokens are burned to unlock exclusive content.' },
  { name: 'Algorithm Boosts', description: 'Influencers burn tokens to enhance visibility.' },
  { name: 'Staking Incentives', description: 'DeFi services incorporate token burns for rewards.' },
]

export function BurningMechanisms() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {burningMechanisms.map((mechanism, index) => (
        <Card key={index} className="bg-[#161616] border-gray-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <Flame className="w-8 h-8 text-red-500" />
            <CardTitle>{mechanism.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{mechanism.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

