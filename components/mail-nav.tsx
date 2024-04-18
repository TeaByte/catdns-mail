"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import type { EmailData } from "@/lib/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCw, MousePointerClick, LoaderCircle } from "lucide-react";
import { Icon } from "@/components/ui/nav-icon";

interface MailNavProps {
  preMail: string;
  setMails: Dispatch<SetStateAction<EmailData[] | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setError: Dispatch<SetStateAction<string | null>>;
}

export default function MailNav({
  preMail,
  setMails,
  setIsLoading,
  isLoading,
  setError,
}: MailNavProps) {
  const [mail, setMail] = useState<string>(preMail);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchMails();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  async function fetchMails() {
    setIsLoading(true);
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      if (data.mailData) {
        setMails(data.mailData);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border border-white/[0.2] flex flex-col items-start w-full p-4 relative">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white " />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white " />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white " />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white " />
      <div className="w-full flex justify-center items-start h-full">
        <div>
          <div className="flex gap-1">
            <Input
              className="md:w-52"
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
            <Link href={`/${mail.split("@")[0]}`}>
              <Button variant="outline" disabled={mail === preMail}>
                <MousePointerClick />
              </Button>
            </Link>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={async () => await fetchMails()}
            >
              <RotateCw />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
