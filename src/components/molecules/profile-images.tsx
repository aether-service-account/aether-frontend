"use client";
import {LoadingImage} from "@/components/atoms/loading-image";
import {getUserPhotos} from "@/services/user/images";
import {useQuery, useQueryClient} from "react-query";

export const ProfileImages = () => {
    const queryClient = useQueryClient();

    const {data: images, error, isLoading, isError} = useQuery('reference-photos', getUserPhotos, {
        staleTime: 600000, // 10 minutes in milliseconds
    });


    return (
        <div className="grid grid-cols-4 w-full gap-3 ">
            {!isLoading && !isError && images
                ? images.map((image) => <LoadingImage image={image} key={image.id} queryClient={queryClient} />)
                : null}
        </div>
    );
};
