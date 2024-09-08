export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export interface Filter {
  category: string;
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}
