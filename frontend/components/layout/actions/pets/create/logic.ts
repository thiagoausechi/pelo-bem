import { useAvatarPreview } from "@client/hooks/avatar-preview";
import { useForm } from "@client/hooks/form";
import {
  fetchOwnersDropdownList,
  ownersDropdownListQueryKey,
} from "@client/services/owners";
import { makeMutation } from "@client/services/query";
import type { PetDTO } from "@core/contracts/dtos/pets";
import { genders, species } from "@core/contracts/enums/pets";
import {
  createPetForm,
  type CreatePetFormData,
} from "@core/contracts/forms/pet";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sendCreatePetRequest = makeMutation<CreatePetFormData, PetDTO>("/pets", {
  valuesToFormData: (values) => {
    const formData = new FormData();
    formData.append("ownerId", values.ownerId);
    formData.append("name", values.name);
    formData.append("specie", values.specie);
    formData.append("breed", values.breed);
    formData.append("birthday", values.birthday.toISOString());
    formData.append("weightKg", values.weightKg.toString());
    formData.append("heightCm", values.heightCm.toString());
    formData.append("gender", values.gender);
    if (values.picture) formData.append("picture", values.picture);

    return formData;
  },
});

export function useCreatePetLogic() {
  const queryClient = useQueryClient();

  const formContext = useForm({
    schema: createPetForm,
    defaultValues: {
      ownerId: "",
      name: "",
      specie: species[0],
      breed: "",
      birthday: new Date(),
      weightKg: 0,
      heightCm: 0,
      gender: genders[0],
      picture: undefined,
    },
    requestFn: sendCreatePetRequest,
    successMessage: "Pet criado com sucesso!",
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const {
    data: ownersList,
    isLoading: isLoadingOwners,
    isFetching: isFetchingOwners,
    isError: isErrorOwners,
  } = useQuery({
    queryKey: ownersDropdownListQueryKey,
    queryFn: fetchOwnersDropdownList,
  });

  const ownerSelected = !!formContext.form.watch("ownerId");

  const pictureFile = formContext.form.watch("picture");
  const { previewUrl } = useAvatarPreview(pictureFile);

  return {
    ...formContext,
    ownersList: ownersList ?? [],
    isLoadingOwners: isLoadingOwners || isFetchingOwners,
    isErrorOwners,
    ownerSelected,
    previewUrl,
  };
}
