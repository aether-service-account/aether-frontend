"use client"
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {useMutation} from "react-query";
import {uploadCollectionPhotos} from "@/services/user/images";
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


const filesSchema = typeof FileList !== 'undefined' ?
    z.instanceof(FileList).refine(files => files.length > 0, 'File is required.') :
    z.any().refine(obj => obj && typeof obj === 'object' && 'length' in obj && obj.length > 0, 'File is required.');


const FormSchema = z.object({
    files: filesSchema,
    dateRange: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }),
    type: z.enum(collectionTypes),
    name: z.string().optional(),
    description: z.string().optional(),
    city: z.string()
});



export default function PhotographerPhotosForm() {
    const [selectedCollectionType, setSelectedCollectionType] = useState<CollectionType | undefined>();
    const {toast} = useToast();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            dateRange: {
                from: undefined,
                to: undefined,
            },
            type: collectionTypes[1],
            name: "",
            description: "",
        }
    });

    const upload = async (files: FileList, collection: CollectionRequest) => {
        const response = await uploadCollectionPhotos(files, collection);
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
            from_date: data.dateRange.from,
            to_date: data.dateRange.to,
            type: data.type,
        }

        void upload(data.files, collection)

    };

    const fileRef = form.register("files");

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
                            <FormControl>
                                <Input type="file" accept="image/png, image/jpeg, image/gif" placeholder="shadcn"
                                       multiple {...fileRef}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateRange"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-30 justify-start text-left font-normal",
                                            !field && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {field.value.from ? (
                                            field.value.to ? (
                                                <>
                                                    {format(field.value.from, "MMM d")} -{" "}
                                                    {format(field.value.to, "MMM d")}
                                                </>
                                            ) : (
                                                format(field.value.from, "MMM d")
                                            )
                                        ) : (
                                            <span>Select date range</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="center">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={field.value?.from}
                                        // @ts-ignore
                                        selected={field.value}
                                        onSelect={(dateRange) => {
                                            if (dateRange) {
                                                form.setValue("dateRange", dateRange)
                                            } else {
                                                form.setValue("dateRange", {from: undefined, to: undefined})
                                            }
                                        }}
                                        numberOfMonths={2}
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
                                                "w-[200px] justify-between",
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
                <FormField
                    control={form.control}
                    name="type"
                    render={({field}) => (
                        <FormItem>
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
                                <Input placeholder="Enter description" type={"text"} {...field}
                                       className={"w-full"}/>
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


}