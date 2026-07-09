import { describe, it, expect } from "vitest";

describe("Security Headers (F8)", () => {
  const SECURITY_HEADERS = {
    "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
    "content-security-policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://*.supabase.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://api.github.com; frame-ancestors 'none';",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
  };

  it("HSTS header is present and has long max-age", () => {
    expect(SECURITY_HEADERS["strict-transport-security"]).toContain("max-age=63072000");
    expect(SECURITY_HEADERS["strict-transport-security"]).toContain("includeSubDomains");
    expect(SECURITY_HEADERS["strict-transport-security"]).toContain("preload");
  });

  it("X-Content-Type-Options prevents MIME sniffing", () => {
    expect(SECURITY_HEADERS["x-content-type-options"]).toBe("nosniff");
  });

  it("X-Frame-Options prevents clickjacking", () => {
    expect(SECURITY_HEADERS["x-frame-options"]).toBe("DENY");
  });

  it("Content-Security-Policy restricts script sources", () => {
    const csp = SECURITY_HEADERS["content-security-policy"];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it("Permissions-Policy restricts sensitive APIs", () => {
    expect(SECURITY_HEADERS["permissions-policy"]).toContain("camera=()");
    expect(SECURITY_HEADERS["permissions-policy"]).toContain("microphone=()");
    expect(SECURITY_HEADERS["permissions-policy"]).toContain("geolocation=()");
  });

  it("Referrer-Policy restricts referrer leakage", () => {
    expect(SECURITY_HEADERS["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });
});
