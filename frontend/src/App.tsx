import { Button } from "@/components/ui/button";
import { getTotalSpent } from "@/lib/api";
import { UserIcon } from "@/lib/icons";
import { useQuery } from "@tanstack/react-query";

// const fakeExpenses: Expense[] = [
//   {
//     id: 1,
//     name: "Groceries",
//     amount: 50.25,
//     category: "Food",
//     date: "2023-03-15",
//   },
//   {
//     id: 2,
//     name: "Movie tickets",
//     amount: 25.0,
//     category: "Entertainment",
//     date: "2023-03-18",
//   },
//   {
//     id: 3,
//     name: "Gas",
//     amount: 40.0,
//     category: "Transportation",
//     date: "2023-03-20",
//   },
//   {
//     id: 4,
//     name: "Dinner out",
//     amount: 60.75,
//     category: "Food",
//     date: "2023-03-22",
//   },
//   {
//     id: 5,
//     name: "New shoes",
//     amount: 80.0,
//     category: "Shopping",
//     date: "2023-03-25",
//   },
// ];

export default function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getTotalSpent"],
    queryFn: () => getTotalSpent(),
  });

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
        <main className="bg-background p-6 overflow-auto">
          <div className="grid gap-6">
            {/* <ExpenseSummary
              totalSpent={data?.totalSpent ?? 0}
              isLoading={isLoading}
              error={error}
            /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
