import { useForm } from "@client/hooks/form";
import { makeMutation } from "@client/services/query";
import { loginForm, type LoginFormData } from "@core/contracts/forms/login";
import { useRouter } from "next/navigation";

const sendLoginRequest = makeMutation<LoginFormData, void>("/auth/login", {
  valuesToFormData: (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);
    return formData;
  },
});

export function useLoginLogic() {
  const router = useRouter();

  const formContext = useForm({
    schema: loginForm,
    defaultValues: {
      username: "",
      password: "",
    },
    requestFn: sendLoginRequest,
    successMessage: "Login realizado com sucesso!",
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
  });

  return formContext;
}
