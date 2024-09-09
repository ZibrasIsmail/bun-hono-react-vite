import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getTotalSpent } from "@/lib/api";

export function TotalExpense() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["total-expenses"],
    queryFn: () => getTotalSpent(),
  });

  let content;
  if (isLoading) {
    content = <Skeleton className="h-10 w-24" />;
  } else if (error) {
    content = "Error fetching data";
  } else {
    content = `$${data?.totalSpent || "0.00"}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Expenses</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl md:text-4xl font-bold">
        {content}
      </CardContent>
    </Card>
  );
}
