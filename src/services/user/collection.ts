import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {CollectionResponse, CollectionRequest, UserSearchCollectionRequest} from "@/utils/types";

export async function getUserSearchedCollections(searchParameters: UserSearchCollectionRequest) {
    const clientHeader = getClientHeader();
    return await __request<undefined, Array<CollectionResponse>>(
        "get",
        "/photos/user",
        undefined,
        clientHeader,
        searchParameters,
    );
}
