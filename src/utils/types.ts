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


export const collectionTypes = ["event", "uncategorized"] as const;
export type CollectionType = typeof collectionTypes[number];

export type CollectionRequest =  {
  name: string | undefined;
  description: string | undefined;
  city: string;
  from_date: Date | undefined;
  to_date: Date | undefined;
  type: CollectionType;
}

export type CollectionPhoto = {
  id: number;
  url: string;
}


export type UserBasic = {
  id: string;
  display_name: string;
  username: string | null;
}


export type CollectionResponse = {
  id: string;
  photos: CollectionPhoto[]
  user: UserBasic
} & CollectionRequest




export const cities = [
  {
    value: "Antipolo",
    label: "Antipolo",
  },
  {
    value: "Muntinlupa",
    label: "Muntinlupa",
  },
  {
    value: "Pasig",
    label: "Pasig",
  },
  {
    value: "Pasay",
    label: "Pasay",
  },
  {
    value: "Surigao",
    label: "Surigao",
  },
]