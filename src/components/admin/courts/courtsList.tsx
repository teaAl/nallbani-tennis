"use client";

import { Modal } from "@/components/ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useCourtStore } from "@/stores/courtStore";

const CourtsList = () => {
  const { courts, loading, error, removeCourt, fetchCourts } = useCourtStore();
  const [deleteCourtModalOpen, setDeleteCourtModalOpen] = useState(false);
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);

  const handleDeleteCourt = async () => {
    if (selectedCourtId) {
      await removeCourt(selectedCourtId);
      setDeleteCourtModalOpen(false);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  return (
    <div className="space-y-6 py-6">
      {loading && <p>Loading courts...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {courts.length === 0 && !loading && (
        <p className="text-gray-500">There aren't any registered courts</p>
      )}
      {courts.length > 0 && (
        <div className="rounded-md border border-pear/20">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Surface</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courts.map((court, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="text-gray-900">{court.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{court.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{court.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">
                      {court.indoor ? "indoor" : "outdoor"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Trash2Icon
                      className="h-4 w-4 text-red-500 cursor-pointer hover:scale-110 transition-all duration-200"
                      onClick={() => {
                        setDeleteCourtModalOpen(true);
                        setSelectedCourtId(court.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Modal
            isOpen={deleteCourtModalOpen}
            onClose={() => setDeleteCourtModalOpen(false)}
          >
            <h2 className="text-lg font-bold mb-4 text-center text-red-500">
              Are you sure you want to delete this court?
            </h2>
            <div className="flex flex-row justify-center items-center">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
                onClick={handleDeleteCourt}
              >
                Delete Court
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200 ml-2"
                onClick={() => {
                  setDeleteCourtModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default CourtsList;

/*
    TODO: Add edit court modal + API
*/
