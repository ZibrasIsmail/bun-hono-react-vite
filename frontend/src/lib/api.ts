import { queryOptions } from "@tanstack/react-query";
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

export const getExpenses = async () => {
  const response = await api.expenses.$get();
  if (response.status !== 200) {
    throw new Error("Failed to get expenses");
  }
  const data = await response.json();
  return data;
};

export const createExpense = async (expense: {
  title: string;
  amount: string;
  category: string;
}) => {
  const response = await api.expenses.$post({
    json: {
      ...expense,
      amount: expense.amount.toString(),
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to create expense");
  }
  const data = await response.json();
  return data;
};

export const deleteExpense = async (id: number) => {
  const response = await api.expenses[":id{[0-9]+}"].$delete({
    param: {
      id: id.toString(),
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }
  const data = await response.json();
  return data;
};

export const updateExpense = async (
  id: number,
  expense: { title: string; amount: string; category: string }
) => {
  const response = await api.expenses[":id{[0-9]+}"].$put({
    param: {
      id: id.toString(),
    },
    json: {
      ...expense,
      amount: expense.amount.toString(),
    },
  });
  if (response.status !== 200) {
    throw new Error("Failed to update expense");
  }
  const data = await response.json();
  return data;
};

export const fetchUser = async () => {
  const response = await api.me.$get();

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const useQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: fetchUser,
  staleTime: Infinity,
});
