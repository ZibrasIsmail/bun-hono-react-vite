import { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createExpense } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react"; // Import the loader icon

export function SideNav() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Food");
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["total-expenses"],
      });
      toast({
        title: "Expense added",
        description: "Your expense has been successfully added.",
      });
      setExpenseName("");
      setExpenseAmount("");
      setExpenseCategory("Food");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddExpense = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (expenseName && expenseAmount && amount > 0) {
      createMutation.mutate({
        title: expenseName,
        amount: expenseAmount,
        category: expenseCategory,
      });
    } else {
      toast({
        title: "Invalid input",
        description: "Please enter a valid expense name and a positive amount.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-muted p-4 space-y-4 h-full overflow-y-auto">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Filters</h3>
        <Select defaultValue="all">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Housing">Housing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Add Expense
        </h3>
        <form onSubmit={handleAddExpense} className="space-y-2">
          <Input
            placeholder="Expense Name"
            className="w-full"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
            disabled={createMutation.isPending}
          />
          <Input
            placeholder="Amount"
            type="number"
            className="w-full"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
            disabled={createMutation.isPending}
          />
          <Select
            value={expenseCategory}
            onValueChange={(value) => setExpenseCategory(value)}
            disabled={createMutation.isPending}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transportation">Transportation</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Housing">Housing</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="w-full"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Expense"
            )}
          </Button>
        </form>
      </div>
    </nav>
  );
}
