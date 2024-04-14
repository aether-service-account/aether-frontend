import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {OrderResponse} from "@/utils/types";


export async function checkoutOrder() {
    const clientHeader = getClientHeader();
    return await __request<undefined, OrderResponse>(
        "post",
        "/order/",
        undefined,
        clientHeader,
    );
}
