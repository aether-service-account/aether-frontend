import { getCookie } from "typescript-cookie";
import { ClientHeader } from "@/utils/types";

export function getClientHeader(): ClientHeader {
  "use client";
  return {
    "Access-Token": getCookie("aether-lenz"),
  };
}
