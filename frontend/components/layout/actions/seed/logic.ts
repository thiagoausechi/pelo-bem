import { makeMutation } from "@client/services/query";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const sendSeedRequest = makeMutation<void, void>("/seed", {
  valuesToFormData: () => new FormData(),
});

export function useSeedLogic() {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const { mutate: startSeeding, isPending } = useMutation({
    mutationFn: sendSeedRequest,
    onSuccess: () => {
      setIsAlertDialogOpen(false);
      toast.success("Banco de dados semeado com sucesso!");
    },
    onError: (error: Error) => {
      setIsAlertDialogOpen(false);
      toast.error(error.message, { description: error.cause as string });
    },
    retry: false,
  });

  return { startSeeding, isPending, isAlertDialogOpen, setIsAlertDialogOpen };
}
