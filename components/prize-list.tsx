import type { PrizeRedemption } from "@/lib/types"
import PrizeCard from "@/components/prize-card"

interface PrizeListProps {
  prizes: PrizeRedemption[]
  onEdit: (prize: PrizeRedemption) => void
  onDelete: (id: string) => void
}

export default function PrizeList({ prizes, onEdit, onDelete }: PrizeListProps) {
  if (prizes.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">No redeemed prizes found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prizes.map((prize) => (
        <PrizeCard key={prize.id} prize={prize} onEdit={() => onEdit(prize)} onDelete={() => onDelete(prize.id)} />
      ))}
    </div>
  )
}

