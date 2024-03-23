"use client";

import React, {
    createContext, useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {User, Auth} from "@firebase/auth";
import {usePathname} from "next/navigation";
import {setCookie, removeCookie} from "typescript-cookie";
import {getUserDetails} from "@/services/user/user";
import {UserData} from "@/utils/types";

type AuthContextProps = {
    user: {
        firebaseUser: User;
        userData: UserData;
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

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
                                                                            children,
                                                                            firebase,
                                                                        }) => {
    const userRef = useRef<User>();
    const pathname = usePathname();
    const [user, setUser] = useState<AuthContextProps["user"] | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    async function attachUserDetails(firebaseUser: User) {
        const userData = await getUserDetails();
        setIsLoading(false);
        setUser({firebaseUser, userData});
    }


    useEffect(() => {
        return firebase.auth.onIdTokenChanged((firebaseUser) => {
            if (!firebaseUser) {
                userRef.current = undefined;
                setUser(null);
                setIsLoading(false);
                removeCookie("aether-lenz");
            } else {
                //@ts-ignore]
                setCookie("aether-lenz", firebaseUser.accessToken);
                /*add auth check here !!! */
                /* if not valid, do signout */
                void attachUserDetails(firebaseUser);
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
        <AuthContext.Provider value={{user, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
