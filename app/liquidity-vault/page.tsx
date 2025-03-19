"use client"

import { useState } from 'react'
import { LiquidityOverview } from "@/components/liquidity-overview"
import { LiquidityActions } from "@/components/liquidity-actions"
import { LiquidityHistory } from "@/components/liquidity-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LiquidityVaultPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold gradient-text mb-6">Liquidity Vault</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <LiquidityOverview />
        </TabsContent>
        <TabsContent value="actions">
          <LiquidityActions />
        </TabsContent>
        <TabsContent value="history">
          <LiquidityHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

