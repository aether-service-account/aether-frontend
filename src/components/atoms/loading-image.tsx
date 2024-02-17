import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReferenceImage } from "@/utils/types";
import __request from "@/services/__request";

export const LoadingImage: React.FC<{ image: ReferenceImage }> = ({
  image,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  async function deleteImage(bucket: string, key: string) {
    const response = await __request("/user/photos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bucket, key }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  }

  function onDelete() {
    void deleteImage(image.bucket, image.key);
  }

  return (
    <div className="relative aspect-square overflow-hidden rounded-md w-auto group">
      <Image
        src={image.url}
        width={500}
        height={500}
        alt="Picture of the author"
        onLoad={() => setIsLoading(false)}
        className="absolute inset-0 w-full h-full object-cover group-hover:brightness-75 transition-all duration-400"
        priority
      />
      {isLoading ? (
        <Skeleton className="aspect-square w-auto" />
      ) : (
        <div className="relative bg-red-400 invisible group-hover:visible duration-100">
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-1 right-1">
              <MoreHorizontal className="text-white cursor-pointer w-8 h-8 p-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-1">
              <DropdownMenuItem className="gap-2" onClick={onDelete}>
                <Trash className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};
