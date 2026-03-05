"use client";

import { deleteCarMutation } from "@/actions/mutation";
import { useAsyncAction } from "@/hooks/use-async-action";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";

export const DeleteCarAction = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const { isProcessing, runAction } = useAsyncAction(deleteCarMutation, {
    onSuccess: () => {
      toast({
        title: "Car deleted successfully",
        description: `${id} deleted successfully`,
      });
    },

    onError: () => {
      toast({
        title: "Error deleting car",
        description: `${id} not deleted`,
        variant: "destructive",
      });
    },
  });
  const handleDelete = () => {
    if (confirm("Delete this car?")) {
      runAction(id);
    }
  };
  return (
    <button
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      onClick={handleDelete}
      disabled={isProcessing}
    >
      <Trash2 className="h-4 w-4 text-muted-foreground" />
    </button>
  );
};
