"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownUp } from 'lucide-react'

export function SOLessSwiftSwap() {
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('SOLess')
  const [amount, setAmount] = useState('')
  const [gasToken, setGasToken] = useState('SOL')

  const handleSwap = () => {
    console.log(`Swapping ${amount} ${fromToken} to ${toToken} using ${gasToken} for gas`)
  }

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>SOLess SwiftSwap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from-token">From</Label>
          <div className="flex space-x-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[120px] bg-[#121212] border-gray-800">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="SOLess">SOLess</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="from-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-[#121212] border-gray-800"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              setFromToken(toToken)
              setToToken(fromToken)
            }}
            className="rounded-full border-gray-800"
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <Label htmlFor="to-token">To</Label>
          <div className="flex space-x-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[120px] bg-[#121212] border-gray-800">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOL">SOL</SelectItem>
                <SelectItem value="SOLess">SOLess</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="to-amount"
              type="number"
              placeholder="0.00"
              disabled
              className="flex-1 bg-[#121212] border-gray-800"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="gas-token">Gas Token</Label>
          <Select value={gasToken} onValueChange={setGasToken}>
            <SelectTrigger className="w-full bg-[#121212] border-gray-800">
              <SelectValue placeholder="Select gas token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SOL">SOL</SelectItem>
              <SelectItem value="SOLess">SOLess</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSwap} className="w-full gradient-button">
          Swap
        </Button>
      </CardFooter>
    </Card>
  )
}

