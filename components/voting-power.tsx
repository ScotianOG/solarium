import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface SoulieNFT {
  id: number;
  multiplier: number;
}

export function VotingPower() {
  const basePower = 1000; // Base voting power in SOUL tokens
  const soulieNFTs: SoulieNFT[] = [
    { id: 1, multiplier: 1.5 },
    { id: 2, multiplier: 2 },
  ];

  const totalMultiplier = soulieNFTs.reduce((acc, nft) => acc + nft.multiplier, 1);
  const totalPower = Math.floor(basePower * totalMultiplier);
  const usedPower = 250;

  return (
    <div className="space-y-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
      <h2 className="text-2xl font-bold gradient-text">Your Voting Power</h2>
      <div className="flex justify-between items-center">
        <span className="text-gray-400">Available: {totalPower - usedPower} SOUL</span>
        <span className="text-gray-400">Total: {totalPower} SOUL</span>
      </div>
      <Progress value={(usedPower / totalPower) * 100} className="h-2 bg-gray-800" />
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Base Voting Power: {basePower} SOUL</p>
        <p className="text-sm text-gray-400">SOULIE NFT Multiplier: x{totalMultiplier.toFixed(2)}</p>
        <ul className="text-sm text-gray-400 list-disc list-inside">
          {soulieNFTs.map((nft) => (
            <li key={nft.id}>SOULIE #{nft.id}: x{nft.multiplier} multiplier</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" className="border-gray-800 hover:bg-gray-800">
          Delegate Power
        </Button>
        <Button className="gradient-button">
          Acquire More SOUL
        </Button>
      </div>
    </div>
  )
}

