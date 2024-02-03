"use client"
import {useClientAuth} from "@/hooks/use-client-auth";


export default function Home() {
    const ui = useClientAuth()
    return (
        <main className="container flex min-h-screen flex-col items-center justify-between p-24">
            { ui ?? "HOME PAGE GAGO!"}
        </main>
    );
}
