import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "@/lib/types";

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (type: keyof Filter, value: string) => void;
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <nav className="bg-muted p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">Filters</h3>
        <Select
          value={filter.category}
          onValueChange={(value) => onFilterChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transportation">Transportation</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
            <SelectItem value="Housing">Housing</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filter.sortBy}
          onValueChange={(value) => onFilterChange("sortBy", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="amount">Amount</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filter.sortOrder}
          onValueChange={(value) => onFilterChange("sortOrder", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
