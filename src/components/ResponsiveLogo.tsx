import Image from "next/image";

export default function ResponsiveLogo() {
    return (
        <>
            <Image
                className="hidden dark:block"
                src="/assets/quantos_logo_onDark.svg"
                alt="Quantos Logo"
                width={200}
                height={40}
            />
            <Image
                className="block dark:hidden"
                src="/assets/quantos_logo_onLight.svg"
                alt="Quantos Logo"
                width={200}
                height={40}
            />
        </>
    );
}