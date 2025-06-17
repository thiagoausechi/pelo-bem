export const serviceOrderStatus = ["PENDING", "COMPLETED", "CANCELED"] as const;

export type ServiceOrderStatus = (typeof serviceOrderStatus)[number];

export interface ServiceOrderStatusInfo {
  label: string;
  icon: React.ReactNode;
}
