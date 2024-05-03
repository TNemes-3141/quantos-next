import Image from "next/image";
import Link from "next/link";

import { Separator } from "../shadcn-ui/separator";
import LanguageSelector from "../LanugageSelector";

export default function Footer() {
    return (
        <div>
            <Separator />
            <footer className="grid grid-cols-2 px-24 py-12">
                <div className="flex flex-col justify-start items-left gap-4">
                    <Link href="https://quantos.online/">
                        <Image
                            src="/quantos_logo.svg"
                            alt="Quantos Logo"
                            width={200}
                            height={40}
                        />
                    </Link>
                    <p className="text-muted-foreground">© 2024 Tamas Nemes. Made with ❤️</p>
                </div>
                <div className="flex justify-end items-center gap-4">
                    <p>Sprache:</p>
                    <LanguageSelector />
                </div>
            </footer>
        </div>
    );
}