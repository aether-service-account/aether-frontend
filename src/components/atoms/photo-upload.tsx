import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {useCallback, useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { uploadUserPhoto } from "@/services/user/images";

export function PhotoUpload() {
  const [image, setImage] = useState<File>();

  const { toast } = useToast();

    const uploadPhoto = useCallback(() => {
        const upload = async (file: File) => {
            try {
                const response = await uploadUserPhoto(file);
                toast({
                    title: "Photo Upload",
                    description: response.message,
                    // Assuming your Toast component or context expects a type or variant
                    // type: 'success', // Uncomment or adjust based on your implementation
                });
            } catch (error) {
                toast({
                    title: "Photo Upload",
                    description: "Upload not successful!",
                    // type: 'error', // Uncomment or adjust based on your implementation
                });
            }
        };

        if (image) {
            void upload(image);
        }
    }, [image, toast]);


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
