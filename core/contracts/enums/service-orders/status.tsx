import { Ban, CircleAlert, CircleCheckBig } from "lucide-react";

export const serviceOrderStatus = ["PENDING", "COMPLETED", "CANCELED"] as const;

export type ServiceOrderStatus = (typeof serviceOrderStatus)[number];

export interface ServiceOrderStatusInfo {
  label: string;
  icon: React.ReactNode;
}

export const ServiceOrderStatusesInfo: Record<
  ServiceOrderStatus,
  ServiceOrderStatusInfo
> = {
  COMPLETED: {
    label: "concluída",
    icon: <CircleCheckBig className="size-4" />,
  },
  PENDING: {
    label: "pendente",
    icon: <CircleAlert className="size-4" />,
  },
  CANCELED: {
    label: "cancelada",
    icon: <Ban className="size-4" />,
  },
} as const;
