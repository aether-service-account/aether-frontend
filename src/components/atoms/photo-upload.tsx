import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import __request from "@/services/__request";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function PhotoUpload() {
  const [image, setImage] = useState<File>();
  const { toast } = useToast();

  function uploadPhoto() {
    const upload = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await __request("/user/photos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const now = new Date();

        const options = {
          weekday: "long", // Full name of the day of the week
          year: "numeric", // Numeric year
          month: "long", // Full name of the month
          day: "numeric", // Numeric day of the month
          hour: "numeric", // Numeric hour
          minute: "numeric", // Numeric minute
          hour12: true, // Use 12-hour time
        };

        // @ts-ignore
        const formattedDate = now.toLocaleString("en-US", options);
        console.log(formattedDate);
        toast({
          title: "Image upload",
          description: formattedDate,
          action: <ToastAction altText="">Undo</ToastAction>,
        });
      }
    };

    if (image) {
      void upload(image);
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Photo upload</Label>
      <div className="flex gap-2">
        <Input
          onChange={(event) => {
            const files = event.target.files;
            if (files) {
              const newImage = length > 0 ? files[0] : undefined;
              setImage(newImage);
            }
          }}
          id="picture"
          type="file"
          accept="image/png, image/jpeg, image/gif"
        />
        <Button onClick={uploadPhoto}>Upload</Button>
      </div>
    </div>
  );
}
