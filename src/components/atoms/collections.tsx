"use client"

import {useQuery} from "react-query";
import {getPhotographerCollections} from "@/services/photographer/collection";
import React from "react";
import PhotographerCollection from "@/components/molecules/photographer-collection";


const Collections = () => {
    const {
        data: collections,
        error,
        isLoading,
        isError
    } = useQuery('photographer-collections', getPhotographerCollections, {
        staleTime: 600000, // 10 minutes in milliseconds
    });
    return <div className="grid w-full grid-cols-6 gap-2 px-10 py-6">
        {collections?.map((collection) => <PhotographerCollection key={collection.id} collection={collection}/>)}
    </div>
}


export default Collections;