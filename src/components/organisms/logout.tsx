"use client";
import { Loader } from "@/components/atoms/loader";
import { useEffect } from "react";
import { signOut } from "@firebase/auth";
import { firebase } from "@/firebase/config";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const logOut = async () => {
      signOut(firebase.auth)
        .then(() => {
          // Redirect to home page or login after logout
          router.push("/login");
        })
        .catch((error) => {
          // Handle any errors during logout
          console.error("Logout failed", error);
        });
    };

    void logOut();
  }, [router]);

  return <Loader />;
};
