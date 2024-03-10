import * as React from "react";
import Collections from "@/components/atoms/collections";


export default function PhotographerPage() {

    return <main className="container flex flex-col w-full items-center p-10">
        <div className="w-full">
            <h1 className="font-bold text-2xl">
                Your Event Albums
            </h1>
        </div>
        <Collections />
    </main>
}
