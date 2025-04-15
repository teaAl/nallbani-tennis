import { GroupDetails } from "@/components/admin/groups/group-details";
import { GroupMembers } from "@/components/admin/groups/group-members";
import { GroupLessons } from "@/components/admin/groups/group-lessons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Repo = {
  name: string;
  stargazers_count: number;
  id: string;
};

export const getServerSideProps = (async () => {
  const res = await fetch("https://fake-json-api.mock.beeceptor.com/users");
  const repo: Repo = await res.json();
  return {
    props: { repo },
  };
}) satisfies GetServerSideProps<{ repo: Repo }>;

// Use the interface in the component
export default async function GroupPage({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="space-y-6">
      <GroupDetails id={repo.id} />
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="goals">Goals & Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="members" className="mt-6">
          <GroupMembers groupId={repo.id} />
        </TabsContent>
        <TabsContent value="lessons" className="mt-6">
          <GroupLessons groupId={repo.id} />
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
