import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/lib/types";

interface ExpenseSummaryProps {
  totalExpenses: number;
  totalSpent: number;
  expensesByCategory: Record<string, { total: number; count: number }>;
  filteredExpenses: Expense[];
}

export default function ExpenseSummary({
  totalExpenses,
  totalSpent,
  expensesByCategory,
  filteredExpenses,
}: ExpenseSummaryProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent className="text-4xl font-bold">
          ${totalSpent.toFixed(2)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {Object.entries(expensesByCategory).map(([category, data]) => (
              <div key={category} className="flex items-center justify-between">
                <div>{category}</div>
                <div className="font-medium">
                  ${data.total.toFixed(2)} ({data.count})
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Expense Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </div>
              <div className="font-medium">${totalExpenses.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Expenses This Month
              </div>
              <div className="font-medium">
                $
                {filteredExpenses
                  .filter((expense) => {
                    const expenseDate = new Date(expense.date);
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();
                    return (
                      expenseDate.getMonth() === currentMonth &&
                      expenseDate.getFullYear() === currentYear
                    );
                  })
                  .reduce((total, expense) => total + expense.amount, 0)
                  .toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
