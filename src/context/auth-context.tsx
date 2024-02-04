"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { User, Auth } from "@firebase/auth";
import { usePathname } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "@/firebase/config";

type AuthContextProps = {
  user: {
    firebaseUser: User;
  } | null;
  isLoading: boolean;
};

interface AuthContextProviderProps {
  children: React.ReactNode;
  firebase: { auth: Auth };
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
});

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/; secure; SameSite=Strict;`;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
  firebase,
}) => {
  const userRef = useRef<User>();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthContextProps["user"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return firebase.auth.onIdTokenChanged((firebaseUser) => {
      if (!firebaseUser) {
        userRef.current = undefined;
        setUser(null);
        setIsLoading(false);
        setCookie("aether-lenz", "");
      } else {
        /*add auth check here !!! */
        /* if not valid, do signout */
        setIsLoading(false);
        setUser({ firebaseUser });
      }
    });
  }, [firebase.auth, pathname]);

  useEffect(() => {
    const handle = setInterval(
      () => {
        const user = firebase.auth.currentUser;
        if (user) void user.getIdToken(true);
      },
      10 * 60 * 1000,
    );

    return () => clearInterval(handle);
  }, [firebase.auth]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
