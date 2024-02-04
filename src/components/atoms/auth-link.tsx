"use client";
import { NavLink } from "@/components/atoms/nav-link";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export const AuthLink = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <NavLink name={"Login"} link={"/login"}>
        <LogInIcon className={""} />
      </NavLink>
    );
  }

  return (
    <NavLink name={"Logout"} link={"/logout"}>
      <LogOutIcon className={""} />
    </NavLink>
  );
};
