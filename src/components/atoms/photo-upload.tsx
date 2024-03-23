import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useCallback, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {uploadReferencePhotos, uploadUserPhoto} from "@/services/user/images";
import {useMutation, useQueryClient} from "react-query";
import * as z from "zod";
import {cities, CollectionType, collectionTypes} from "@/utils/types";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAuth} from "@/context/auth-context";

const filesSchema = typeof FileList !== 'undefined' ?
    z.instanceof(FileList).refine(files => files.length > 0, 'File is required.') :
    z.any().refine(obj => obj && typeof obj === 'object' && 'length' in obj && obj.length > 0, 'File is required.');


const FormSchema = z.object({
    files: filesSchema,
});

export function PhotoUpload() {
    const {user, isLoading} = useAuth();
    const [image, setImage] = useState<File>();
    const queryClient = useQueryClient();

    const {toast} = useToast();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    //@ts-ignore
    const addReferencePhotoMutation = useMutation((files: FileList) => uploadReferencePhotos(user?.userData.id, files), {
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

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        addReferencePhotoMutation.mutate(data.files);
    }

    const fileRef = form.register("files");
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            {JSON.stringify(image?.size)}
            <Label htmlFor="picture">Photo upload</Label>
            <div className="flex gap-2">
                <Form {...form}>
                    <form
                        //@ts-ignore
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-4 py-2"
                    >
                        <FormField
                            control={form.control}
                            name="files"
                            render={({field}) => (
                                <FormItem className={""}>
                                    <FormControl>
                                        <Input type="file" accept="image/png, image/jpeg, image/gif"
                                               placeholder="shadcn"
                                               multiple {...fileRef}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className={"w-full"}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
