import { Quicksand, Josefin_Sans } from "next/font/google";

export const primary_font = Quicksand({
    weight: ["300", "400", "600", "700"],
    subsets: ["latin"],
    variable: "--primary-font",
});

export const secondary_font = Josefin_Sans({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    variable: "--secondary-font",
});