export const serviceOrderStatus = ["PENDING", "COMPLETED", "CANCELED"] as const;

export type ServiceOrderStatus = (typeof serviceOrderStatus)[number];

export interface ServiceOrderStatusInfo {
  label: string;
}

export const ServiceOrderStatusesInfo: Record<
  ServiceOrderStatus,
  ServiceOrderStatusInfo
> = {
  PENDING: {
    label: "Pendente",
  },
  COMPLETED: {
    label: "Concluída",
  },
  CANCELED: {
    label: "Cancelada",
  },
} as const;
