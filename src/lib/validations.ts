import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  brand: z.string().min(1, "Brand name is required").max(100),
  whatsapp: z
    .string()
    .min(8, "Valid WhatsApp number required")
    .max(20)
    .regex(/^\+?[\d\s-]+$/, "Enter a valid phone number"),
  package: z.enum(["Starter", "Growth", "Premium", "Growth Retainer", "Not Sure"]),
  productsCount: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined)),
  source: z.string().optional(),
  selectedDate: z.string().optional(),
  selectedTime: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const adminQuerySchema = z.object({
  range: z.enum(["7d", "30d", "90d", "1y", "all"]).optional().default("30d"),
});
