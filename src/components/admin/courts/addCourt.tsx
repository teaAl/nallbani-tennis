"use client";

import { Card, CardContent } from "@/components/ui/memberCard";
import ActionButton from "@/components/ui/actionbtn";
import CourtsList from "./courtsList";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useCourtStore } from "@/stores/courtStore";

export function AddCourts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courtName, setCourtName] = useState<string | null>(null);
  const [courtType, setCourtType] = useState<"CLAY" | "HARD" | "GRASS">("HARD");
  const [courtSurface, setCourtSurface] = useState<"indoor" | "outdoor">(
    "indoor"
  );
  const { addCourt, loading } = useCourtStore();

  const handleAddCourt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courtName) {
      alert("Please enter a court name");
      return;
    }
    await addCourt({
      name: courtName,
      type: courtType,
      indoor: courtSurface === "indoor",
    });
    setCourtName("");
    setCourtType("HARD");
    setCourtSurface("indoor");
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="bg-pear/5 border-0 shadow-none">
        <CardContent className="pt-6 bg-transparent">
          <div className="flex flex-row justify-between items-center border-b border-b-pear/10 pb-4">
            <h3 className="text-foreground font-poppins text-lg">
              All available courts
            </h3>
            <ActionButton
              variant="secondary"
              size="sm"
              text={"Add a Court"}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <CourtsList />
        </CardContent>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4  text-pear">Add a new court</h2>
        <form className="flex flex-col gap-1" onSubmit={handleAddCourt}>
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              Court Name
            </label>
            <input
              type="text"
              placeholder="fusha 1"
              value={courtName || ""}
              onChange={(e) => setCourtName(e.target.value)}
              className="border border-pear rounded-md p-2 mb-4 w-full focus:outline-pear placeholder:text-foreground/30"
            />
          </div>
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              Court Surface
            </label>
            <select
              value={courtType}
              onChange={(e) =>
                setCourtType(e.target.value as "CLAY" | "HARD" | "GRASS")
              }
              className="w-full border rounded-md p-2 mb-4 border-pear focus:outline-pear"
            >
              <option value="HARD">Hard Court</option>
              <option value="CLAY">Clay</option>
              <option value="GRASS">Grass</option>
            </select>
          </div>
          <div>
            <label className="text-foreground/70 text-sm font-poppins font-light">
              Court Type
            </label>
            <select
              value={courtSurface || ""}
              onChange={(e) =>
                setCourtSurface(e.target.value as "indoor" | "outdoor")
              }
              className="w-full border rounded-md p-2 mb-4 border-pear focus:outline-pear"
            >
              <option value="outdoor">Outdoor</option>
              <option value="indoor">Indoor</option>
            </select>
          </div>
          <div className="flex flex-row justify-end items-center">
            <button
              type="submit"
              className="bg-pear hover:bg-pear/80 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Court"}
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ml-2"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddCourts;

/*
TODO: adjust court id on list 
*/
