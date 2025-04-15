import { GroupDetails } from "@/components/admin/groups/group-details";
import { GroupMembers } from "@/components/admin/groups/group-members";
import { GroupLessons } from "@/components/admin/groups/group-lessons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function fetchGroupById(id: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mocked group data
  return {
    id: "22",
    name: "Intermediate Adults",
    level: "Intermediate",
    members: 6,
    maxMembers: 8,
    schedule: "Tue, Thu 6:00 PM",
    description:
      "This group focuses on improving technique and match play for intermediate adult players. We work on consistency, shot selection, and strategy.",
    goals:
      "Develop consistent topspin groundstrokes, improve serve accuracy, and learn effective doubles strategies.",
    createdAt: "Jan 15, 2023",
  };
}

// Use the interface in the component
export default async function GroupPage({
  params,
}: {
  params: { id: string };
}) {
  const group = await fetchGroupById(params.id);

  return (
    <div className="space-y-6">
      <GroupDetails id={group.id} />
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-6">
          <GroupMembers groupId={group.id} />
        </TabsContent>
        <TabsContent value="lessons" className="mt-6">
          <GroupLessons groupId={group.id} />
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
