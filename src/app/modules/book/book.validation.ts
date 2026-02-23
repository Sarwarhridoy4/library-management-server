// src/modules/book/book.validation.ts
// This file defines the validation schemas for creating and updating a book using Zod.
// It uses Zod to enforce the structure and types of the data being validated.

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

const requiredBoolean = (label: string) =>
  z.boolean({
    error: (issue) =>
      issue.input === undefined
        ? `${label} is required`
        : `${label} must be a boolean`,
  });

export const genreEnum = z.enum([
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
]);

export const createBookZodSchema = z.object({
  title: requiredString("Title"),
  author: requiredString("Author"),
  genre: genreEnum,
  isbn: requiredString("ISBN"),
  description: z.string().optional(),
  copies: requiredNumber("Copies").int().min(0, { error: "Copies must be at least 0" }),
  available: requiredBoolean("Available"),
});

export const updateBookZodSchema = z.object({
  title: z.string({ error: "Title must be a string" }).optional(),
  author: z.string({ error: "Author must be a string" }).optional(),
  genre: genreEnum.optional(),
  isbn: z.string({ error: "ISBN must be a string" }).optional(),
  description: z.string({ error: "Description must be a string" }).optional(),
  copies: z
    .number({ error: "Copies must be a number" })
    .int()
    .min(0, { error: "Copies must be at least 0" })
    .optional(),
  available: z.boolean({ error: "Available must be a boolean" }).optional(),
});
