import Link from "next/link";
import {cn} from "@/lib/utils";

export function Video() {
    return (
        <div className="rounded-3xl overflow-hidden w-fit h-[800px]">
            <video className="w-[900px]" preload="none" muted autoPlay loop>
                <source src="/images/about-video-2.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export function BottomVideo(){
    return (
        <div className="rounded-3xl overflow-hidden w-fit">
            <video className="w-full" preload="none" muted autoPlay loop>
                <source src="/images/party.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

const AboutPage = () => {
    return <main className="min-h-screen flex flex-col items-center">
        <div className="h-10"/>
        <div className="container p-10 flex ">
            <Video/>
            <div className="flex flex-col items-center justify-center px-12  w-full">
                <div className="max-w-2xl">
                    <h1 className="text-5xl py-2 leading-loose font-semibold tracking-wide text-sky-500" id="vision">Vision</h1>
                    <p className="leading-loose font-light tracking-wide text-lg">Aether-Z builds technologies that
                        showcase
                        human creativity,
                        and celebrates human connection.
                        AetherLenz just born in 2024 that enables passionate photographers offer majestic photography
                        experience for guests to capture life’s exciting moments.</p>
                </div>
            </div>
        </div>


        <div className="flex flex-col justify-center items-center py-16" id="mission">
            <h1 className="text-4xl py-2 leading-loose font-bold text-sky-500 tracking-wide">Mission</h1>
            <p className="text-2xl font-light tracking-wide max-w-md text-center">
                To create a world where enthusiasm can be seen anywhere
            </p>
        </div>
        <div className="h-24"/>
        <BottomVideo/>
        <div className="h-20"/>
    </main>
}

export default AboutPage;