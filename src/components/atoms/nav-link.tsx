import Link from "next/link";
import {cn} from "@/lib/utils";

interface NavLink {
    name?: string;
    link: string;
    children?: React.ReactNode;
}

export const NavLink: React.FC<NavLink> = ({name, link, children}) => {
    return (
        <Link
            href={link}
            className={cn(
                "flex text-sm gap-1 items-center hover:font-semibold",
            )}
        >
            {name ? name : null}
            {children ? children : null}
        </Link>
    );
};
