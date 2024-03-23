import {cn} from "@/lib/utils";
import Link from "next/link";
import {FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon} from "lucide-react";

interface HeaderProps {
    children?: React.ReactNode;
}

export const Footer: React.FC<HeaderProps> = ({children}) => {
    return (
        <footer className={cn("w-screen bg-stone-100")}>
            <div className="container py-10 grid grid-cols-6 min-h-56">
                <div className="flex flex-col justify-between col-span-3">
                    <Link href={"/"} className={cn("text-2xl font-bold px-2 text-sky-500")}>
                        AetherLenz
                    </Link>
                    <div className="flex gap-1 items-end">
                        <FacebookIcon className="text-neutral-700 h-5"/>
                        <LinkedinIcon className="text-neutral-700 h-5"/>
                        <InstagramIcon className="text-neutral-700 h-5"/>
                        <YoutubeIcon className="text-neutral-700 h-5"/>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-20 text-sm col-span-3">
                    <div className="flex flex-col gap-3">
                        <strong className="text-md">About Us</strong>
                        <div className="grid gap-2 font-light">
                            <Link className="text-xs" href="/about#vision">Vision</Link>
                            <Link className="text-xs" href="/about#mision">Mission</Link>
                            <Link className="text-xs" href="/">Our Story</Link>
                        </div>
                    </div>

                </div>
            </div>

        </footer>
    );
};
