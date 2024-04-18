export const dynamic = 'force-dynamic'

import Image from "next/image";
import Link from "next/link";

import { MousePointerClick } from "lucide-react";
import randomName from "@/lib/random";
import { Icon } from "@/components/ui/nav-icon";
import HomeButton from "@/components/home-button";

export default function Home() {
  const name = randomName() + "@catdns.in";
  return (
    <main className="flex flex-col items-center justify-center my-4 px-4 md:px-36 gap-3 md:mt-40 mt-24">
      <div className="flex items-center justify-center gap-3">
        <p className="text-1xl font-bold text-center">
          Open-Source Disposable Email. Embrace transparency and security with
          our free service. Keep your inbox clean while supporting open-source
          development.
        </p>
      </div>
      <div className="border border-white/[0.2] flex flex-col items-start w-full p-4 relative">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white " />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white " />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white " />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white " />
        <div className="w-full flex justify-center items-start h-full">
          <div>
            <HomeButton preName={name} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 text-sm">
        Replace the email or stick with the random one.
        <div className="flex items-center gap-1">
          Click <MousePointerClick className="w-6 h-6" /> to get started.
        </div>
      </div>
      <section className="mt-8">
        <p className="text-1xl font-bold text-center pb-2">Made Possible By</p>
        <div className="flex gap-4">
          <Link
            href="https://postfix.in"
            target="_blank"
            title="Postfix"
            className="bg-white w-fit p-2 rounded-lg opacity-90 flex justify-center items-center hover:opacity-75"
          >
            <Image src="/postfix.webp" alt="logo" width={100} height={100} />
          </Link>
          <Link
            href="https://nextjs.org"
            target="_blank"
            title="Next.js"
            className="bg-white w-fit p-2 rounded-lg opacity-90  flex justify-center items-center hover:opacity-75"
          >
            <Image src="/nextjs.webp" alt="logo" width={100} height={100} />
          </Link>
        </div>
      </section>
    </main>
  );
}
