import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLink {
  name?: string;
  link: string;
  children?: React.ReactNode;
}

export const NavLink: React.FC<NavLink> = ({ name, link, children }) => {
  return (
    <Link
      href={link}
      className={cn(
        "flex text-neutral-600 text-sm gap-1 items-center hover:font-semibold",
      )}
    >
      {children ? children : null}
      {name ? name : null}
    </Link>
  );
};
