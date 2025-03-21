"use client"

import type React from "react"

import { useState } from "react"
import type { PrizeRedemption } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PrizeFormProps {
  onSubmit: (prize: PrizeRedemption | Omit<PrizeRedemption, "id">) => void
  onCancel: () => void
  initialData?: PrizeRedemption | null
}

export default function PrizeForm({ onSubmit, onCancel, initialData }: PrizeFormProps) {
  const [itemName, setItemName] = useState(initialData?.itemName || "")
  const [itemType, setItemType] = useState(initialData?.itemType || "")
  const [userName, setUserName] = useState(initialData?.userName || "")
  const [userEmail, setUserEmail] = useState(initialData?.userEmail || "")
  const [redemptionDate, setRedemptionDate] = useState(
    initialData?.redemptionDate
      ? new Date(initialData.redemptionDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!itemName.trim() || !itemType || !userName.trim() || !userEmail.trim()) return

    const prizeData = {
      itemName: itemName.trim(),
      itemType,
      userName: userName.trim(),
      userEmail: userEmail.trim(),
      redemptionDate: new Date(redemptionDate).toISOString(),
      ...(initialData ? { id: initialData.id } : {}),
    }

    onSubmit(prizeData as any)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Redemption" : "Add New Redemption"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName">Item Name</Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter prize item name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemType">Item Type</Label>
            <Select value={itemType} onValueChange={setItemType} required>
              <SelectTrigger id="itemType">
                <SelectValue placeholder="Select item type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sticker">Sticker</SelectItem>
                <SelectItem value="Mug">Mug</SelectItem>
                <SelectItem value="T-Shirt">T-Shirt</SelectItem>
                <SelectItem value="Subscription">Subscription</SelectItem>
                <SelectItem value="Gift Card">Gift Card</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userName">User Name</Label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter user's name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userEmail">User Email</Label>
            <Input
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter user's email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redemptionDate">Redemption Date</Label>
            <Input
              id="redemptionDate"
              type="date"
              value={redemptionDate}
              onChange={(e) => setRedemptionDate(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Update Redemption" : "Add Redemption"}</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

