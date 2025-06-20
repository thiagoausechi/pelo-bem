import { Label } from "@client/components/ui/label";
import type { TabsConfig } from "@client/components/ui/tabs";
import { HeartHandshake, PawPrint, Stethoscope } from "lucide-react";
import { OwnersRegisterTab } from "./owners";
import { PetsRegisterTab } from "./pets";
import { VeterinariansRegisterTab } from "./veterinarians";

export const REGISTERS_TABS = {
  owners: {
    label: (
      <Label className="flex cursor-pointer items-center gap-2">
        <HeartHandshake className="text-muted-foreground h-4 w-4" /> Cuidadores
      </Label>
    ),
    content: <OwnersRegisterTab />,
  },
  pets: {
    label: (
      <Label className="flex cursor-pointer items-center gap-2">
        <PawPrint className="text-muted-foreground h-4 w-4" /> Pets
      </Label>
    ),
    content: <PetsRegisterTab />,
  },
  veterinarians: {
    label: (
      <Label className="flex cursor-pointer items-center gap-2">
        <Stethoscope className="text-muted-foreground h-4 w-4" /> Veterinários
      </Label>
    ),
    content: <VeterinariansRegisterTab />,
  },
} satisfies TabsConfig;

export const DEFAULT_TAB: keyof typeof REGISTERS_TABS = "owners";

export const LOCAL_STORAGE_KEY = "lastRegisterTab";
