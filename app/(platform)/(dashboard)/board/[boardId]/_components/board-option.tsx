'use client';
import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";
import { deleteBoard } from "@/actions/delete-board";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from 'react';
import AddMembers from "@/components/ui/add-member";

interface BoardOptionsProps {
  id: string;
  members: string[]; // Add a prop for the list of members
}

export const BoardOptions = ({ id, members }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    }
  });

  const [isAddMembersOpen, setIsAddMembersOpen] = useState(false);

  const onDelete = () => {
    execute({ id });
  };

  const handleAddMembers = () => {
    setIsAddMembersOpen(true);
  };

  const handleCloseAddMembers = () => {
    setIsAddMembersOpen(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board actions
        </div>
        <Button
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          onClick={handleAddMembers}
        >
          Add Members
        </Button>
        <PopoverClose asChild>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this board
        </Button>
      </PopoverContent>
      {isAddMembersOpen && (
        <AddMembers onClose={handleCloseAddMembers} members={members} />
      )}
    </Popover>
  );
};