import { useAvatarPreview } from "@client/hooks/avatar-preview";
import { useForm } from "@client/hooks/form";
import {
  createOwnerForm,
  type CreateOwnerFormData,
} from "@core/contracts/forms/owners";
import type { HttpResponse } from "@core/http";

const sendCreateOwnerRequest = async (values: CreateOwnerFormData) => {
  const formData = new FormData();
  formData.append("fullname", values.fullname);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  if (values.profilePicture)
    formData.append("profilePicture", values.profilePicture);

  const response = await fetch("/api/owners", {
    method: "POST",
    body: formData,
  });

  const body = (await response.json()) as HttpResponse<unknown>;

  if ("error" in body) throw body.error;

  return body.data;
};

export function useCreateOwnerLogic() {
  const formContext = useForm({
    schema: createOwnerForm,
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      profilePicture: undefined,
    },
    requestFn: sendCreateOwnerRequest,
    successMessage: "Cuidador criado com sucesso!",
  });

  const profilePictureFile = formContext.form.watch("profilePicture");
  const { previewUrl } = useAvatarPreview(profilePictureFile);

  return { ...formContext, previewUrl };
}
