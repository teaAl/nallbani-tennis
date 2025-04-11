import { CreateGroupForm } from "@/components/admin/groups/create-form"

export default function NewGroupPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create New Group</h1>
      <CreateGroupForm />
    </div>
  )
}
