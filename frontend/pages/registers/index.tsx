"use client";
import { Label } from "@client/components/ui/label";
import { Tabs } from "@client/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";
import { DEFAULT_TAB, LOCAL_STORAGE_KEY, REGISTERS_TABS } from "./tabs";

const BASE_PATH = "/registers";

export function RegistersPage({ children }: PropsWithChildren) {
  const router = useRouter();
  const params = useParams();

  const activeTab = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const handleTabChange = (tabId: string) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, tabId);
    router.push(`${BASE_PATH}/${tabId}`);
  };

  useEffect(() => {
    if (activeTab) localStorage.setItem(LOCAL_STORAGE_KEY, activeTab);
  }, [activeTab]);

  return (
    <div className="relative isolate flex flex-1 flex-col">
      <div className="@container/content container mx-auto flex flex-1 flex-col gap-2 px-4">
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Tabs
            tabs={REGISTERS_TABS}
            defaultTab="owners"
            value={activeTab}
            onValueChange={handleTabChange}
            className="flex flex-1 flex-col"
          >
            <div className="relative flex flex-1 flex-col gap-4 overflow-auto">
              {children}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export function RegistersRouteRedirector() {
  const router = useRouter();

  useEffect(() => {
    const lastTab = localStorage.getItem(LOCAL_STORAGE_KEY);

    router.replace(`${BASE_PATH}/${lastTab ?? DEFAULT_TAB}`);
  }, [router]);

  return (
    <div className="flex flex-1 grow items-center justify-center">
      <Label className="text-lg">Carregando...</Label>
    </div>
  );
}
