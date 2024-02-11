import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingImagesProps {
  imageUrl: string;
}

export const LoadingImage: React.FC<LoadingImagesProps> = ({ imageUrl }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-square overflow-hidden rounded-md w-auto">
      {isLoading ? <Skeleton className="aspect-square w-auto" /> : null}
      <Image
        src={imageUrl}
        width={500}
        height={500}
        alt="Picture of the author"
        key={imageUrl}
        onLoad={() => setIsLoading(false)}
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />
    </div>
  );
};
