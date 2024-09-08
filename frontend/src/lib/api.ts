import { hc } from "hono/client";
import { type ApiRoutes } from "../../../server/app";

const client = hc<ApiRoutes>("/");

export const api = client.api;

export const getTotalSpent = async () => {
  const response = await api.expenses["total-spent"].$get();
  if (response.status !== 200) {
    throw new Error("Failed to get total spent");
  }
  const data = await response.json();
  return data;
};
