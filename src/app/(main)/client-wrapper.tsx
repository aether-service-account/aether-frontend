"use client"

import {AuthContextProvider} from "@/context/auth-context";
import {Header} from "@/components/organisms/header";
import {firebase} from "@/firebase/config"

interface ClientWrapperInterface {
    children?: React.ReactNode
}

export const ClientWrapper: React.FC<ClientWrapperInterface> = ({children}) => {
    return <AuthContextProvider firebase={firebase}>
        <Header/>
        <hr/>
        {children}
    </AuthContextProvider>
}