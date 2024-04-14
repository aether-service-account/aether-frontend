"use client"
import * as React from "react"

import {
    Carousel, CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BadgeCheck, Download, ShoppingBag, Heart, ShoppingCartIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";
import {CollectionResponse} from "@/utils/types";
import {addCartItem} from "@/services/user/cart";
import {useQueryClient} from "react-query";


export const UserSearchedCollection: React.FC<{ collection: CollectionResponse }> = ({collection}) => {
    const queryClient = useQueryClient();
    const [current, setCurrent] = useState(0)
    const [api, setApi] = useState<CarouselApi>()

    useEffect(() => {
        if (!api) {
            return
        }
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <section className="w-fit border rounded-xl">
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
            <Carousel className="w-full max-w-md" setApi={setApi}>
                <CarouselContent>
                    {collection.photos.map(photo => <CarouselItem key={photo.url}
                                                                  className="flex items-center justify-center bg-stone-100">
                        <Image src={photo.url} alt="image" width="720" height="800" priority/>
                    </CarouselItem>)}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
            <div className="flex justify-between px-3 gap-2 py-3">
                <div>
                    <p className="font-semibold text-sm">
                        {collection.name}
                    </p>
                    <p className="font-light text-xs">
                        {collection.city} City
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <button  onClick={() => {
                        void addCartItem(collection.photos[current].id)
                        void queryClient.invalidateQueries("cart-get")
                    }} className="hover:bg-neutral-100 p-1.5 rounded-lg">
                        <ShoppingCartIcon className="w-6 h-6"/>
                    </button>

                    {/*<Heart className="w-6 h-6"/>*/}
                    <a href={collection.photos[current].url} download className="hover:bg-neutral-100 p-1.5 rounded-lg">
                        <Download className="w-6 h-6"/>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default UserSearchedCollection;