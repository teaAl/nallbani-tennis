import { LessonsList } from "@/components/admin/lessons/list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function LessonsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Individual Lessons</h1>
        <Link href="/lessons/new">
          <Button className="bg-lime-500 hover:bg-lime-600">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Lesson
          </Button>
        </Link>
      </div>
      <LessonsList />
    </div>
  )
}
