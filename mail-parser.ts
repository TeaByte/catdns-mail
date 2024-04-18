import db from "@/database/database";
import fs from "fs";
import { MailParser } from "mailparser";

console.log("Running email watcher...");

// Path to the mailbox file
const mailboxPath: string = "/var/mail/root";
let processing: boolean = false;

function unixTimestampToTimeString(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours < 12 ? "AM" : "PM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");
  const timeString = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return timeString;
}

// Watching for changes in the mailbox file
fs.watch(mailboxPath, (eventType: string, filename: string | Buffer | null) => {
  if (processing) return; // Exit if already processing
  if (eventType === "change" && filename !== null) {
    console.log("Mailbox file changed.");

    processing = true;
    fs.readFile(
      mailboxPath,
      "utf8",
      (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
          console.error("Error reading mailbox file:", err);
          processing = false;
          return;
        }

        // Split the mailbox file into individual email messages
        const emailMessages: string[] = data.split(/^From\s+/m).filter(Boolean);

        emailMessages.forEach((emailData: string, index: number) => {
          const mailparser = new MailParser();
          let mailData: {
            attachments: any[];
            sentTo: string;
            sentFrom: string;
            subject: string;
            data: { content: string; type: string };
            date: Number;
          } = {
            attachments: [],
            sentTo: "",
            sentFrom: "",
            subject: "",
            data: { content: "", type: "" },
            date: Date.now(),
          };

          const emailRegex = /(.+?)\s<([^>]+)>/;

          mailparser.on("end", () => {
            let email = "";
            let user = "";
            const match = mailData.sentFrom.match(emailRegex);
            if (match) {
              user = match[1];
              email = match[2];
            }
            db.set(
              mailData.sentTo,
              [
                {
                  data: mailData.data,
                  date: unixTimestampToTimeString(mailData.date.valueOf()),
                  sentFrom: { email, user },
                  subject: mailData.subject,
                },
              ],
              10000
            );
          });

          mailparser.on("headers", (headers: any) => {
            mailData.sentTo = headers.get("to").text;
            mailData.sentFrom = headers.get("from").text;
            mailData.subject = headers.get("subject");
          });

          mailparser.on("data", (data: any) => {
            if (data.type === "attachment") {
              mailData.attachments.push(data);
              data.content.on("readable", () => data.content.read());
              data.content.on("end", () => data.release());
            } else {
              console.log(data);
              mailData.data.type = data.type;
              mailData.data.content =
                data.text === undefined ? data.html : data.text;
            }
          });
          mailparser.write(emailData);
          mailparser.end();
        });

        // Truncate the mailbox file to remove the read emails
        fs.truncate(mailboxPath, 0, (err: NodeJS.ErrnoException | null) => {
          if (err) {
            console.error("Error truncating mailbox file:", err);
          }
          console.log("Mailbox file truncated successfully.");
          processing = false;
        });
      }
    );
  }
});
