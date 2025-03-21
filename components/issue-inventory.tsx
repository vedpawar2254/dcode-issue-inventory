"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import IssueList from "@/components/issue-list"
import IssueForm from "@/components/issue-form"
import type { Issue } from "@/lib/types"

export default function IssueInventory() {
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "1",
      title: "Fix navigation bug",
      skills: ["React", "TypeScript"],
      description: "The navigation menu doesn't close properly on mobile devices.",
    },
    {
      id: "2",
      title: "Implement dark mode",
      skills: ["CSS", "JavaScript"],
      description: "Add a toggle for dark mode across the application.",
    },
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null)

  const handleAddIssue = (issue: Omit<Issue, "id">) => {
    const newIssue = {
      ...issue,
      id: Date.now().toString(),
    }
    setIssues([...issues, newIssue])
    setIsFormOpen(false)
  }

  const handleUpdateIssue = (updatedIssue: Issue) => {
    setIssues(issues.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue)))
    setEditingIssue(null)
  }

  const handleDeleteIssue = (id: string) => {
    setIssues(issues.filter((issue) => issue.id !== id))
  }

  const handleEditIssue = (issue: Issue) => {
    setEditingIssue(issue)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Issues ({issues.length})</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Issue
        </Button>
      </div>

      {(isFormOpen || editingIssue) && (
        <IssueForm
          onSubmit={editingIssue ? handleUpdateIssue : handleAddIssue}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingIssue(null)
          }}
          initialData={editingIssue}
        />
      )}

      <IssueList issues={issues} onEdit={handleEditIssue} onDelete={handleDeleteIssue} />
    </div>
  )
}

