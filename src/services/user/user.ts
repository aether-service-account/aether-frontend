import {Message, preSignupSchema, UserData} from "@/utils/types";
import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {z} from "zod";


export async function getUserDetails() {

    const clientHeader = getClientHeader();
    return await __request<undefined, UserData>(
        "get",
        "/user/details",
        undefined,
        clientHeader,
    );
}


export async function signup(data: z.infer<typeof preSignupSchema>) {
    const clientHeader = getClientHeader();
    return await __request<z.infer<typeof preSignupSchema>, Message>(
        "post",
        "/user/signup",
        data,
        clientHeader,
    );
}
