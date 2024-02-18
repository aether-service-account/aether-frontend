import { getClientHeader } from "@/utils/utils";
import __request from "@/services/__request";
import { PhotoUploadRequest, ReferencePhoto, Message } from "@/utils/types";

export async function uploadUserPhoto(file: File) {
  const clientHeader = getClientHeader();
  const formData = new FormData();
  formData.append("file", file);
  return await __request<PhotoUploadRequest, Message>(
    "post",
    "/reference-photos",
    formData,
    clientHeader,
  );
}

export async function getUserPhotos() {
  const clientHeader = getClientHeader();
  return await __request<undefined, Array<ReferencePhoto>>(
    "get",
    "/reference-photos",
    undefined,
    clientHeader,
  );
}

export async function deleteUserPhoto(referencePhotoId: number) {
  const clientHeader = getClientHeader();
  return await __request<undefined, Message>(
    "delete",
    `/reference-photos/${referencePhotoId}`,
    undefined,
    clientHeader,
  );
}
