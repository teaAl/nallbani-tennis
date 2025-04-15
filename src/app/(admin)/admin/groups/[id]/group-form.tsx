"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Define the type for your group
interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  schedule: string;
}

export function GroupForm({ group }: { group: Group }) {
  const [formData, setFormData] = useState({
    name: group.name,
    description: group.description || "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    // You can add your update logic here when you have the API ready
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Group name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description of the group"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit">Save changes</Button>
    </form>
  );
}
