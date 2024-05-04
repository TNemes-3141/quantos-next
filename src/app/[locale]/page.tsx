import AnimatedLogo from "@/components/AnimatedLogo";
import AuthOptions from "@/components/AuthOptions";

export default function Home({
  params,
}: {
  params: { locale: string; };
}) {
  
  return (
    <main className="flex flex-col items-center justify-center p-12 sm:p-24 w-full space-y-12">
      <AnimatedLogo size={300} />
      <AuthOptions locale={params.locale}/>
    </main>
  );
}
