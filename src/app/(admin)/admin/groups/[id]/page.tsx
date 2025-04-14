import { GroupDetails } from "@/components/admin/groups/group-details";
import { GroupMembers } from "@/components/admin/groups/group-members";
import { GroupLessons } from "@/components/admin/groups/group-lessons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";

// Option 1: Use the interface you've already defined
interface GroupPageProps {
  params: {
    id: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
}
// // Use the interface in the component
// export default function GroupPage({ params }: GroupPageProps) {
//   return (
//     <div className="space-y-6">
//       <GroupDetails id={params.id} />

//       <Tabs defaultValue="members">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="members">Members</TabsTrigger>
//           <TabsTrigger value="lessons">Lessons</TabsTrigger>
//           <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
//         </TabsList>
//         <TabsContent value="members" className="mt-6">
//           <GroupMembers groupId={params.id} />
//         </TabsContent>
//         <TabsContent value="lessons" className="mt-6">
//           <GroupLessons groupId={params.id} />
//         </TabsContent>
//         <TabsContent value="goals" className="mt-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-xl font-medium mb-4">Group Goals & Progress</h3>
//             {/* Goals and progress content */}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// This is a server component - it runs on the server
const GroupPage = async ({ params }: GroupPageProps) => {
  // Valid ID format check
  if (!params.id || params.id === "new") {
    return <GroupForm />;
  }

  // Fetch the group data
  const group = await prisma.group.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!group) {
    notFound();
  }

  return <GroupForm initialData={group} />;
};

export default GroupPage;

const GroupForm = ({ initialData }: { initialData?: any }) => {
  return (
    <div className="space-y-6">
      <GroupDetails id={initialData.id} />

      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-6">
          <GroupMembers groupId={initialData.id} />
        </TabsContent>
        <TabsContent value="lessons" className="mt-6">
          <GroupLessons groupId={initialData.id} />
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
};
