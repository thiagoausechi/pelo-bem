"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@client/lib/utils";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface Tab {
  label: React.ReactNode;
  content: React.ReactNode;
}

type TabsConfig = Record<string, Tab>;

function Tabs<TTabsConfig extends TabsConfig>({
  tabs,
  defaultTab,
  className,
  children,
  ...rest
}: {
  tabs: TTabsConfig;
  defaultTab: keyof TTabsConfig;
} & Omit<React.ComponentProps<typeof TabsPrimitive.Root>, "defaultValue">) {
  return (
    <TabsRoot
      defaultValue={defaultTab as string}
      className={cn("w-full flex-col justify-start gap-6", className)}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <Label htmlFor="view-selector" className="sr-only">
          Seletor de visualização
        </Label>
        <Select defaultValue={defaultTab as string}>
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Selecione uma visualização" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(tabs).map(([key, tab]) => (
              <SelectItem key={key} value={key}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          {Object.entries(tabs).map(([key, tab]) => (
            <TabsTrigger key={key} value={key} className="cursor-pointer">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {children ??
        Object.entries(tabs).map(([key, tab]) => (
          <TabsContent
            key={key}
            value={key}
            className="relative flex flex-col gap-4 overflow-auto"
          >
            {tab.content}
          </TabsContent>
        ))}
    </TabsRoot>
  );
}

function TabsRoot({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background text-muted-foreground data-[state=active]:border-input data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  type Tab,
  type TabsConfig,
};
