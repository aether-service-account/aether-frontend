import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

import type { ReactNode } from "react";

import { Loader } from "@/components/atoms/loader";
import { Button } from "@/components/ui/button";

type UseClientAuthProps = {
  fallback?: ReactNode;
};

export const useClientAuth = ({
  fallback,
}: UseClientAuthProps = {}): ReactNode => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  console.log(user);

  if (isLoading) return fallback ?? <Loader />;
  if (!user)
    return (
      <div className="flex w-full flex-col items-center py-4">
        <p>You need to login to view this page</p>
        <Button asChild className="mt-2 px-8">
          <Link href={`/login?from=${encodeURIComponent(pathname)}`}>
            Login
          </Link>
        </Button>
      </div>
    );

  return null;
};
