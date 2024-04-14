"use client"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useMutation} from "react-query";
import {uploadCollectionPhotos, uploadCollectionPhotosOptimized} from "@/services/user/images";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {CollectionRequest, CollectionType, collectionTypes, cities} from "@/utils/types";
import {Textarea} from "@/components/ui/textarea";


const filesSchema = typeof FileList !== 'undefined' ?
    z.instanceof(FileList).refine(files => files.length > 0, 'File is required.') :
    z.any().refine(obj => obj && typeof obj === 'object' && 'length' in obj && obj.length > 0, 'File is required.');


const logosSchema = typeof FileList !== 'undefined' ?
    z.instanceof(FileList).refine(files => files.length > 0, 'Logo is required.') :
    z.any().refine(obj => obj && typeof obj === 'object' && 'length' in obj && obj.length > 0, 'File is required.');


const FormSchema = z.object({
    files: filesSchema,
    date: z.date().optional(),
    type: z.enum(collectionTypes),
    name: z.string().optional(),
    description: z.string().optional(),
    city: z.string(),
    logo: logosSchema,
});


export default function PhotographerPhotosForm() {
    const [selectedCollectionType, setSelectedCollectionType] = useState<CollectionType | undefined>();
    const {toast} = useToast();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            date: undefined,
            type: collectionTypes[1],
            name: "",
            description: "",
        }
    });

    const upload = async (files: FileList, logo: FileList, collection: CollectionRequest) => {
        const response = await uploadCollectionPhotosOptimized(files, logo, collection);
        toast({
            title: "Photos Upload",
            description: response.message,
        });
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        const collection: CollectionRequest = {
            name: data.name,
            description: data.description,
            city: data.city,
            date: data.date,
            type: data.type,
        }

        void upload(data.files, data.logo, collection)

    };

    const fileRef = form.register("files");
    const logoRef = form.register("logo");

    return <div className="grid w-full max-w-sm items-center gap-1.5">
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4 py-2"
            >
                <FormField
                    control={form.control}
                    name="files"
                    render={({field}) => (
                        <FormItem className={""}>
                            <FormLabel>Collection Photos</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/png, image/jpeg, image/gif" placeholder="collection photos"
                                       multiple {...fileRef}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="logo"
                    render={({field}) => (
                        <FormItem className={""}>
                            <FormLabel>Logo</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/png" placeholder="logos"
                                      multiple {...logoRef}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-2">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({field}) => (
                            <FormItem className="flex flex-col">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? cities.find(
                                                        (city) => city.value === field.value
                                                    )?.label
                                                    : "Select city"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Search city..."
                                                className="h-9"
                                            />
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {cities.map((city) => (
                                                    <CommandItem
                                                        value={city.label}
                                                        key={city.value}
                                                        onSelect={() => {
                                                            form.setValue("city", city.value)
                                                        }}
                                                    >
                                                        {city.label}

                                                        <Check
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                city.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <hr/>
                <FormField
                    control={form.control}
                    name="type"
                    render={({field}) => (
                        <FormItem className="flex justify-end w-1/2">
                            <Select onValueChange={(type: CollectionType) => {
                                form.setValue("type", type)
                                setSelectedCollectionType(type);
                            }} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select collection type"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {collectionTypes.map(collectionType => <SelectItem
                                        value={collectionType} key={collectionType}>{collectionType}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {selectedCollectionType == "event" ?
                    <>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem className={""}>
                                    <FormLabel>Event Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter event name" type={"text"} {...field}
                                               className={"w-full"}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </>
                    :
                    null
                }

                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem className={""}>
                            <FormControl>
                                <Textarea placeholder="Enter description" {...field}
                                          className={"w-full"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" className="px-6">
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    </div>


}