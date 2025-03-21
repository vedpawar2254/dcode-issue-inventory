"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IssueInventory from "@/components/issue-inventory"
import PrizeInventory from "@/components/prize-inventory"

export default function InventoryManager() {
  const [activeTab, setActiveTab] = useState("issues")

  return (
    <Tabs defaultValue="issues" onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="issues">Issues</TabsTrigger>
        <TabsTrigger value="prizes">Redeemed Prizes</TabsTrigger>
      </TabsList>

      <TabsContent value="issues" className="mt-0">
        <IssueInventory />
      </TabsContent>

      <TabsContent value="prizes" className="mt-0">
        <PrizeInventory />
      </TabsContent>
    </Tabs>
  )
}

