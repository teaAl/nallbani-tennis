"use client";

// import PersonalInfo from "./settings/personalInfo";
import ChangePassword from "./settings/changepass";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordation";
import { Shield, UserCircle2 } from "lucide-react";
import { UserNT } from "@/interfaces/usernt.interface";

export default function ProfileSettings({ user }: { user: UserNT | null }) {
  return (
    <Accordion type="single" defaultValue="item-1" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger value={"item-1"}>
          <h3 className="text-sm font-medium flex items-center text-pear">
            <UserCircle2 className="h-4 w-4 mr-2" />
            Personal Info
          </h3>
        </AccordionTrigger>
        <AccordionContent value="item-1">
          {/* <PersonalInfo user={user as UserNT} /> */}
          <div>Personal Info</div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger value="item-2">
          <h3 className="text-sm font-medium flex items-center text-pear">
            <Shield className="h-4 w-4 mr-2" />
            Password
          </h3>
        </AccordionTrigger>
        <AccordionContent value="item-2">
          <ChangePassword /*user={user as UserNT}*/ />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
