export interface ReferencePhoto {
  id: number;
  url: string;
  is_associated: string;
}

export interface ClientHeader {
  "Access-Token": string | undefined;
}

export interface Message {
  message: string;
}

export type PhotoUploadRequest = FormData;
