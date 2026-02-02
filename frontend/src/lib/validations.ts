import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(6),
});

export const registerSchema = z
  .object({
    firstname: z.string().min(6),
    lastname: z.string().min(6),
    email: z.string().email().min(5),
    university_id: z
      .string()
      .regex(/^\d{11}$/, "University ID must be 11 digits"),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password_confirmation"],
        message: "Passwords do not match.",
      });
    }
  });

const bookImageValidation = (isRequired: boolean) => {
  return z.custom(
    (val) => {
      if (!isRequired && (val === undefined || val === null || val === "")) {
        return true;
      }

      return (
        val &&
        typeof val === "object" &&
        "name" in val &&
        "size" in val &&
        "type" in val &&
        typeof val.name === "string" &&
        typeof val.size === "number" &&
        typeof val.type === "string"
      );
    },
    {
      message: isRequired ? "Book image is Required" : "Book image is Invalid",
    }
  );
};

const getBookCommonValidations = () => ({
  title: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  author: z.string().trim().min(2).max(100),
  total_copies: z
    .number()
    .int("Total copies must be an integer")
    .min(1, "Minimum is 1")
    .max(1000, "Maximum is 1000"),
  summary: z.string().trim().min(3).max(1255),
  description: z.string().trim().min(3).max(500),
});

export const createBookSchema = z.object({
  ...getBookCommonValidations(),
  image: bookImageValidation(true),
});

export const updateBookSchema = z.object({
  ...getBookCommonValidations(),
  image: bookImageValidation(false),
});
