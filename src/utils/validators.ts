import { z } from 'zod';

export const SignupSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s]+$/, "Name must only contain alphabets and spaces"),
  email: z.string().email(),
  password: z.string()
    .min(8)
    .regex(/[A-Z]/, "Must have one uppercase")
    .regex(/[a-z]/, "Must have one lowercase")
    .regex(/[0-9]/, "Must have one number")
    .regex(/[^A-Za-z0-9]/, "Must have one special character"),
  role: z.enum(['author', 'reader']),
});

export const ArticleSchema = z.object({
  title: z.string().min(1).max(150),
  content: z.string().min(50),
  category: z.string(),
  status: z.enum(['Draft', 'Published']).optional(),
});