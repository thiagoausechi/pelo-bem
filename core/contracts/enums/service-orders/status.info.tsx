import { Ban, CircleAlert, CircleCheckBig } from "lucide-react";
import type { ServiceOrderStatus, ServiceOrderStatusInfo } from "./status";

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
