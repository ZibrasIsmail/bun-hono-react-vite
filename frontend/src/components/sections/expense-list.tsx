import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { deleteExpense, getExpenses, updateExpense } from "@/lib/api";
import { FilePenIcon, TrashIcon } from "@/lib/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  "Food",
  "Transportation",
  "Entertainment",
  "Utilities",
  "Other",
];

export function ExpenseList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    data: expensesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["total-expenses"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      expense,
    }: {
      id: number;
      expense: { title: string; amount: string; category: string };
    }) => updateExpense(id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["total-expenses"] });
    },
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const editRowRef = useRef<HTMLTableRowElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleEdit = (expense: {
    id: number;
    title: string;
    amount: string;
    category: string;
  }) => {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
  };

  const handleUpdate = () => {
    if (editingId) {
      const amount = parseFloat(editAmount);
      if (amount <= 0) {
        toast({
          title: "Invalid amount",
          description: "Please enter a positive amount.",
          variant: "destructive",
        });
        return;
      }
      updateMutation.mutate({
        id: editingId,
        expense: {
          title: editTitle,
          amount: editAmount,
          category: editCategory,
        },
      });
      resetEditState();
    }
  };

  const resetEditState = () => {
    setEditingId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editRowRef.current &&
        !editRowRef.current.contains(event.target as Node) &&
        !isSelectOpen
      ) {
        resetEditState();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSelectOpen]);

  if (isLoading) {
    return <ExpenseListSkeleton />;
  }

  if (error) {
    return <div>Error loading expenses: {error.message}</div>;
  }

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="border shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expense</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expensesData?.expenses.map((expense) => (
              <TableRow
                key={expense.id}
                ref={editingId === expense.id ? editRowRef : null}
              >
                <TableCell>
                  {editingId === expense.id ? (
                    <Input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    expense.title
                  )}
                </TableCell>
                <TableCell>
                  {editingId === expense.id ? (
                    <Input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      min="0.01"
                      step="0.01"
                    />
                  ) : (
                    `$${expense.amount}`
                  )}
                </TableCell>
                <TableCell>
                  {editingId === expense.id ? (
                    <div ref={selectRef}>
                      <Select
                        value={editCategory}
                        onValueChange={setEditCategory}
                        onOpenChange={(open) => setIsSelectOpen(open)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    expense.category
                  )}
                </TableCell>
                <TableCell>
                  {editingId === expense.id ? (
                    <Button onClick={handleUpdate}>Save</Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleEdit({
                            id: expense.id,
                            title: expense.title,
                            amount: expense.amount,
                            category: expense.category,
                          })
                        }
                      >
                        <FilePenIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ExpenseListSkeleton() {
  return (
    <div className="border shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Expense</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full ml-2" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
