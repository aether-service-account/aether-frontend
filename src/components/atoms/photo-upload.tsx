import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useCallback, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {uploadUserPhoto} from "@/services/user/images";
import {useMutation, useQueryClient} from "react-query";

export function PhotoUpload() {
    const [image, setImage] = useState<File>();
    const queryClient = useQueryClient();

    const {toast} = useToast();


    const addReferencePhotoMutation = useMutation(() => uploadUserPhoto(image), {
        onSuccess: (response) => {
            toast({
                title: "Photo Upload",
                description: response.message,
            });
            void queryClient.invalidateQueries('reference-photos');
        },
        onError: (error) => {
            toast({
                title: "Photo Upload",
                description: "Upload not successful!",
            });
        },
    })

    console.log(image)
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            {JSON.stringify(image?.size)}
            <Label htmlFor="picture">Photo upload</Label>
            <div className="flex gap-2">
                <Input
                    onChange={(event) => {
                        const files = event.target.files;
                        if (files && files.length > 0) {
                            setImage(files[0]);
                        }else {
                            setImage(undefined);
                        }
                    }}
                    id="picture"
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                />
                <Button onClick={() => addReferencePhotoMutation.mutate()}>Upload</Button>
            </div>
        </div>
    );
}
