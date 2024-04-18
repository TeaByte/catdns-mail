import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full bg-background z-50">
      <Separator />
      <ul className="flex py-1 px-5 justify-center items-center">
        <li>
          <a
            target="_blank"
            href="https://github.com/TeaByte/catdns-mail"
            className="hover:underline"
          >
            <strong className="text-sm">
              Made with <span className="animate-pulse">🤍</span> by @TeaByte
            </strong>
          </a>
        </li>
      </ul>
    </footer>
  );
}
