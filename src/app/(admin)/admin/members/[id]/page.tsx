import { MemberProfile } from "@/components/admin/members/profile";
import { MemberLessons } from "@/components/admin/members/lessons";
import { MemberGroups } from "@/components/admin/members/groups";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function MemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="space-y-6">
      <MemberProfile id={id} />

      <Tabs defaultValue="lessons">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons" className="mt-6">
          <MemberLessons memberId={id} />
        </TabsContent>
        <TabsContent value="groups" className="mt-6">
          <MemberGroups memberId={id} />
        </TabsContent>
        <TabsContent value="progress" className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium mb-4">Progress Tracking</h3>
            {/* Progress tracking content */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// export default async function MemberPage() {
//   return <div> Member Page</div>;
// }
