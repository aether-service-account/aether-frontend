import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {CollectionResponse} from "@/utils/types";

export async function getPhotographerCollections() {
    const clientHeader = getClientHeader();
    return await __request<undefined, Array<CollectionResponse>>(
        "get",
        "/collections/",
        undefined,
        clientHeader,
    );
}
