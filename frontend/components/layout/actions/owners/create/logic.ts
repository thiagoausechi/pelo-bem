import { useAvatarPreview } from "@client/hooks/avatar-preview";
import { useForm } from "@client/hooks/form";
import { makeMutation } from "@client/services/query";
import type { OwnerDTO } from "@core/contracts/dtos/owners";
import {
  createOwnerForm,
  type CreateOwnerFormData,
} from "@core/contracts/forms/owners";
import { useQueryClient } from "@tanstack/react-query";

const sendCreateOwnerRequest = makeMutation<CreateOwnerFormData, OwnerDTO>(
  "/owners",
  {
    valuesToFormData: (values) => {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (values.profilePicture)
        formData.append("profilePicture", values.profilePicture);

      return formData;
    },
  },
);

export function useCreateOwnerLogic() {
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });

  const profilePictureFile = formContext.form.watch("profilePicture");
  const { previewUrl } = useAvatarPreview(profilePictureFile);

  return { ...formContext, previewUrl };
}
