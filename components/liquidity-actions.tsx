"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function LiquidityActions() {
  const [amount, setAmount] = useState('')

  const handleAction = (action: 'add' | 'remove') => {
    // Implement liquidity action logic here
    console.log(`${action} liquidity:`, amount)
    setAmount('')
  }

  return (
    <Card className="bg-[#161616] border-gray-800">
      <CardHeader>
        <CardTitle>Manage Liquidity</CardTitle>
        <CardDescription>Add or remove liquidity from the vault</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="add">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Liquidity</TabsTrigger>
            <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-amount">Amount to Add</Label>
                <Input
                  id="add-amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <Button className="w-full gradient-button" onClick={() => handleAction('add')}>
                Add Liquidity
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="remove">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="remove-amount">Amount to Remove</Label>
                <Input
                  id="remove-amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#121212] border-gray-800"
                />
              </div>
              <Button className="w-full gradient-button" onClick={() => handleAction('remove')}>
                Remove Liquidity
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
