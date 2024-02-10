import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  image: z.instanceof(File),
});

export function PhotoUpload() {
  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  //   defaultValues: {
  //     image: undefined,
  //   },
  // });
  //
  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   console.log(data.image.files);
  // }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Photo upload</Label>
      <div className="flex gap-2">
        <Input
          id="picture"
          type="file"
          accept="image/png, image/jpeg, image/gif"
        />
        <Button>Upload</Button>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <Form {...form}>
  //       <form
  //         onSubmit={form.handleSubmit(onSubmit)}
  //         className="w-full space-y-4 py-2"
  //       >
  //         <FormField
  //           control={form.control}
  //           name="image"
  //           render={({ field }) => (
  //             <FormItem className={""}>
  //               <FormLabel>Email</FormLabel>
  //               <FormControl>
  //                 <Input
  //                   id="picture"
  //                   type="file"
  //                   accept="image/png, image/jpeg, image/gif"
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //
  //         <Button type="submit" className={"w-full"}>
  //           Submit
  //         </Button>
  //       </form>
  //     </Form>
  //   </div>
  // );
}
