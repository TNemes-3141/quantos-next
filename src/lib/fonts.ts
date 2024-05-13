import { Poppins, Readex_Pro } from "next/font/google";

export const primary_font = Poppins({
    weight: ["300", "400", "600", "700"],
    subsets: ["latin"],
    variable: "--primary-font",
});

export const secondary_font = Readex_Pro({
    weight: ["400", "600", "700"],
    subsets: ["latin"],
    variable: "--secondary-font",
});