import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  { id: 1, type: 'Add', amount: '1000 SOL', date: '2023-06-15 14:30:00' },
  { id: 2, type: 'Remove', amount: '500 SOL', date: '2023-06-14 09:15:00' },
  { id: 3, type: 'Add', amount: '2000 SOL', date: '2023-06-13 11:45:00' },
  { id: 4, type: 'Remove', amount: '750 SOL', date: '2023-06-12 16:20:00' },
  { id: 5, type: 'Add', amount: '1500 SOL', date: '2023-06-11 10:00:00' },
]

export function LiquidityHistory() {
  return (
    <div className="bg-[#161616] border border-gray-800 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

