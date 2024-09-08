import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ExpenseForm from "@/ExpenseForm";
import ExpenseList from "@/ExpenseList";
import ExpenseSummary from "@/ExpenseSummary";
import FilterBar from "@/FilterBar";
import { Expense, Filter } from "@/lib/types";
import { UserIcon } from "@/lib/icons";

const fakeExpenses: Expense[] = [
  {
    id: 1,
    name: "Groceries",
    amount: 50.25,
    category: "Food",
    date: "2023-03-15",
  },
  {
    id: 2,
    name: "Movie tickets",
    amount: 25.0,
    category: "Entertainment",
    date: "2023-03-18",
  },
  {
    id: 3,
    name: "Gas",
    amount: 40.0,
    category: "Transportation",
    date: "2023-03-20",
  },
  {
    id: 4,
    name: "Dinner out",
    amount: 60.75,
    category: "Food",
    date: "2023-03-22",
  },
  {
    id: 5,
    name: "New shoes",
    amount: 80.0,
    category: "Shopping",
    date: "2023-03-25",
  },
];

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(fakeExpenses);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [filter, setFilter] = useState<Filter>({
    category: "",
    sortBy: "date",
    sortOrder: "asc",
  });

  const handleAddExpense = (newExpense: Omit<Expense, "id" | "date">) => {
    const newExpenseData: Expense = {
      id: expenses.length + 1,
      ...newExpense,
      date: new Date().toISOString().slice(0, 10),
    };
    setExpenses([...expenses, newExpenseData]);
  };

  const handleFilterChange = (type: keyof Filter, value: string) => {
    setFilter({ ...filter, [type]: value });
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (
        filter.category &&
        filter.category !== "all" &&
        expense.category !== filter.category
      ) {
        return false;
      }
      return true;
    });
  }, [expenses, filter]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
  }, [filteredExpenses]);

  const expensesByCategory = useMemo(() => {
    return filteredExpenses.reduce<
      Record<string, { total: number; count: number }>
    >((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = { total: 0, count: 0 };
      }
      acc[category].total += expense.amount;
      acc[category].count++;
      return acc;
    }, {});
  }, [filteredExpenses]);

  useEffect(() => {
    async function fetchTotalSpent() {
      const response = await fetch("/api/expenses/total-spent");
      const data = await response.json();
      setTotalSpent(data.totalSpent);
    }
    fetchTotalSpent();
  }, []);

  return (
    <div className="flex h-screen w-full flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Expense Tracker</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="ghost" size="icon">
              <UserIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 grid grid-cols-[240px_1fr] overflow-hidden">
        <FilterBar filter={filter} onFilterChange={handleFilterChange} />
        <main className="bg-background p-6 overflow-auto">
          <div className="grid gap-6">
            <ExpenseSummary
              totalExpenses={totalExpenses}
              totalSpent={totalSpent}
              expensesByCategory={expensesByCategory}
              filteredExpenses={filteredExpenses}
            />
            <ExpenseList expenses={filteredExpenses} />
          </div>
        </main>
      </div>
      <ExpenseForm onAddExpense={handleAddExpense} />
    </div>
  );
}
