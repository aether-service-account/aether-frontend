"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {preSignupSchema} from "@/utils/types";
import {signup} from "@/services/user/user";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";


const PreSignUpForm = () => {

    const router = useRouter()
    const {toast} = useToast();

    const form = useForm<z.infer<typeof preSignupSchema>>({
        resolver: zodResolver(preSignupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email_address: "",
            organization: "",
            contact_number: "",
            city: "",
        },
    })

    async function onSubmit(data: z.infer<typeof preSignupSchema>) {
        const result = await signup(data)
        toast({
            title: "User signed up successfully",
            description: result.message,
        });

        // Add a delay of 2 seconds (2000 milliseconds)
        setTimeout(() => {
            router.push("/")
        }, 2000);
    }


    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-lg w-full p-10 grid gap-2 border rounded-xl overflow-hidden">
            <h1 className="text-xl font-semibold text-center pb-1.5">
                Pre-Signup Form
            </h1>
            <hr/>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({field}) => (
                        <FormItem className="">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({field}) => (
                        <FormItem className="">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="email_address"
                render={({field}) => (
                    <FormItem className="">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <Input {...field} type="email"/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="organization"
                render={({field}) => (
                    <FormItem className="">
                        <FormLabel>Affiliation/Organization</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="contact_number"
                    render={({field}) => (
                        <FormItem className="">
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({field}) => (
                        <FormItem className="">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex justify-end mt-3">
                <Button>
                    Sign up
                </Button>
            </div>

        </form>
    </Form>
}

export default function PhotographerPage() {
    return <main className="flex justify-center py-10">
        <PreSignUpForm/>
    </main>;
}