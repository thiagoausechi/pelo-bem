"use client";

import { cn } from "@client/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface SelectFieldProps<TOption> {
  options: TOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  getOptionValue: (option: TOption) => string;
  getOptionLabel: (option: TOption) => React.ReactNode;
  renderOption?: (option: TOption, selected: boolean) => React.ReactNode;

  disabled?: boolean;

  className?: string;
  value?: string;
  onChange: (value: string) => void;
}

function SelectDropdown<TOption>(props: SelectFieldProps<TOption>) {
  const {
    options,
    placeholder = "Selecionar...",
    searchPlaceholder = "Buscar...",
    getOptionValue,
    getOptionLabel,
    renderOption,
    disabled = false,
    value,
    onChange,
    className,
  } = props;

  const [open, setOpen] = React.useState(false);
  const selectedOption = options.find((o) => getOptionValue(o) === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between", className)}
        >
          {selectedOption ? getOptionLabel(selectedOption) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command loop>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList className="h-(--cmdk-list-height) max-h-[400px]">
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const optValue = getOptionValue(option);
                const isSelected = value === optValue;

                return (
                  <CommandItem
                    key={optValue}
                    onSelect={() => {
                      onChange(optValue);
                      setOpen(false);
                    }}
                  >
                    {renderOption
                      ? renderOption(option, isSelected)
                      : getOptionLabel(option)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { SelectDropdown as SelectorField };
