"use client";

import {AuthContextProvider} from "@/context/auth-context";
import {Header} from "@/components/organisms/header";
import {firebase} from "@/firebase/config";
import {QueryClientProvider} from 'react-query';
import {queryClient} from "@/services/query-client";

interface ClientWrapperInterface {
    children?: React.ReactNode;
}

export const ClientWrapper: React.FC<ClientWrapperInterface> = ({
                                                                    children,
                                                                }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider firebase={firebase}>
                <Header/>
                <hr/>
                {children}
            </AuthContextProvider>
        </QueryClientProvider>

    );
};
