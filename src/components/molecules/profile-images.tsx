"use client";
import { useEffect, useState } from "react";
import { LoadingImage } from "@/components/atoms/loading-image";
import __request from "@/services/__request";
import { ReferenceImage } from "@/utils/types";

export const ProfileImages = () => {
  const [images, setImages] = useState<Array<ReferenceImage>>();

  useEffect(() => {
    const get_all_images = async () => {
      const response = await __request("/user/photos", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // @ts-ignore
        setImages(data as Array<ReferenceImage>);
      }
    };

    void get_all_images();
  }, []);

  return (
    <div className="grid grid-cols-4 w-full gap-3 ">
      {images
        ? images.map((image) => <LoadingImage image={image} key={image.key} />)
        : null}
    </div>
  );
};
