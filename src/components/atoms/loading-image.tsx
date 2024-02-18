import Image from "next/image";
import {useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {MoreHorizontal, Trash} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {ReferencePhoto} from "@/utils/types";
import {deleteUserPhoto} from "@/services/user/images";
import {useToast} from "@/components/ui/use-toast";
import {cn} from "@/lib/utils";
import {ReferencePhotoTooltip} from "@/components/atoms/reference-photo-tooltip";
import {QueryClient} from "react-query/core";
import {useMutation} from "react-query";

export const LoadingImage: React.FC<{ image: ReferencePhoto; queryClient: QueryClient }> = ({
                                                                                                image, queryClient,
                                                                                            }) => {
    const [isLoading, setIsLoading] = useState(true);
    const {toast} = useToast();


    // useMutation hook for deleting an image
    const deleteMutation = useMutation(() => deleteUserPhoto(image.id), {
        onSuccess: (response) => {
            toast({
                title: "Photo Deleted",
                description: response.message,
            });
            void queryClient.invalidateQueries('reference-photos');
        },
        onError: (error) => {
            toast({
                title: "Error Deleting Photo",
                description: error instanceof Error ? error.message : "An error occurred",
            });
        },
    });

    function onDelete() {
        deleteMutation.mutate();
    }

    return (
        <div className="relative aspect-square overflow-hidden rounded-md w-auto group">
            <Image
                src={image.url}
                width={500}
                height={500}
                alt="Picture of the author"
                onLoad={() => setIsLoading(false)}
                className={cn(
                    `absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-400 ${image.is_associated ? "blur-0" : "blur-md"}`,
                )}
                priority
            />
            {isLoading ? (
                <Skeleton className="aspect-square w-auto"/>
            ) : (
                <>
                    <div className="relative bg-red-400 invisible group-hover:visible duration-100">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="absolute top-1 right-1">
                                <MoreHorizontal className="text-white cursor-pointer w-8 h-8 p-1"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mx-1">
                                <DropdownMenuItem className="gap-2" onClick={onDelete}>
                                    <Trash className="h-4 w-4"/>
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    {image.is_associated ? null : <ReferencePhotoTooltip/>}
                </>
            )}
        </div>
    );
};
