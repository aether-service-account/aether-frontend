import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {CartResponse, Message} from "@/utils/types";

export async function addCartItem(photo_id: number) {
    const clientHeader = getClientHeader();
    return await __request<undefined, Message>(
        "post",
        `/cart/${photo_id}`,
        undefined,
        clientHeader,
        undefined,
    );
}


export async function getCart() {
    const clientHeader = getClientHeader();
    return await __request<undefined, CartResponse>(
        "get",
        "/cart/",
        undefined,
        clientHeader,
        undefined,
    );
}


export async function removeCartItem(cart_item_id: number) {
    const clientHeader = getClientHeader();
    return await __request<undefined, CartResponse>(
        "delete",
        `/cart/${cart_item_id}`,
        undefined,
        clientHeader,
        undefined,
    );
}
