import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TotalExpense } from "./expense";
import { ExpenseList } from "./expense-list";

export function MainSection() {
  return (
    <main className="bg-background p-4 md:p-6 overflow-auto">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TotalExpense />
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex flex-col">
                  <div>Food</div>
                  <div className="font-medium">$0.00 (0)</div>
                </div>
                <div className="flex flex-col">
                  <div>Transportation</div>
                  <div className="font-medium">$0.00 (0)</div>
                </div>
                <div className="flex flex-col">
                  <div>Entertainment</div>
                  <div className="font-medium">$0.00 (0)</div>
                </div>
                <div className="flex flex-col">
                  <div>Housing</div>
                  <div className="font-medium">$0.00 (0)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <ExpenseList />
      </div>
    </main>
  );
}
