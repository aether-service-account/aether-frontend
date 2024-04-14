"use client"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon, Check, ChevronsUpDown, Smile, UserSearch} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {cities} from "@/utils/types";
import {useRouter, useSearchParams} from 'next/navigation'

const FormSchema = z.object({
    collection: z.string(),
    dateRange: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    }),
    city: z.string(),

})

export default function SearchForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const city = searchParams.get("city")
    const to = searchParams.get("to_date")
    const from = searchParams.get("from_date")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            collection: "",
            dateRange: {
                from: from ? new Date(from) : undefined ,
                to: to ? new Date(to) : undefined,
            },
            city: city ?? "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const searchParameters = {
            from: data.dateRange.from ? data.dateRange.from.toISOString() : undefined,
            to: data.dateRange.to ? data.dateRange.to.toISOString() : undefined,
            city: data.city,
        };

        // query builder
        let query = `?city=${data.city}`
        if (searchParameters.to) {
            query += `&to_date=${searchParameters.to}`
        }
        if (searchParameters.from) {
            query += `&from_date=${searchParameters.from}`
        }
        router.replace(`/search${query}`)
    }

    return <div className="flex">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                {/*<FormField*/}
                {/*    control={form.control}*/}
                {/*    name="collection"*/}
                {/*    render={({field}) => (*/}
                {/*        <FormItem>*/}
                {/*            <FormControl>*/}
                {/*                <Input placeholder="Event" className="w-60" {...field} />*/}
                {/*            </FormControl>*/}
                {/*            <FormMessage/>*/}
                {/*        </FormItem>*/}
                {/*    )}*/}
                {/*/>*/}
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
                <Button type="submit"
                        className="ml-2 h-12 w-44 bg-green-500  hover:bg-green-600 text-lg  flex gap-2"><UserSearch/>
                    <span>Find Me</span></Button>
            </form>
        </Form>
    </div>
}
