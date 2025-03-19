import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function TopCollections() {
  const collections = Array(10).fill({
    name: "SOLart Collection",
    volume: "12.5K SOL",
    volumeChange: "+166.66%",
    floorPrice: "64.51 SOL",
    floorChange: "+3.23%",
    items: "10K",
  })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold gradient-text">Top-10 Collections</h2>
      <div className="rounded-lg border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>24H Volume</TableHead>
              <TableHead>24H Change</TableHead>
              <TableHead>Floor Price</TableHead>
              <TableHead>24H Change</TableHead>
              <TableHead>Items</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map((collection, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="bg-cyan-500/20 w-8 h-8 rounded-lg flex items-center justify-center text-cyan-500">
                      S
                    </div>
                    {collection.name}
                  </div>
                </TableCell>
                <TableCell>{collection.volume}</TableCell>
                <TableCell className="text-green-500">{collection.volumeChange}</TableCell>
                <TableCell>{collection.floorPrice}</TableCell>
                <TableCell className="text-green-500">{collection.floorChange}</TableCell>
                <TableCell>{collection.items}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

