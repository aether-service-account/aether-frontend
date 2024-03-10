"use client"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon, Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {format} from "date-fns";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import UserSearchedCollection from "@/components/molecules/user-collection-images";
import {cities, CollectionRequest, CollectionResponse} from "@/utils/types";
import {useState} from "react";
import {useQuery} from "react-query";
import {getUserSearchedCollections} from "@/services/user/collection";


const FormSchema = z.object({
    collection: z.string(),
    dateRange: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }),
    city: z.string(),

})

export default function SearchForm() {
    const [collections, setCollections] = useState<CollectionResponse[] | undefined>();


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            collection: "",
            dateRange: {
                from: undefined,
                to: undefined,
            },
            city: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const getCollections = async () => {
            const params = {
                event_name: data.collection,
                from: data.dateRange.from? data.dateRange.from.toISOString() : "",
                to: data.dateRange.to? data.dateRange.to.toISOString() : "",
                city: data.city,
            }
            setCollections(await getUserSearchedCollections(params))
        }
        void getCollections();
    }


    return <div className="flex flex-col items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <FormField
                    control={form.control}
                    name="collection"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Event" className="w-60" {...field} />
                            </FormControl>
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
                                        <CommandEmpty>City not found.</CommandEmpty>
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
                    name="dateRange"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant="outline"
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
                                            <span>Date</span>
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
                <Button type="submit">Search</Button>
            </form>
        </Form>
        {
            collections ? collections.map(collection => <UserSearchedCollection collection={collection}/>) : null
        }
    </div>
}
