import InventoryManager from "@/components/inventory-manager"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Issue & Prize Inventory Management</h1>
      <InventoryManager />
    </main>
  )
}

