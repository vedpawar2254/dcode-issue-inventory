"use client"

import { useState } from "react"
import type { PrizeRedemption } from "@/lib/types"
import PrizeList from "@/components/prize-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import PrizeForm from "@/components/prize-form"

export default function PrizeInventory() {
  const [prizes, setPrizes] = useState<PrizeRedemption[]>([
    {
      id: "1",
      itemName: "Developer Sticker Pack",
      itemType: "Sticker",
      userName: "Jane Smith",
      userEmail: "jane.smith@example.com",
      redemptionDate: new Date("2023-11-15").toISOString(),
    },
    {
      id: "2",
      itemName: "Code Ninja Coffee Mug",
      itemType: "Mug",
      userName: "John Doe",
      userEmail: "john.doe@example.com",
      redemptionDate: new Date("2023-11-10").toISOString(),
    },
    {
      id: "3",
      itemName: "Pro IDE Subscription (1 year)",
      itemType: "Subscription",
      userName: "Alex Johnson",
      userEmail: "alex.j@example.com",
      redemptionDate: new Date("2023-11-05").toISOString(),
    },
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPrize, setEditingPrize] = useState<PrizeRedemption | null>(null)

  const handleAddPrize = (prize: Omit<PrizeRedemption, "id">) => {
    const newPrize = {
      ...prize,
      id: Date.now().toString(),
    }
    setPrizes([...prizes, newPrize])
    setIsFormOpen(false)
  }

  const handleUpdatePrize = (updatedPrize: PrizeRedemption) => {
    setPrizes(prizes.map((prize) => (prize.id === updatedPrize.id ? updatedPrize : prize)))
    setEditingPrize(null)
  }

  const handleDeletePrize = (id: string) => {
    setPrizes(prizes.filter((prize) => prize.id !== id))
  }

  const handleEditPrize = (prize: PrizeRedemption) => {
    setEditingPrize(prize)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Redeemed Prizes ({prizes.length})</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Redemption
        </Button>
      </div>

      {(isFormOpen || editingPrize) && (
        <PrizeForm
          onSubmit={editingPrize ? handleUpdatePrize : handleAddPrize}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingPrize(null)
          }}
          initialData={editingPrize}
        />
      )}

      <PrizeList prizes={prizes} onEdit={handleEditPrize} onDelete={handleDeletePrize} />
    </div>
  )
}

