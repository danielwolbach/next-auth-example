import { z } from "zod";

export const SignUpSchema = z
    .object({
        name: z.string().nonempty("Must not be empty").trim(),
        email: z
            .string()
            .email({
                message: "Must be a valid email address",
            })
            .trim()
            .toLowerCase(),
        password: z
            .string()
            .min(8, "Must be at least 8 characters")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(
                /[^a-zA-Z0-9]/,
                "Must contain at least one special character"
            )
            .trim(),
        repeatPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Must match password",
        path: ["repeatPassword"],
    });

export const SignInSchema = z.object({
    email: z
        .string()
        .email({
            message: "Must be a valid email address",
        })
        .trim()
        .toLowerCase(),
    password: z.string().nonempty("Must not be empty").trim(),
});

export const RequestRecoverAccountSchema = z.object({
    email: z
        .string()
        .email({
            message: "Must be a valid email address",
        })
        .trim()
        .toLowerCase(),
});

export const RecoverAccountSchema = z
    .object({
        password: z
            .string()
            .min(8, "Must be at least 8 characters")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(
                /[^a-zA-Z0-9]/,
                "Must contain at least one special character"
            )
            .trim(),
        repeatPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Must match password",
        path: ["repeatPassword"],
    });

export type FormState =
    | {
          message?: string;
          errors?: Record<string, string[]>;
      }
    | undefined;
