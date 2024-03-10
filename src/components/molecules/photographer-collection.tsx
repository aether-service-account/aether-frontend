"use client"
import React from "react";

import Image from "next/image";
import {format} from "date-fns";
import {GalleryHorizontal, ImageDown} from "lucide-react";

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

const Album: React.FC<{ photos: CollectionPhoto[] }> = ({photos}) => {
    return <div>

    </div>
}

const AlbumTrigger: React.FC<{ photos: CollectionPhoto[] }> = ({photos}) => {
    return <div className="relative aspect-square overflow-hidden group rounded-sm">

        {/*layer*/}
        <div
            className="absolute min-h-full min-w-full invisible group-hover:bg-neutral-800/30 group-hover:visible group-hover:transform transition duration-300 ease-in-out z-10"/>
        <Image src={photos[0].url} alt="image" width="720" height="800"
               className="group-hover:transform group-hover:scale-110 transition duration-300 ease-in-out"/>
        <GalleryHorizontal className="text-white invisible group-hover:visible absolute top-2 right-2 z-40"/>
    </div>
}

const PhotographerCollection: React.FC<{ collection: CollectionResponse }> = ({collection}) => {
    return <Dialog>
        <DialogTrigger>
            <AlbumTrigger photos={collection.photos}/>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{collection.name}</DialogTitle>
                <DialogDescription>
                    {collection.city} City
                    <p className="font-xs font-thin">
                        {
                            collection.from_date ?
                                <>
                                    {format(collection.from_date, "PPP")}
                                    {collection.to_date ? <> - {format(collection.to_date, "PPP")} </> : null}
                                </>
                                : null
                        }
                    </p>
                </DialogDescription>
            </DialogHeader>
            <Carousel>
                <CarouselContent>
                    {collection.photos.map(photo => <CarouselItem key={photo.url}>
                        <Image src={photo.url} alt="image" width="720" height="800"/>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}


export default PhotographerCollection