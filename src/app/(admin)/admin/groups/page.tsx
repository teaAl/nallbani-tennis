import React from "react";
import { Plus } from "lucide-react";
import { GroupsList } from "../../../../components/admin/groups/list";
import { Button } from "../../../../components/ui/button";

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Training Groups</h1>
        <Button className="bg-lime-500 hover:bg-lime-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </div>
      <GroupsList />
    </div>
  );
}
