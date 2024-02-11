"use client";
import { useClientAuth } from "@/hooks/use-client-auth";
import { Profile } from "@/components/organisms/profile";
import { useAuth } from "@/context/auth-context";

export default function ProfilePage() {
  const ui = useClientAuth();
  const { user, isLoading } = useAuth();

  if (ui) {
    return (
      <main className="container flex min-h-screen flex-col items-center justify-between p-24">
        {ui}
      </main>
    );
  }

  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-24">
      <div className={"w-full"}>
        <Profile
          // @ts-ignore
          photoURL={user.firebaseUser.photoURL}
          // @ts-ignore
          displayName={user.firebaseUser.displayName}
        />
      </div>
    </main>
  );
}
