'use client'

import {useSearchParams} from 'next/navigation'
import {useQuery} from 'react-query';
import {getUserSearchedCollections} from "@/services/user/collection";
import UserSearchedCollection from "@/components/molecules/user-collection-images";
import {Progress} from "@/components/ui/progress"
import {useEffect, useState} from "react";
import SearchForm from "@/components/atoms/search-photo";
import {Suspense} from 'react'

function Search() {
    const searchParams = useSearchParams()
    const [progress, setProgress] = useState(13)

    const city = searchParams.get("city")
    const to = searchParams.get("to_date")
    const from = searchParams.get("from_date")

    const searchParameters = {
        city: city ?? "",
        to: to ? new Date(to) : undefined,
        from: from ? new Date(from) : undefined,
    }

    const {
        isLoading,
        error,
        data,
        refetch
    } = useQuery(["get-user-collections",], () => getUserSearchedCollections(searchParameters), {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (isLoading) {
            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + Math.floor(Math.random() * 5)));
            }, 500);
            return () => clearInterval(timer);
        }
    }, [isLoading]);

    useEffect(() => {
        void refetch()
    }, [searchParams])


    if (isLoading) {
        return <main className="min-h-screen flex flex-col gap-6 items-center justify-center">
            <h1 className="text-xl">
                Please wait while we fetch your memories. 📸✨
            </h1>
            <Progress value={progress} className="w-[40%]"/>
        </main>
    }


    return <main className="container flex flex-col items-center min-h-screen p-10">
        <Suspense>
            <SearchForm/>
        </Suspense>
        <div className="flex flex-col items-center gap-4 mt-10">
            {data ? data.map(collection => <UserSearchedCollection key={collection.id}
                                                                   collection={collection}/>) : null}
        </div>
    </main>
}

export default function SearchPage() {
    return <Suspense>
        <Search/>
    </Suspense>
}