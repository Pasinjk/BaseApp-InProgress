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
import ContactAdmin from "@/components/Dialog/contact-admin";
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";

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
        description: "Hi !! Welcome",
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
        <div className="p-8 rounded-md shadow-lg w-full max-w-fit">
          <form>
            <h1 className="text-xl font-bold">{t("title")}</h1>
            <div className="flex-row mt-7">
              <div className="flex justify-between items-baseline">
                <div className="flex justify-between items-center">
                  <FaUserLarge className="ml-2" />
                  <h1 className="pl-2 ">{t("TextUser")}</h1>
                </div>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="max-w-full pl-4">
                      <FormControl>
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
              </div>

              <div className="flex justify-between items-baseline mt-4">
                <div className="flex justify-between items-center">
                  <FaLock className="ml-2" />
                  <h1 className="pl-2">{t("TextPass")}</h1>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="max-w-full pl-4">
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
              </div>
            </div>

            <hr className="mt-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              className="mt-4 w-full"
            >
              {t("Button.submit")}
            </Button>
          </form>
          <div className="flex items-center justify-center">
            <ContactAdmin />
          </div>
        </div>
      </Form>
    </div>
  );
}
