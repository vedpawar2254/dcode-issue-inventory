import type { Issue } from "@/lib/types"
import IssueCard from "@/components/issue-card"

interface IssueListProps {
  issues: Issue[]
  onEdit: (issue: Issue) => void
  onDelete: (id: string) => void
}

export default function IssueList({ issues, onEdit, onDelete }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">No issues found. Add your first issue to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} onEdit={() => onEdit(issue)} onDelete={() => onDelete(issue.id)} />
      ))}
    </div>
  )
}

