"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/routing";
import { axiosInstace } from "@/utils/axios";

export default function Login() {
  const t = useTranslations("LoginPage");
  const router = useRouter();
  const FormSchema = z.object({
    username: z.string().min(1, {
      message: t("MessageUserInput"),
    }),
    password: z.string().min(1, {
      message: t("MessagePassInput"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await axiosInstace.post("/", data);
      toast({
        variant: "default",
        title: "✅ Login Success !!",
        description: "Hi!! Welcome",
      });
      router.push("/");
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "❌ Login Fail",
        description: "Login fail please try again",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form {...form}>
        <form className="p-8 rounded-md shadow-lg w-full max-w-sm">
          <div>
            <h1 className="text-xl font-bold">{t("title")}</h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="mt-4">
                    <Input
                      type="username"
                      placeholder={t("UsernamePlaceHolder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("PasswordPlaceHolder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <hr className="mt-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              className="mt-4 w-full"
            >
              {t("Button.submit")}
            </Button>
            <div className="flex items-center justify-center">
              <Button variant="link" className="text-xs">
                {t("Button.contact")}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
