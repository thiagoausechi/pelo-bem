import { cn } from "@client/lib/utils";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";

type EnumFieldProps<TOption> = {
  options: TOption[];
  getOptionValue: (option: TOption) => string;

  className?: string;
  optionClassName?: string;
  value?: string;
  onChange: (value: string) => void;
} & (
  | { getOptionLabel: (option: TOption) => React.ReactNode }
  | { renderOption: (option: TOption, selected: boolean) => React.ReactNode }
);

function SelectRadioGroup<TOption>(props: EnumFieldProps<TOption>) {
  const {
    options,
    getOptionValue,
    value,
    onChange,
    className,
    optionClassName,
  } = props;

  return (
    <RadioGroup value={value} onValueChange={onChange} className={className}>
      {options.map((option) => {
        const optVal = getOptionValue(option);
        const selected = value === optVal;
        return (
          <Label
            key={optVal}
            className={cn(
              "has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-input/20 flex items-start gap-3 rounded-lg border p-3",
              optionClassName,
            )}
            htmlFor={optVal}
            data-state={selected ? "checked" : "unchecked"}
          >
            <RadioGroupItem
              id={optVal}
              value={optVal}
              className="data-[state=checked]:border-primary"
            />
            {"renderOption" in props ? (
              props.renderOption(option, selected)
            ) : (
              <div className="grid gap-1 font-normal">
                {props.getOptionLabel(option)}
              </div>
            )}
          </Label>
        );
      })}
    </RadioGroup>
  );
}

export { SelectRadioGroup };
