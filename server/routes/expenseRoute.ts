import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, title: "Expense 1", amount: 100 },
  { id: 2, title: "Expense 2", amount: 200 },
  { id: 3, title: "Expense 3", amount: 300 },
];

const createExpenseSchema = expenseSchema.omit({ id: true });

export const expenseRoute = new Hono()
  .get("/", async (c) => {
    return c.json({ expenses: fakeExpenses });
  })
  .get(
    "/:id{[0-9]+}",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const id = c.req.valid("param").id;
      const expense = fakeExpenses.find((expense) => expense.id === id);
      if (!expense) {
        return c.notFound();
      }
      return c.json({ expense });
    }
  )
  .get("/total-spent", async (c) => {
    const totalSpent = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ totalSpent });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = await c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    return c.json({ expenses: fakeExpenses });
  })
  .delete(
    "/:id{[0-9]+}",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const id = c.req.valid("param").id;
      if (id < 1 || id > fakeExpenses.length) {
        return c.notFound();
      }
      const updatedExpenses = fakeExpenses.filter(
        (expense) => expense.id !== Number(id)
      );
      return c.json({ expenses: updatedExpenses });
    }
  )
  .put(
    "/:id{[0-9]+}",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    zValidator("json", createExpenseSchema),
    async (c) => {
      const id = c.req.valid("param").id;
      if (id < 1 || id > fakeExpenses.length) {
        return c.notFound();
      }
      const expense = c.req.valid("json");
      const updatedExpenses = fakeExpenses.map((expense) =>
        expense.id === Number(id) ? expense : expense
      );
      return c.json({ expenses: updatedExpenses });
    }
  );
