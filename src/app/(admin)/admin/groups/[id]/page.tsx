import { GroupDetails } from "@/components/admin/groups/group-details";
import { GroupMembers } from "@/components/admin/groups/group-members";
import { GroupLessons } from "@/components/admin/groups/group-lessons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <GroupDetails id={id} />
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-6">
          <GroupMembers groupId={id} />
        </TabsContent>
        <TabsContent value="lessons" className="mt-6">
          <GroupLessons groupId={id} />
        </TabsContent>
        <TabsContent value="goals" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-4">Group Goals & Progress</h3>
            {/* Goals and progress content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
