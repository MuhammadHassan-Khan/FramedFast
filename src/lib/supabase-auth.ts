import { supabaseAdmin } from "./supabase";

type User = NonNullable<Awaited<ReturnType<typeof supabaseAdmin.auth.getUser>>["data"]["user"]>;

export type VerifiedSession = {
  user: User;
  teamId: string;
  role: "admin" | "manager" | "agent";
};

export type VerifyResult = { user: VerifiedSession } | { user: null };

export async function verifyAdminToken(accessToken: string | undefined): Promise<VerifyResult> {
  if (!accessToken) return { user: null };

  const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !data.user) return { user: null };

  const { data: teamMember } = await supabaseAdmin
    .from("team")
    .select("id, role")
    .eq("supabase_user_id", data.user.id)
    .eq("is_active", true)
    .single();

  if (!teamMember) return { user: null };

  return {
    user: {
      user: data.user,
      teamId: teamMember.id,
      role: teamMember.role as "admin" | "manager" | "agent",
    },
  };
}

export function requireRole(
  verified: VerifyResult,
  allowedRoles: ("admin" | "manager" | "agent")[],
): asserts verified is { user: VerifiedSession } {
  if (!verified.user) throw new Error("Unauthorized");
  if (!allowedRoles.includes(verified.user.role)) {
    throw new Error("Forbidden: insufficient permissions");
  }
}
