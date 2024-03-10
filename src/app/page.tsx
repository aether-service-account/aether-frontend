"use client";
import {useClientAuth} from "@/hooks/use-client-auth";
import {Button} from "@/components/ui/button";
import {ScanSearch} from "lucide-react";
import Link from "next/link";

export default function Home() {
    const ui = useClientAuth();
    return (
        <main className="container flex min-h-screen flex-col items-center justify-center p-24">
            {ui ?? <Link href={"/search"}><Button className="gap-2 max-w-xs w-full text-lg h-12">Search Face<ScanSearch
                className="w-8 h-8"/></Button></Link>}
        </main>
    );
}
