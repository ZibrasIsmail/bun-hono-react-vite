export interface Expense {
  id: number;
  name: string;
  amount: string;
  category: string;
  userId: string;
}

export interface Filter {
  category: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}
