"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

interface MemberGroupsProps {
  memberId: string
}

export function MemberGroups({ memberId }: MemberGroupsProps) {
  // In a real app, this data would come from your API based on the memberId
  const groups = [
    {
      id: "1",
      name: "Intermediate Adults",
      level: "Intermediate",
      schedule: "Tue, Thu 6:00 PM",
      joinedOn: "Mar 20, 2023",
    },
  ]

  return (
    <div>
      {groups.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Joined On</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">
                    <Link href={`/groups/${group.id}`} className="hover:underline">
                      {group.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{group.level}</Badge>
                  </TableCell>
                  <TableCell>{group.schedule}</TableCell>
                  <TableCell>{group.joinedOn}</TableCell>
                  <TableCell>
                    <Button variant="default" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove from group</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border rounded-md">This member is not part of any groups.</div>
      )}
    </div>
  )
}
