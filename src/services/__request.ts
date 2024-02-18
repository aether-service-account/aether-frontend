"use server";
import axios, { AxiosRequestConfig, Method } from "axios";
import { ClientHeader } from "@/utils/types";

async function __request<TRequest, TResponse>(
  method: Method,
  url: string,
  data?: TRequest,
  clientHeader?: ClientHeader,
): Promise<TResponse> {
  // mutate the url
  url = `${process.env.BACKEND_API}${url}`;
  const fullConfig: AxiosRequestConfig = {
    method: method,
    url: url,
    data: data,
    headers: {
      ...clientHeader,
    },
  };

  try {
    const response = await axios(fullConfig);
    return response.data as TResponse;
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
}

export default __request;
