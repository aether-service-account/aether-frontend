import {cn} from "@/lib/utils";
import {NavLinks} from "@/components/molecules/nav-links";
import {NavLink} from "@/components/atoms/nav-link";
import {AuthLink} from "@/components/atoms/auth-link";
import {ShoppingCartIcon} from "lucide-react";
import * as React from "react";
import {useQuery, useQueryClient} from "react-query";
import {getCart, removeCartItem} from "@/services/user/cart";


import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import {format} from "date-fns";
import {Cross2Icon} from "@radix-ui/react-icons";
import {checkoutOrder} from "@/services/user/order";
import {useRouter} from "next/navigation";


function CartItem({cart_item_id, photo_id, url, city, date, name}: {
    cart_item_id: number,
    photo_id: number;
    url: string;
    date: Date;
    name: string | undefined;
    city: string;
}) {
    const queryClient = useQueryClient();
    return <div className="flex gap-4 relative border rounded-sm overflow-hidden group hover:bg-neutral-50">
        <div className="aspect-square h-24 w-24 relative">
            <Image src={url} fill alt="cart item photo" className="object-cover"/>
        </div>
        <div className="gap-2 py-1">
            <p className="font-semibold">{city} City</p>
            <p className="font-light text-sm">{format(date, "PPP")}</p>
            <p className="mt-1">{name}</p>
        </div>
        <button title="Remove cart item" className="absolute right-2 top-2 rounded-full bg-neutral-100 group-hover:bg-sky-300 p-1" onClick={() => {
            void removeCartItem(cart_item_id)
            void queryClient.invalidateQueries("cart-get")
        }}>
            <Cross2Icon className="h-4 w-4 text-red-500 group-hover:text-white" />
        </button>
    </div>
}


function Cart() {
    const {data, isLoading, isError} = useQuery({queryKey: ["cart-get"], queryFn: getCart})
    const router = useRouter()
    return <Sheet>
        <SheetTrigger asChild>
            <button className="relative">
                {data?.cart_items.length ? <span
                    className="bg-sky-300 text-white font-semibold rounded-full w-4 h-4 flex items-center justify-center absolute -right-2 -top-1 text-xs">
                  {data?.cart_items.length}
                </span>: null}
                <ShoppingCartIcon className="w-6 h-6"/>
            </button>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>My Cart</SheetTitle>
                <hr/>
            </SheetHeader>
            <div className="flex flex-col justify-between h-full pt-4 pb-10">
                {!isLoading && data ? <div className="grid overflow-y-auto gap-4 py-2">
                    {data.cart_items.map((item) => <CartItem photo_id={item.photo_id} url={item.photo.url}
                                                             cart_item_id={item.id}
                                                             key={item.id} city={item.collection.city}
                                                             name={item.collection.name} date={item.collection.date}/>)}
                </div> : <div className="flex items-center justify-center"> No items on cart!</div>}


                <SheetFooter>
                    <SheetClose asChild>
                        <div className="flex flex-col w-full gap-4">
                            <hr/>
                            <div className="flex justify-between">
                                <h1 className="font-bold text-xl leading-tight">
                                    Subtotal
                                </h1>
                                <p className="font-semibold">
                                    ₱ {!isLoading && data ? data.cart_items.length * 150 : 0}
                                </p>
                            </div>

                            <Button type="submit" onClick={async () => {
                                const result = await checkoutOrder()
                                router.push(result.redirectUrl)
                            }}>Checkout</Button>
                        </div>

                    </SheetClose>
                </SheetFooter>
            </div>


        </SheetContent>
    </Sheet>
}

export const NavigationBar = () => {
    return (
        <nav className={cn("flex justify-between px-3 w-full items-center")}>
            <NavLinks>
                {/*<NavLink name={"Home"} link={"/"} />*/}
                {/*<NavLink name={"About us"} link={"/"} />*/}
                {/*<NavLink name={"Contact us"} link={"/"} />*/}

            </NavLinks>
            <NavLinks>
                <Cart/>
                <AuthLink/>
            </NavLinks>
        </nav>
    );
};
