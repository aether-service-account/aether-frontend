"use client"
import * as React from "react";
import Collections from "@/components/atoms/collections";

import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useAuth} from "@/context/auth-context";
import {Skeleton} from "@/components/ui/skeleton";
import PhotographerPhotosForm from "@/components/atoms/photographer-photos-form";

const DialogDemo = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Collection</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create collection</DialogTitle>
                </DialogHeader>
                <PhotographerPhotosForm />
            </DialogContent>
        </Dialog>
    )
}


export default function PhotographerPage() {

    const {user, isLoading} = useAuth();

    return <main className="container flex flex-col w-full items-center p-10">
        <div className="flex w-full justify-between py-3">
            <h1 className="font-bold text-2xl flex ">
                {
                    isLoading ? <Skeleton className="h-5 w-[250px]"/>: `${user?.userData.display_name}'s  collections`
                }
            </h1>
            <DialogDemo/>
        </div>
        <hr className="w-full"/>
        <Collections/>
    </main>
}
