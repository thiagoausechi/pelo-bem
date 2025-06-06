export const ServiceOrderStatuses = {
  PENDING: {
    id: "pending",
    label: "Pendente",
  },
  COMPLETED: {
    id: "completed",
    label: "Concluída",
  },
  CANCELED: {
    id: "canceled",
    label: "Cancelada",
  },
} as const;
Object.freeze(ServiceOrderStatuses);

export type ServiceOrderStatus = keyof typeof ServiceOrderStatuses;
