import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {CollectionRequest, CollectionResponse, Message, PhotoUploadRequest, ReferencePhoto} from "@/utils/types";

export async function uploadUserPhoto(file: File | undefined) {

    if (!file) {
        return {
            message: "No image uploaded!"
        }
    }
    const clientHeader = getClientHeader();
    const formData = new FormData();
    formData.append("file", file);
    return await __request<PhotoUploadRequest, Message>(
        "post",
        "/photos/references",
        formData,
        clientHeader,
    );
}

export async function getUserPhotos() {
    const clientHeader = getClientHeader();
    return await __request<undefined, Array<ReferencePhoto>>(
        "get",
        "/photos/references",
        undefined,
        clientHeader,
    );
}

export async function deleteUserPhoto(photoId: number) {
    const clientHeader = getClientHeader();
    return await __request<undefined, Message>(
        "delete",
        `/photos/${photoId}`,
        undefined,
        clientHeader,
    );
}

export async function uploadCollectionPhotos(files: FileList, collection: CollectionRequest) {

    if (!files) {
        return {
            message: "No image uploaded!"
        }
    }
    const clientHeader = getClientHeader();
    const collectionResponse = await __request<CollectionRequest, CollectionResponse>(
        "post",
        "/collections/",
        collection,
        clientHeader,
    );
    console.log(collectionResponse)

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append(`files`, files[i]);
    }

    return await __request<PhotoUploadRequest, Message>(
        "post",
        `/photos/${collectionResponse.id}`,
        formData,
        clientHeader,
    );
}