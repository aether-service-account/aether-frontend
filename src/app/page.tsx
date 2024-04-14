"use client";
import {useClientAuth} from "@/hooks/use-client-auth";
import SearchForm from "@/components/atoms/search-photo";
import Image from "next/image";
import {Suspense} from "react";


const CardInfo: React.FC<{ title: string; url: string; order: number; }> = ({title, url, order}) => {
    return <div className="flex items-center rounded-lg overflow-hidden border relative cursor-pointer hover:scale-105 transition-transform duration-200 group">
        <div className="aspect-square w-44 h-44 relative">
            <Image alt="details" src={url} fill className="object-cover"/>
        </div>
        <p className="text-center w-40 text-sm p-2 group-hover:text-sky-500 font-light duration-0">{title}</p>
        {/*<strong className="top-2 right-3 absolute text-lg">{order}</strong>*/}
    </div>
}

export default function Home() {
    const ui = useClientAuth();
    return (
        <main className="container min-h-screen p-24">

            {/* hero banner */}
            <div className="relative">
                <div className="max-w-3xl">
                    <strong className="text-6xl leading-snug"><span className="text-sky-500">Show up </span> as
                        the <span className="text-sky-500">best</span> you with <span
                            className="text-sky-500">AetherLenz</span></strong>
                </div>
                <div className="absolute h-[450px] w-[29vw] right-0 -top-6 -z-10 rounded-xl overflow-hidden">
                    <Image src="/images/bg.jpg" alt="background image" fill className="object-cover"/>
                </div>
            </div>

            <div className="max-w-md w-full my-[2%]">
                <p className="text-lg">Embrace freedom to explore and allow us to capture your journey with professional
                    photography!</p>
            </div>
            {/*empty space*/}
            <div className="py-10">
            </div>
            <Suspense>
                <SearchForm/>
            </Suspense>
            <div className="py-14">
            </div>

            <div className="w-full flex justify-between">
                <CardInfo url="/images/register.jpg" title="Sign up for free!" order={1}/>
                <CardInfo url="/images/photographer.jpg" title="Look for our photography captains along the way." order={2}/>
                <CardInfo url="/images/searched-photo.jpg" title="Find photos with your face." order={3}/>
            </div>
        </main>
    );
}
