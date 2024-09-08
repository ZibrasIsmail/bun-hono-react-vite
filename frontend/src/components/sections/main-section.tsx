import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilePenIcon, TrashIcon } from "@/lib/icons";

export function MainSection() {
  return (
    <main className="bg-background p-4 md:p-6 overflow-auto">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl md:text-4xl font-bold">
              $0.00
            </CardContent>
          </Card>
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
        <div className="border shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Groceries</TableCell>
                  <TableCell>$75.99</TableCell>
                  <TableCell className="hidden md:table-cell">Food</TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-04-15
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gas</TableCell>
                  <TableCell>$45.25</TableCell>
                  <TableCell className="hidden md:table-cell">
                    Transportation
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-04-10
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Movie Tickets</TableCell>
                  <TableCell>$30.00</TableCell>
                  <TableCell className="hidden md:table-cell">
                    Entertainment
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-04-20
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rent</TableCell>
                  <TableCell>$1200.00</TableCell>
                  <TableCell className="hidden md:table-cell">
                    Housing
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-04-01
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <FilePenIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
