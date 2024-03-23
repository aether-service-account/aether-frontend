import axios, {AxiosRequestConfig, Method} from "axios";
import {getClientHeader} from "@/utils/utils";
import __request from "@/services/__request";
import {
    CollectionRequest,
    CollectionResponse,
    Message,
    PhotoKeysRequest,
    PhotoUploadRequest,
    ReferencePhoto
} from "@/utils/types";
import {v4 as uuidv4} from 'uuid';
import {getPresignedCollectionPhotoPostUrl, getPresignedReferencePhotoPostUrl} from "@/services/aws/s3";


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


export async function uploadCollectionPhotosOptimized(files: FileList, collection: CollectionRequest) {
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

    const uploadedKeys: string[] = []
    for (let i = 0; i < files.length; i++) {
        uploadedKeys.push(await clientCollectionUpload(files[i], collectionResponse.id))
    }

    return await __request<PhotoKeysRequest, Message>(
        "post",
        `/photos/collection/${collectionResponse.id}`,
        {keys: uploadedKeys},
        clientHeader,
    );
}


export async function uploadReferencePhotos(userId: string, files: FileList) {
    console.log(files)
    const uploadedKeys = []
    for (let i = 0; i < files.length; i++) {
        uploadedKeys.push(await clientReferenceUpload(files[i], userId))
    }
    const clientHeader = getClientHeader();
    return await __request<PhotoKeysRequest, Message>(
        "post",
        `/photos/photo-references`,
        {keys: uploadedKeys},
        clientHeader,
    );
}


async function clientReferenceUpload(file: File, id: string) {
    const uuid = uuidv4();
    const key = `${id}/${uuid}_${file.name}`
    const {fields, url} = await getPresignedReferencePhotoPostUrl(key);

    const formData = new FormData();
    Object.entries({...fields, file}).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const fullConfig: AxiosRequestConfig = {
        method: "post",
        url: url,
        data: formData,
    };

    try {
        const response = await axios(fullConfig);
        return key;
    } catch (error) {
        throw new Error("Error in uploading image!")
    }
}


async function clientCollectionUpload(file: File, id: string) {
    const uuid = uuidv4();
    const key = `${id}/${uuid}_${file.name}`
    const {fields, url} = await getPresignedCollectionPhotoPostUrl(key);

    const formData = new FormData();
    Object.entries({...fields, file}).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const fullConfig: AxiosRequestConfig = {
        method: "post",
        url: url,
        data: formData,
    };

    try {
        const response = await axios(fullConfig);
        return key;
    } catch (error) {
        throw new Error("Error in uploading image!")
    }
}
