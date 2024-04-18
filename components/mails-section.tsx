"use client";

import { useState } from "react";
import type { EmailData } from "@/lib/types";

import MailBox from "@/components/mail-box";
import MailNav from "@/components/mail-nav";
import { LoaderCircle } from "lucide-react";

interface MailsSectionProps {
  preMail: string;
  mailData: EmailData[] | null;
}

export default function MailsSection({ preMail, mailData }: MailsSectionProps) {
  const [mails, setMails] = useState<EmailData[] | null>(mailData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="w-full relative">
        {isLoading && (
          <div className="absolute w-full h-full flex flex-col items-center justify-center gap-1 bg-background opacity-90 transition-opacity duration-300 z-50 py-2">
            <LoaderCircle className="h-20 w-20 animate-spin" />
            <span className="text-xs">Retrieving Mails</span>
          </div>
        )}
        <MailNav
          preMail={preMail}
          setMails={setMails}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setError={setError}
        />
      </div>

      {mails && mails.length > 0 ? (
        <section className="relative w-full flex flex-col gap-1 cursor-pointer mails-box overflow-y-auto">
          {mails.map((mail, index) => (
            <MailBox key={index} mailData={mail} />
          ))}
        </section>
      ) : (
        <section className="w-full flex flex-col items-center gap-1 mt-20">
          <LoaderCircle className="h-24 w-24 animate-spin" />
          <p>Wating For Mails</p>
        </section>
      )}
    </>
  );
}
