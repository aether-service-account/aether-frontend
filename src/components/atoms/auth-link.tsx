"use client";
import { NavLink } from "@/components/atoms/nav-link";
import { LogInIcon, LogOutIcon, User } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "@firebase/auth";

export const AuthLink = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />;
  }

  console.log(user);

  if (!user) {
    return (
      <NavLink name={"Login"} link={"/login"}>
        <LogInIcon className={""} />
      </NavLink>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden rounded-full">
        {user.firebaseUser.photoURL ? (
          <div className="h-7 w-7">
            <Image
              alt={user.firebaseUser.displayName ?? "User Avatar"}
              height={48}
              src={user.firebaseUser.photoURL ?? ""}
              width={48}
            />
          </div>
        ) : (
          <div className="grid h-7 w-7 place-items-center bg-gray-200 text-xs">
            {user.firebaseUser.displayName?.[0]}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-1 w-40">
        <DropdownMenuItem>
          <NavLink name={"Profile"} link={"/user/account/profile"}>
            <User className={"h-5 w-5"} />
          </NavLink>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <NavLink name={"Logout"} link={"/logout"}>
            <LogOutIcon className={"h-5 w-5"} />
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
