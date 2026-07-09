import { n as supabaseAdmin } from "./supabase-vy9kvSwN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-auth-DmtgsSkq.js
async function verifyAdminToken(accessToken) {
	if (!accessToken) return { user: null };
	const { data, error } = await supabaseAdmin.auth.getUser(accessToken);
	if (error || !data.user) return { user: null };
	const { data: teamMember } = await supabaseAdmin.from("team").select("id, role").eq("supabase_user_id", data.user.id).eq("is_active", true).single();
	if (!teamMember) return { user: null };
	return { user: {
		user: data.user,
		teamId: teamMember.id,
		role: teamMember.role
	} };
}
function requireRole(verified, allowedRoles) {
	if (!verified.user) throw new Error("Unauthorized");
	if (!allowedRoles.includes(verified.user.role)) throw new Error("Forbidden: insufficient permissions");
}
//#endregion
export { verifyAdminToken as n, requireRole as t };
