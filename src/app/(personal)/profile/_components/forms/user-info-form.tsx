"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type TUserEntity, userEntity } from "@/entities/user.entity";

interface Props {
  value: TUserEntity;
  disabled?: boolean;
  onSubmit?: (value: FormSchema) => void;
}
type Ref = {
  submit: () => void;
  reset: () => void;
};
export const UserInfoForm = forwardRef<Ref, Props>((props, ref) => {
  const { onSubmit, value, disabled } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: value.name,
      email: value.email,
      image: value.image,
    },
  });

  const handleSubmit = useCallback(
    (newValue: FormSchema) => {
      onSubmit?.(newValue);
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <Avatar className="h-20 w-20">
                <AvatarImage src={field.value ?? undefined} />
                <AvatarFallback>N/A</AvatarFallback>
              </Avatar>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? undefined}
                  disabled={field.disabled ?? disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? undefined}
                  disabled={field.disabled ?? disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

UserInfoForm.displayName = "UserInfoForm";
const formSchema = userEntity.pick({
  name: true,
  email: true,
  image: true,
});
type FormSchema = z.infer<typeof formSchema>;
