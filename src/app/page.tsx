"use client";

import AnimatedLogo from "@/components/AnimatedLogo";
import LoginOption from "@/components/LoginOption";
import { Card } from "@/components/shadcn-ui/card";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-24 w-full space-y-12">
      <AnimatedLogo size={300} />
      <Card className="max-w-lg w-full space-y-12 p-10">
        <LoginOption optionText="Neu hier?" buttonText="Registrieren" target="/" />
        <LoginOption optionText="Bereits an Bord?" buttonText="Einloggen" target="/" />
        <LoginOption optionText="Teil einer Klasse oder eines Teams?" buttonText="Zugangscode eingeben" target="/" />
      </Card>
    </main>
  );
}
