import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getCookie } from "typescript-cookie";
import __request from "@/services/__request";

export function PhotoUpload() {
  const [image, setImage] = useState<File>();

  function uploadPhoto() {
    const upload = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await __request("/user/photos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("nice!");
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
