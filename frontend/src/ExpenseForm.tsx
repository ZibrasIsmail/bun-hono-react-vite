import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Expense } from "@/lib/types";

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id" | "date">) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({
      name: newExpense.name,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
    });
    setNewExpense({ name: "", amount: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input
        placeholder="Expense Name"
        value={newExpense.name}
        onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
      />
      <Input
        placeholder="Amount"
        type="number"
        value={newExpense.amount}
        onChange={(e) =>
          setNewExpense({ ...newExpense, amount: e.target.value })
        }
      />
      <Select
        value={newExpense.category}
        onValueChange={(value) =>
          setNewExpense({ ...newExpense, category: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transportation">Transportation</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Housing">Housing</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add Expense</Button>
    </form>
  );
}
