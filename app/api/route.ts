import db from "@/database/database";
import { NextRequest } from "next/server";
import { returnError, returnSuccess } from "@/lib/api";

export async function POST(request: NextRequest) {
  const data = await request.json();
  let { mail }: { mail: string } = data;

  if (!mail) {
    return returnError({
      message: "No mail provided.",
    });
  }

  mail = mail.toLowerCase().trim();

  if (!mail.includes("@catdns.in")) {
    return returnError({
      message: "We only support @catdns.in mails!",
    });
  }

  try {
    const mailData = await db.get(mail);
    if (!mailData) {
      return returnSuccess({
        message: "No mails found yet.",
      });
    }
    return returnSuccess({
      mailData,
      message: "Mails fetched successfully.",
    });
  } catch {
    return returnError({
      message: "Something went wrong.",
    });
  }
}
