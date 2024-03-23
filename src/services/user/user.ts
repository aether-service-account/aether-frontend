import { UserData} from "@/utils/types";
import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";



export async function getUserDetails() {

    const clientHeader = getClientHeader();
    return await __request<undefined, UserData>(
        "get",
        "/user/details",
        undefined,
        clientHeader,
    );
}