"use server"
import {S3Client} from "@aws-sdk/client-s3";
import {fromEnv} from "@aws-sdk/credential-providers";
import {createPresignedPost} from "@aws-sdk/s3-presigned-post";

const {AWS_S3_REGION, AWS_S3_USERS_REFERENCE_PHOTOS_BUCKET, AWS_S3_COLLECTION_PHOTOS_BUCKET} = process.env;

// Create an S3 client
const s3Client = new S3Client({
    region: AWS_S3_REGION,
    credentials: fromEnv(),
});


export async function getPresignedReferencePhotoPostUrl(key: string) {
    const {fields, url} = await createPresignedPost(s3Client, {
        Bucket: AWS_S3_USERS_REFERENCE_PHOTOS_BUCKET || "",
        Key: key,
        Conditions: [
            ['content-length-range', 0, 5 * 1024 * 1024],
        ],
        Expires: 300,
        Fields: {
            "Content-Type": "multipart/form-data"
        }
    });
    return {fields, url};
}

export async function getPresignedCollectionPhotoPostUrl(key: string) {
    const {fields, url} = await createPresignedPost(s3Client, {
        Bucket: AWS_S3_COLLECTION_PHOTOS_BUCKET || "",
        Key: key,
        Conditions: [
            ['content-length-range', 0, 20 * 1024 * 1024],
        ],
        Expires: 300,
        Fields: {
            "Content-Type": "multipart/form-data"
        }
    });
    return {fields, url};
}



