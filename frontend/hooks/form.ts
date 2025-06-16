import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { DefaultValues } from "react-hook-form";
import { useForm as useReactHookForm } from "react-hook-form";
import { toast } from "sonner";
import type { z, ZodObject, ZodRawShape } from "zod";

interface Props<
  TFormSchema extends ZodObject<ZodRawShape>,
  TFormValues extends z.infer<TFormSchema>,
  TResponseData = unknown,
> {
  schema: TFormSchema;
  defaultValues: TFormValues;
  requestFn: (formValues: TFormValues) => Promise<TResponseData>;

  successMessage: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onReset?: () => void;
}

export function useForm<
  TFormSchema extends ZodObject<ZodRawShape>,
  TFormValues extends z.infer<TFormSchema>,
  TResponseData = unknown,
>({
  schema,
  defaultValues,
  requestFn,
  successMessage,
  onSuccess,
  onError,
  onReset,
}: Props<TFormSchema, TFormValues, TResponseData>) {
  const form = useReactHookForm<TFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: defaultValues as DefaultValues<TFormValues>,
  });

  const resetForm = () => {
    onReset?.();
    form.reset(defaultValues);
  };

  const { mutate, mutateAsync, data, isPending } = useMutation({
    mutationFn: requestFn,
    onSuccess: () => {
      onSuccess?.();
      toast.success(successMessage);
      resetForm();
    },
    onError: (error: Error) => {
      onError?.(error);
      toast.error(error.message, { description: error.cause as string });
    },
    retry: false,
  });

  return {
    form,
    submit: mutate,
    submitAsync: mutateAsync,
    data,
    isPending,
    resetForm,
  };
}
