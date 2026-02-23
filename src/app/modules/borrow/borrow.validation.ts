import { z } from "zod";

const requiredString = (label: string) =>
  z.string({
    error: (issue) =>
      issue.input === undefined
        ? `${label} is required`
        : `${label} must be a string`,
  });

const requiredNumber = (label: string) =>
  z.number({
    error: (issue) =>
      issue.input === undefined
        ? `${label} is required`
        : `${label} must be a number`,
  });

export const createBorrowZodSchema = z.object({
  book: requiredString("Book ID").min(1, { error: "Book ID is required" }),
  quantity: requiredNumber("Quantity").min(1, {
    error: "At least one book must be borrowed",
  }),
  dueDate: z.coerce.date({
    error: (issue) =>
      issue.input === undefined ? "Due date is required" : "Invalid due date",
  }),
});
