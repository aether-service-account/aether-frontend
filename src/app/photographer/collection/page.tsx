import * as React from "react";
import PhotographerPhotosForm from "@/components/atoms/photographer-photos-form";

export default function Collection() {

    return <main className="container flex flex-col w-full items-center p-10">
        <div className="w-full">
            <h1 className="font-bold text-2xl">
                Upload Photos
            </h1>
            <PhotographerPhotosForm/>
        </div>
    </main>
}