import { getCookie } from "typescript-cookie";

async function __request(url: string, init: RequestInit | undefined) {
  const appendedHeaders = {
    ...init?.headers,
    "Access-Token": getCookie("aether-lenz"),
  };
  console.log(process.env.NEXT_PUBLIC_BACKEND_API);
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}${url}`, {
    ...init,
    // @ts-ignore
    headers: {
      ...appendedHeaders,
    },
  });
}

export default __request;
