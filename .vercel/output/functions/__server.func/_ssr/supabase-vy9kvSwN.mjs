import { i as TSS_SERVER_FUNCTION } from "./esm-B50dUWcE.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-vy9kvSwN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var supabaseUrl = process.env.VITE_SUPABASE_URL ?? "";
var serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
if (!supabaseUrl) throw new Error("Missing VITE_SUPABASE_URL env var");
if (!serviceRoleKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY env var");
var supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: {
	autoRefreshToken: false,
	persistSession: false
} });
//#endregion
export { supabaseAdmin as n, createServerRpc as t };
