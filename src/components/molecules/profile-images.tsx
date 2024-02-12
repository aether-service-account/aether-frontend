"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { Loader } from "@/components/atoms/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingImage } from "@/components/atoms/loading-image";
import __request from "@/services/__request";

export const ProfileImages = () => {
  const [images, setImages] = useState<Array<string>>();

  useEffect(() => {
    const get_all_images = async () => {
      const response = await __request("/user/photos", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // @ts-ignore
        setImages(data.image_urls as Array<string>);
      }
    };

    void get_all_images();
  }, []);

  return (
    <div className="grid grid-cols-4 w-full gap-3 ">
      {images
        ? images.map((imageUrl) => (
            <LoadingImage imageUrl={imageUrl} key={imageUrl} />
          ))
        : null}
    </div>
  );
};
