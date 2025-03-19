import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface Proposal {
  id: number
  title: string
  status: 'Active' | 'Passed' | 'Rejected'
  votes: { for: number; against: number }
  endDate: string
}

const proposals: Proposal[] = [
  { id: 1, title: "Increase NFT minting fee", status: 'Active', votes: { for: 65, against: 35 }, endDate: "2023-07-15" },
  { id: 2, title: "Add new collection category", status: 'Active', votes: { for: 80, against: 20 }, endDate: "2023-07-20" },
  { id: 3, title: "Adjust SOLess token allocation", status: 'Passed', votes: { for: 75, against: 25 }, endDate: "2023-06-30" },
  { id: 4, title: "Implement cross-chain bridge", status: 'Rejected', votes: { for: 40, against: 60 }, endDate: "2023-06-25" },
]

interface ProposalListProps {
  status: 'active' | 'past'
}

export function ProposalList({ status }: ProposalListProps) {
  const filteredProposals = proposals.filter(proposal => 
    status === 'active' ? proposal.status === 'Active' : proposal.status !== 'Active'
  )

  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProposals.map((proposal) => (
            <TableRow key={proposal.id}>
              <TableCell>{proposal.id}</TableCell>
              <TableCell>{proposal.title}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  proposal.status === 'Active' ? 'bg-blue-500 text-white' :
                  proposal.status === 'Passed' ? 'bg-green-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {proposal.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="w-40">
                  <Progress value={proposal.votes.for} max={100} className="h-2" />
                  <div className="flex justify-between text-xs mt-1">
                    <span>For: {proposal.votes.for}%</span>
                    <span>Against: {proposal.votes.against}%</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{proposal.endDate}</TableCell>
              <TableCell>
                <Button variant="outline" className="border-gray-800 hover:bg-gray-800">
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

