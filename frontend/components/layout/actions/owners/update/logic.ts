import { useAvatarPreview } from "@client/hooks/avatar-preview";
import { useForm } from "@client/hooks/form";
import { makeMutation } from "@client/services/query";
import type { OwnerDTO } from "@core/contracts/dtos/owners";
import {
  updateOwnerForm,
  type UpdateOwnerFormData,
} from "@core/contracts/forms/owners";
import { useQueryClient } from "@tanstack/react-query";

const sendUpdateOwnerRequest = (id: string) =>
  makeMutation<UpdateOwnerFormData, OwnerDTO>(`/owners/${id}`, {
    method: "PUT",
    valuesToFormData: (values) => {
      const formData = new FormData();

      for (const key of Object.keys(values) as (keyof UpdateOwnerFormData)[])
        if (values[key]) formData.append(key, values[key]);

      return formData;
    },
  });

export function useUpdateOwnerLogic(loadedOwnerData: OwnerDTO) {
  const queryClient = useQueryClient();

  const formContext = useForm({
    schema: updateOwnerForm,
    defaultValues: {
      id: loadedOwnerData.id,
      fullname: loadedOwnerData.name,
      email: loadedOwnerData.email,
      phone: loadedOwnerData.phone,
      profilePicture: undefined,
    },
    requestFn: sendUpdateOwnerRequest(loadedOwnerData.id),
    successMessage: "Cuidador atualizado com sucesso!",
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });

  const profilePictureFile = formContext.form.watch("profilePicture");
  const { previewUrl } = useAvatarPreview(profilePictureFile);

  return { ...formContext, previewUrl: loadedOwnerData.profile ?? previewUrl };
}
