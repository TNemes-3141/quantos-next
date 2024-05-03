import Image from "next/image";
import Link from "next/link";

import { Separator } from "../shadcn-ui/separator";
import LanguageSelector from "../LanugageSelector";

import { ValidLocale, getTranslator } from "@/i18n";

export default function Footer() {
    return (
        <div>
            <Separator />
            <footer className="grid max-sm:grid-rows-2 md:grid-cols-2 px-24 py-12 gap-6">
                <div className="flex flex-col justify-start items-left gap-4">
                    <Link href="https://quantos.online/">
                        <Image
                            src="/assets/quantos_logo.svg"
                            alt="Quantos Logo"
                            width={200}
                            height={40}
                        />
                    </Link>
                    <p className="text-muted-foreground">© 2024 Tamas Nemes. Made with ❤️ with support from&nbsp;
                        <Link href="https://www.fz-juelich.de/en/ias/jsc" className="underline">Jülich Supercomputing Centre</Link>
                    </p>
                </div>
                <div className="flex justify-center md:justify-end items-center gap-4">
                    <p>Sprache:</p>
                    <LanguageSelector />
                </div>
            </footer>
        </div>
    );
}