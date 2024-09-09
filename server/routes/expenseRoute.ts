import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getUser } from "../kinde";
import { db } from "../db";
import { expenses as expenseTable } from "../db/schema/expense";
import { desc, eq, sum } from "drizzle-orm";

const expenseSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  amount: z.string(),
  category: z.string().min(1).max(255),
});

type Expense = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });

export const expenseRoute = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.get("user");
    const expenses = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id));
    return c.json({ expenses });
  })
  .get(
    "/:id{[0-9]+}",
    getUser,
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    async (c) => {
      const id = c.req.valid("param").id;
      const expense = await db
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.id, id))
        .limit(1);
      if (!expense) {
        return c.notFound();
      }
      return c.json({ expense });
    }
  )
  .get("/total-spent", getUser, async (c) => {
    const user = c.get("user");
    const totalSpent = await db
      .select({
        total: sum(expenseTable.amount).as("total"),
      })
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id));
    return c.json({ totalSpent: totalSpent[0].total });
  })
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const user = c.get("user");
    const expense = await c.req.valid("json");
    const newExpense = await db
      .insert(expenseTable)
      .values({
        ...expense,
        userId: user.id,
        amount: expense.amount.toString(),
      })
      .returning();
    return c.json({ expense: newExpense[0] });
  })
  .delete("/:id{[0-9]+}", getUser, async (c) => {
    const id = Number(c.req.param("id"));
    const expense = await db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.id, id));
    if (!expense) {
      return c.notFound();
    }
    await db.delete(expenseTable).where(eq(expenseTable.id, id));
    return c.json({ expense });
  })
  .put(
    "/:id{[0-9]+}",
    zValidator("param", z.object({ id: z.coerce.number().int().positive() })),
    zValidator("json", createExpenseSchema),
    getUser,
    async (c) => {
      const id = c.req.valid("param").id;
      const expense = c.req.valid("json");
      const updatedExpense = await db
        .update(expenseTable)
        .set({
          ...expense,
          amount: expense.amount.toString(),
        })
        .where(eq(expenseTable.id, id))
        .returning();
      return c.json({ expense: updatedExpense[0] });
    }
  );
