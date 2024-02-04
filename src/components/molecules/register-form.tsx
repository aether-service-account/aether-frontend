"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "@/firebase/config";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", // Custom error message
    path: ["confirmPassword"], // Specify the path of the field that the error is associated with
  });

export const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function signUp(email: string, password: string) {
    try {
      const res = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );
      router.push("/");
      console.log({ res });
    } catch (e) {
      console.log(e);
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signUp(data.email, data.password);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3 py-3"
        >
          <div className={cn("grid grid-cols-2 gap-3")}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={""}>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type={"text"} {...field} className={"w-full"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className={""}>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type={"text"} {...field} className={"w-full"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={""}>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type={"email"} {...field} className={"w-full"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className={""}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} className={"w-full"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className={""}>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} className={"w-full"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={"w-full"}>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};
