import db from "@/database/database";
import MailsSection from "@/components/mails-section";

interface MailProps {
  params: { slug: string };
}

export default async function Mail({ params }: MailProps) {
  const mail = params.slug + "@catdns.in";
  const mailData = await db.get(mail);
  return (
    <main className="flex flex-col items-center justify-between my-4 px-4 md:px-36 gap-3">
      <MailsSection preMail={mail} mailData={mailData} />
    </main>
  );
}
