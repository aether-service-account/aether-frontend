"use client"
import React from "react";

import Image from "next/image";
import {format} from "date-fns";
import {FilePenLine} from "lucide-react";

import {CollectionPhoto, CollectionResponse} from "@/utils/types";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const AlbumTrigger: React.FC<{ photos: CollectionPhoto[] }> = ({photos}) => {
    return <div className="relative aspect-square overflow-hidden group rounded-md">

        {/*layer*/}
        <div
            className="absolute min-h-full min-w-full invisible group-hover:bg-neutral-800/30 group-hover:visible group-hover:transform transition duration-300 ease-in-out z-10"/>
        <AspectRatio ratio={16 / 16} className="bg-muted ">
            <Image src={photos[0].url} alt="image" fill
                   className=" object-cover group-hover:transform group-hover:scale-110 transition duration-300 ease-in-out"/>
        </AspectRatio>

        <FilePenLine className="text-white invisible group-hover:visible absolute top-2 right-2 z-40 h-4 w-4"/>
    </div>
}

const PhotographerCollection: React.FC<{ collection: CollectionResponse }> = ({collection}) => {
    return <Dialog>
        <DialogTrigger>
            <AlbumTrigger photos={collection.photos}/>
        </DialogTrigger>
        <DialogContent className="min-w-[90vw] my-10    ">
            <DialogHeader className="px-4">
                <DialogTitle>
                    <div className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>{collection.user.display_name}</AvatarFallback>
                            </Avatar>
                            {collection.user.display_name}
                        </div>
                    </div>

                </DialogTitle>
                <DialogDescription>
                    <div className="text-neutral-700">
                        <h1 className="text-xl">{collection.name}</h1>
                        <p className="text-sm">{collection.city} City</p>
                        <p className="text-sm font-light">
                            {format(collection.date ?? "", "PPP")}
                        </p>
                    </div>
                </DialogDescription>
            </DialogHeader>
            <div>
                <Carousel>
                    <CarouselContent className=" mx-auto">
                        {collection.photos.map(photo => <CarouselItem key={photo.url}>
                            <div className="h-[70vh] w-fit mx-auto bg-yellow-200">
                                <Image src={photo.url} alt="image" width="1080" height="1080"
                                       className="h-full w-auto"/>
                            </div>
                        </CarouselItem>)}
                    </CarouselContent>
                    <CarouselPrevious className="h-16 w-16"/>
                    <CarouselNext className="h-16 w-16"/>
                </Carousel>
            </div>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}


export default PhotographerCollection