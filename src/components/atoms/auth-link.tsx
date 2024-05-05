"use client";
import { NavLink } from "@/components/atoms/nav-link";
import { LogInIcon, LogOutIcon, User, UserPlus } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "@firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";

export const AuthLink = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />;
  }

  if (!user) {
    return (
      <div className="flex justify-center gap-2">
        <div className="border px-6 py-2 rounded-3xl font-bold text-white bg-sky-500">
          <NavLink
            name={"Pre-sign up"}
            link={"https://photographer.aetherlenz.com"}
          ></NavLink>
        </div>
        {/*<NavLink name={"Login"} link={"/login"}>*/}
        {/*    <LogInIcon className={""}/>*/}
        {/*</NavLink>*/}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden rounded-full">
        <Avatar className={"w-7 h-7"}>
          <AvatarImage
            src={user.firebaseUser.photoURL ?? ""}
            alt={user.firebaseUser.displayName ?? "User Avatar"}
          />
          <AvatarFallback>{user.firebaseUser.displayName?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-1 w-40">
        <DropdownMenuItem>
          <NavLink name={"Profile"} link={"/user/profile"}>
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
