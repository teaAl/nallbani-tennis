import { MemberProfile } from "@/components/admin/members/profile"
import { MemberLessons } from "@/components/admin/members/lessons"
import { MemberGroups } from "@/components/admin/members/groups"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MemberPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <MemberProfile id={params.id} />

      <Tabs defaultValue="lessons">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-6">
          <MemberLessons memberId={params.id} />
        </TabsContent>
        <TabsContent value="groups" className="mt-6">
          <MemberGroups memberId={params.id} />
        </TabsContent>
        <TabsContent value="progress" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-4">Progress Tracking</h3>
            {/* Progress tracking content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
