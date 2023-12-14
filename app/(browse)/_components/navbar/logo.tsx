import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition min-w-[36px] mr-2">
        <div className="bg-white rounded-full p-1 shrink w-fit">
          <Image src="/spooky.svg" alt="Dadawitch" width={32} height={32} />
        </div>
        <div className={(cn(font.className), "hidden lg:block")}>
          <p className="text-lg font-semibold">Dadawitch</p>
          <p className="text-muted-foreground text-sm">Let&apos;s stream</p>
        </div>
      </div>
    </Link>
  );
};
