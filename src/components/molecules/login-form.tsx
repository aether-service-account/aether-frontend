"use client";

import { useContext } from "react";
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
import { LoginRedirects } from "@/components/molecules/login-redirects";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { firebase } from "@/firebase/config";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signIn(email: string, password: string) {
    try {
      const res = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    void signIn(data.email, data.password);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 py-2"
        >
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
          <Button type="submit" className={"w-full"}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex items-center gap-4 py-1">
        <div className="h-px flex-1 bg-primary" />
        <p className={"text-md"}>OR</p>
        <div className="h-px flex-1 bg-primary" />
      </div>
      <LoginRedirects />
    </div>
  );
};
