import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Textarea } from "@/components/ui/textarea";

export default function ContactAdmin() {
  const t = useTranslations("LoginPage");
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" className="text-xs">
          {t("Button.contact")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("Dialog.titleDia")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              {t("Dialog.Username")}
            </Label>
            <Input
              id="username"
              placeholder={t("UsernamePlaceHolder")}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              {t("Dialog.Name")}
            </Label>
            <Input
              id="name"
              placeholder={t("Dialog.Name")}
              className="col-span-3"
            />
          </div>
          <div className="pt-1 grid w-full gap-1.5">
            <Label htmlFor="message">{t("Dialog.Problem")}</Label>
            <Textarea
              placeholder={t("Dialog.ProblemPlaceHolder")}
              id="message"
              className="resize-none h-24"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">{t("Button.Send")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
