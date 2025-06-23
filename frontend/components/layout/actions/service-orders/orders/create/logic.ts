import { useForm } from "@client/hooks/form";
import {
  fetchPetsDropdownList,
  petsDropdownListQueryKey,
} from "@client/services/pets";
import { makeMutation } from "@client/services/query";
import {
  fetchServiceTypesDropdownList,
  serviceTypesDropdownListQueryKey,
} from "@client/services/service-orders/service-types-dropdown-list";
import {
  fetchVeterinariansDropdownList,
  veterinariansDropdownListQueryKey,
} from "@client/services/veterinarians";
import type { ServiceOrderDTO } from "@core/contracts/dtos/service-orders";
import { serviceOrderStatus } from "@core/contracts/enums/service-orders";
import {
  createServiceOrderForm,
  type CreateServiceOrderFormData,
} from "@core/contracts/forms/service-order";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sendCreateServiceOrderRequest = makeMutation<
  CreateServiceOrderFormData,
  ServiceOrderDTO
>("/service-orders/orders", {
  valuesToFormData: (values) => {
    const formData = new FormData();
    formData.append("petId", values.petId);
    formData.append("veterinarianId", values.veterinarianId);
    formData.append("serviceTypeId", values.serviceTypeId);
    formData.append("appointmentDate", values.appointmentDate.toISOString());
    formData.append("status", values.status);

    return formData;
  },
});

export function useCreateServiceOrderLogic() {
  const queryClient = useQueryClient();

  const formContext = useForm({
    schema: createServiceOrderForm,
    defaultValues: {
      petId: "",
      veterinarianId: "",
      serviceTypeId: "",
      appointmentDate: new Date(),
      status: serviceOrderStatus[0],
    },
    requestFn: sendCreateServiceOrderRequest,
    successMessage: "Agendamento criado com sucesso!",
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["service-orders"] });
    },
  });

  const {
    data: serviceTypesList,
    isLoading: isLoadingServiceTypes,
    isFetching: isFetchingServiceTypes,
    isError: isErrorServiceTypes,
  } = useQuery({
    queryKey: serviceTypesDropdownListQueryKey,
    queryFn: fetchServiceTypesDropdownList,
  });

  const {
    data: petsList,
    isLoading: isLoadingPets,
    isFetching: isFetchingPets,
    isError: isErrorPets,
  } = useQuery({
    queryKey: petsDropdownListQueryKey,
    queryFn: fetchPetsDropdownList,
  });

  const {
    data: veterinariansList,
    isLoading: isLoadingVeterinarians,
    isFetching: isFetchingVeterinarians,
    isError: isErrorVeterinarians,
  } = useQuery({
    queryKey: veterinariansDropdownListQueryKey,
    queryFn: fetchVeterinariansDropdownList,
  });

  const enableFormFields =
    !!formContext.form.watch("serviceTypeId") &&
    !!formContext.form.watch("petId") &&
    !!formContext.form.watch("veterinarianId");

  return {
    ...formContext,
    enableFormFields,
    serviceTypesList: {
      data: serviceTypesList ?? [],
      isLoading: isLoadingServiceTypes || isFetchingServiceTypes,
      isError: isErrorServiceTypes,
      isSelected: !!formContext.form.watch("serviceTypeId"),
    },
    petsList: {
      data: petsList ?? [],
      isLoading: isLoadingPets || isFetchingPets,
      isError: isErrorPets,
      isSelected: !!formContext.form.watch("petId"),
    },
    veterinariansList: {
      data: veterinariansList ?? [],
      isLoading: isLoadingVeterinarians || isFetchingVeterinarians,
      isError: isErrorVeterinarians,
      isSelected: !!formContext.form.watch("veterinarianId"),
    },
  };
}
