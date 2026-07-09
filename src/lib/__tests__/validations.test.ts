import { describe, it, expect } from "vitest";
import { bookingSchema, adminLoginSchema } from "@/lib/validations";

describe("bookingSchema (F9 - Input Validation)", () => {
  it("accepts valid booking data", () => {
    const result = bookingSchema.safeParse({
      name: "Ali Khan",
      brand: "StyleHouse",
      whatsapp: "+923001234567",
      package: "Trial",
      productsCount: "10",
      source: "Instagram",
      selectedDate: "2026-07-15",
      selectedTime: "14:00",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short name", () => {
    const result = bookingSchema.safeParse({
      name: "A",
      brand: "StyleHouse",
      whatsapp: "+923001234567",
      package: "Trial",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty brand name", () => {
    const result = bookingSchema.safeParse({
      name: "Ali Khan",
      brand: "",
      whatsapp: "+923001234567",
      package: "Trial",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid WhatsApp number", () => {
    const result = bookingSchema.safeParse({
      name: "Ali Khan",
      brand: "StyleHouse",
      whatsapp: "abc",
      package: "Trial",
    });
    expect(result.success).toBe(false);
  });

  it("rejects very long name (over 100 chars)", () => {
    const result = bookingSchema.safeParse({
      name: "A".repeat(101),
      brand: "StyleHouse",
      whatsapp: "+923001234567",
      package: "Trial",
    });
    expect(result.success).toBe(false);
  });
});

describe("adminLoginSchema (F9 - Password Policy)", () => {
  it("accepts strong password", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@test.com",
      password: "Str0ngP@ssword!",
    });
    expect(result.success).toBe(true);
  });

  it("rejects short password (< 12 chars)", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@test.com",
      password: "Short1A@",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without uppercase", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@test.com",
      password: "weakpassword1@",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without lowercase", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@test.com",
      password: "WEAKPASSWORD1@",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without number", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@test.com",
      password: "WeakPass@word",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without special character", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@test.com",
      password: "WeakPassword1",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = adminLoginSchema.safeParse({
      email: "not-an-email",
      password: "StrongP@ss1",
    });
    expect(result.success).toBe(false);
  });
});
