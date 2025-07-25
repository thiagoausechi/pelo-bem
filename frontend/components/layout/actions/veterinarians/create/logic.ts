import { useAvatarPreview } from "@client/hooks/avatar-preview";
import { useForm } from "@client/hooks/form";
import { makeMutation } from "@client/services/query";
import type { VeterinarianDTO } from "@core/contracts/dtos/veterinarians";
import { brazilianStates } from "@core/contracts/enums/veterinarians/brazilian-states";
import {
  createVeterinarianForm,
  type CreateVeterinarianFormData,
} from "@core/contracts/forms/veterinarian";
import { useQueryClient } from "@tanstack/react-query";

const sendCreateVeterinarianRequest = makeMutation<
  CreateVeterinarianFormData,
  VeterinarianDTO
>("/veterinarians", {
  valuesToFormData: (values) => {
    const formData = new FormData();
    formData.append("fullname", values.fullname);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("licenseState", values.licenseState);
    formData.append("licenseNumber", values.licenseNumber);
    if (values.profilePicture)
      formData.append("profilePicture", values.profilePicture);

    return formData;
  },
});

export function useCreateVeterinarianLogic() {
  const queryClient = useQueryClient();

  const formContext = useForm({
    schema: createVeterinarianForm,
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      licenseState: brazilianStates[0],
      licenseNumber: "",
      profilePicture: undefined,
    },
    requestFn: sendCreateVeterinarianRequest,
    successMessage: "Veterinário criado com sucesso!",
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["veterinarians"] });
    },
  });

  const profilePictureFile = formContext.form.watch("profilePicture");
  const { previewUrl } = useAvatarPreview(profilePictureFile);

  return { ...formContext, previewUrl };
}
