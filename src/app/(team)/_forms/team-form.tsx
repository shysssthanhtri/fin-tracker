import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { teamEntity } from "@/entities/team.entity";

interface Props {
  isLoading?: boolean;
  onSubmit?: (value: TeamFormSchema) => void;
}
export type TeamFormRef = {
  submit: () => void;
  reset: () => void;
};

export const TeamForm = forwardRef<TeamFormRef, Props>((props, ref) => {
  const { onSubmit, isLoading } = props;

  const form = useForm<TeamFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = useCallback(
    (value: TeamFormSchema) => {
      onSubmit?.(value);
    },
    [onSubmit],
  );

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        form.reset();
        setTimeout(() => {
          form.setFocus("name");
        }, 1);
      },
      submit: () => {
        void form.handleSubmit(handleSubmit)();
      },
    }),
    [form, handleSubmit],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isLoading ?? field.disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

TeamForm.displayName = "TeamForm";

const formSchema = teamEntity.pick({
  name: true,
});
export type TeamFormSchema = z.infer<typeof formSchema>;
