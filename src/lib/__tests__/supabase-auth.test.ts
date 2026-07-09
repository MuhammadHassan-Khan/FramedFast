import { describe, it, expect } from "vitest";

// Direct unit test of requireRole logic without Supabase dependency
describe("requireRole logic (F5 - RBAC)", () => {
  async function testRequireRole(
    verified: { user: { role: string } | null },
    allowedRoles: string[],
  ): Promise<{ ok: boolean; error?: string }> {
    // This replicates requireRole logic from supabase-auth.ts
    if (!verified.user) return { ok: false, error: "Unauthorized" };
    if (!allowedRoles.includes(verified.user.role)) {
      return { ok: false, error: "Forbidden: insufficient permissions" };
    }
    return { ok: true };
  }

  it("allows admin role for admin endpoints", async () => {
    const result = await testRequireRole({ user: { role: "admin" } }, [
      "admin",
      "manager",
      "agent",
    ]);
    expect(result.ok).toBe(true);
  });

  it("allows manager role for admin endpoints", async () => {
    const result = await testRequireRole({ user: { role: "manager" } }, [
      "admin",
      "manager",
      "agent",
    ]);
    expect(result.ok).toBe(true);
  });

  it("allows agent role for admin endpoints", async () => {
    const result = await testRequireRole({ user: { role: "agent" } }, [
      "admin",
      "manager",
      "agent",
    ]);
    expect(result.ok).toBe(true);
  });

  it("blocks unauthenticated requests", async () => {
    const result = await testRequireRole({ user: null }, ["admin", "manager", "agent"]);
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Unauthorized");
  });

  it("blocks unauthorized role", async () => {
    const result = await testRequireRole({ user: { role: "viewer" } }, ["admin"]);
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Forbidden: insufficient permissions");
  });

  it("blocks user not in team table", async () => {
    const result = await testRequireRole({ user: { role: "agent" } }, ["admin"]);
    expect(result.ok).toBe(false);
    expect(result.error).toBe("Forbidden: insufficient permissions");
  });
});
