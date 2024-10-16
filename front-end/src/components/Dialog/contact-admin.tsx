import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ContactAdmin() {
  const t = useTranslations("LoginPage");
  const FormSchema = z.object({
    username: z.string().min(1, {
      message: t("MessageUserInput"),
    }),
    name: z.string().min(1, {
      message: t("MessageNameInput"),
    }),
    report: z.string().min(1, {
      message: t("MessageProblemInput"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      name: "",
      report: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-xs">
              <span>{t("Button.contact")}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("Dialog.titleDia")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 pt-2">
              <div className="grid grid-cols-4 items-baseline gap-4">
                <Label htmlFor="username" className="text-right">
                  {t("TextUser")}
                </Label>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          id="username"
                          placeholder={t("Dialog.Username")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-baseline gap-4">
                <Label htmlFor="name" className="text-right">
                  {t("Dialog.Name")}
                </Label>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input
                          type="text"
                          id="name"
                          placeholder={t("Dialog.NamePlacHolder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="pt-4 grid w-full gap-1.5">
                <Label htmlFor="report">{t("Dialog.Problem")}</Label>
                <FormField
                  control={form.control}
                  name="report"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Textarea
                          placeholder={t("Dialog.ProblemPlaceHolder")}
                          id="report"
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                {t("Button.Send")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
