import { ScheduleLessonForm } from "@/components/admin/lessons/schedule-form"

export default function NewLessonPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Schedule New Lesson</h1>
      <ScheduleLessonForm />
    </div>
  )
}
