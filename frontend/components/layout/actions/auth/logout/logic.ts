import { makeMutation } from "@client/services/query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const sendLogoutRequest = makeMutation<void, void>("/auth/logout", {
  valuesToFormData: () => new FormData(),
});

export function useLogoutLogic() {
  const router = useRouter();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: sendLogoutRequest,
    onSuccess: () => {
      router.push("/login");
      router.refresh();
    },
    onError: () => toast.error("Erro ao realizar logout"),
    retry: false,
  });

  return { logout, isPending };
}
