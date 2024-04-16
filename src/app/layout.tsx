import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import {ClientWrapper} from "@/app/(main)/client-wrapper";
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: {
        template: "%s | AetherLenz",
        default: 'AetherLenz',
    },
    description: "Discover, Capture, Inspire with AetherLenz",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={cn(inter.className)}>
        <ClientWrapper>{children}</ClientWrapper>
        <Toaster/>
        </body>
        </html>
    );
}
