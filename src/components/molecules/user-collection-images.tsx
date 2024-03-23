"use client"
import * as React from "react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BadgeCheck, Download, ShoppingBag, Heart} from "lucide-react";
import {Button} from "@/components/ui/button";
// import {saveAs} from "file-saver";
import {useEffect} from "react";
import {CollectionResponse} from "@/utils/types";


export const UserSearchedCollection: React.FC<{ collection: CollectionResponse }> = ({collection}) => {

    function downloadImages() {
        for (let photo of collection.photos) {
            // saveAs(photo.url, `paper`);
        }
    }

    return (
        <section className="w-fit">
            <div className="py-3 px-3 flex justify-between items-center">
                <div className="flex items-center gap-1 ">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="font-bold text-sm pl-1">
                        {collection.user.display_name}
                    </p>
                    <BadgeCheck className="fill-green-400 text-white w-6 h-6"/>
                </div>
                <Button className="flex items-center gap-1 border rounded-lg py-1 px-3" variant="outline">
                    <ShoppingBag className="w-6 h-6 stroke-1"/>
                    <span className="font-light text-xs">Tip LensMan</span>
                </Button>
            </div>
            <Carousel className="w-full max-w-md" >
                <CarouselContent>
                    {collection.photos.map(photo => <CarouselItem key={photo.url}>
                        <Image src={photo.url} alt="image" width="720" height="800"/>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            <div className="flex justify-between px-3 gap-2 py-3 border rounded-b-sm">
                <div>
                    <p className="font-semibold text-sm">
                        {collection.name}
                    </p>
                    <p className="font-light text-xs">
                        {collection.city} City
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6"/>
                    <button onClick={downloadImages}>
                        <Download className="w-6 h-6"/>
                    </button>

                </div>
            </div>
        </section>
    )
}

export default UserSearchedCollection;