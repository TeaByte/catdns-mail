"use client";

import Link from "next/link";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

interface HomeButtonProps {
  preName: string;
}

export default function HomeButton({ preName }: HomeButtonProps) {
  const [name, setName] = useState<string>(preName);
  return (
    <div className="flex gap-1">
      <Input
        type="email"
        className="w-60"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Link href={`/${name.split("@")[0]}`}>
        <Button variant="outline">
          <MousePointerClick />
        </Button>
      </Link>
    </div>
  );
}
