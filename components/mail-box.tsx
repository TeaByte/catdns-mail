import type { EmailData } from "@/lib/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

interface MailBoxProps {
  mailData: EmailData;
}

export default function MailBox({ mailData }: MailBoxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-full flex justify-evenly items-center p-2 hover:animate-pulse hover:opacity-90 transition-opacity">
          <div className="flex flex-col grow">
            <span>{mailData.sentFrom.email}</span>
            <span>{mailData.subject}</span>
          </div>
          <span className="text-xs opacity-90">{mailData.date}</span>
        </Card>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>{mailData.subject}</DialogTitle>
          <DialogDescription>{mailData.sentFrom.email}</DialogDescription>
        </DialogHeader>
        <div dangerouslySetInnerHTML={{ __html: mailData.data.textAsHtml ? mailData.data.textAsHtml : mailData.data.text  }}></div>
      </DialogContent>
    </Dialog>
  );
}
