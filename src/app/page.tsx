"use client";
import {useClientAuth} from "@/hooks/use-client-auth";
import SearchForm from "@/components/atoms/search-photo";
import Image from "next/image";
import {Suspense} from "react";
import HomePageSearchForm from "@/components/molecules/homepage-search-form";


const CardInfo: React.FC<{ title: string; url: string; order: number; }> = ({title, url, order}) => {
    return <div className="w-fit flex items-center flex-col group  hover:scale-105">
        <p className="py-1 text-center w-52 text-sm group-hover:text-sky-500 font-light duration-100 group-hover:-translate-y-1.5 leading-snug group-hover:font-semibold">{title}</p>
        <div
            className="flex items-center rounded-lg overflow-hidden border relative cursor-pointer transition-transform duration-200">
            <div className="aspect-square w-60 h-60 relative">
                <Image alt="details" src={url} fill className="object-cover"/>
            </div>
        </div>
    </div>
}

export default function Home() {
    const ui = useClientAuth();
    return (
        <main className="container min-h-screen p-24">

            {/* hero banner */}
            <div className="relative w-full">
                <div className="flex items-center flex-col text-center ">
                    <h1 className="text-6xl font-bold leading-normal text-sky-500">
                        Discover, Capture, Inspire
                    </h1>
                    <h1 className="text-6xl font-bold leading-normal text-sky-500">
                        with AetherLenz
                    </h1>
                </div>
                <div className="flex justify-center text-center p-3 my-5">
                    <h3 className="text-2xl  leading-loose text-neutral-800">
                        Look for photography captains, ask for majestic shots, and find your photos here in seconds.
                    </h3>
                </div>
                {/*<div className="absolute h-[450px] w-[29vw] right-0 -top-6 -z-10 rounded-xl overflow-hidden">*/}
                {/*    <Image src="/images/bg.jpg" alt="background image" fill className="object-cover"/>*/}
                {/*</div>*/}
            </div>

            <Suspense>
                <HomePageSearchForm/>
            </Suspense>

            <div className="w-full flex justify-between items-end mt-4">
                <CardInfo url="/images/register.jpg" title="Sign up for free!" order={1}/>
                <CardInfo url="/images/photographer.jpg" title="Approach our photography captains"
                          order={2}/>
                <CardInfo url="/images/searched-photo.jpg" title="Find photos with your face." order={3}/>
            </div>
        </main>
    );
}
