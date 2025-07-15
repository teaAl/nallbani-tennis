import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const DayTabs = ({ days, selectedDay, setSelectedDay }: any) => (
  <Tabs
    defaultValue={selectedDay}
    value={selectedDay}
    onValueChange={setSelectedDay}
  >
    <TabsList className="grid grid-cols-7 bg-white/10">
      {days.map((day: any) => (
        <TabsTrigger key={day.value} value={day.value}>
          {day.label}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

export default DayTabs;
