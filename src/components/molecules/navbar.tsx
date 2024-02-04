import { cn } from "@/lib/utils";
import { NavLinks } from "@/components/molecules/nav-links";
import { NavLink } from "@/components/atoms/nav-link";
import { AuthLink } from "@/components/atoms/auth-link";

export const NavigationBar = () => {
  return (
    <nav className={cn("flex justify-between px-3 w-full items-center")}>
      <NavLinks>
        <NavLink name={"Home"} link={"/"} />
        <NavLink name={"About us"} link={"/"} />
        <NavLink name={"Contact us"} link={"/"} />
      </NavLinks>
      <NavLinks>
        <AuthLink />
      </NavLinks>
    </nav>
  );
};
