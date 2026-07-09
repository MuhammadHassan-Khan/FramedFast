import { i as __toESM } from "../_runtime.mjs";
import { g as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./supabase-browser-B-KBy0K4.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-oYcjQOLN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LOGIN_RATE_LIMIT_WINDOW = 6e4;
var LOGIN_RATE_LIMIT_MAX = 5;
function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const loginAttempts = (0, import_react.useRef)([]);
	function checkLoginRateLimit() {
		const now = Date.now();
		const windowStart = now - LOGIN_RATE_LIMIT_WINDOW;
		loginAttempts.current = loginAttempts.current.filter((t) => t > windowStart);
		if (loginAttempts.current.length >= LOGIN_RATE_LIMIT_MAX) return false;
		loginAttempts.current.push(now);
		return true;
	}
	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		if (!checkLoginRateLimit()) {
			setError("Too many login attempts. Please wait a minute and try again.");
			setLoading(false);
			return;
		}
		const { error: authError } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (authError) {
			setError("Invalid email or password. Please try again.");
			setLoading(false);
			return;
		}
		router.navigate({ to: "/admin" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#0b0b0c] flex items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto grid h-12 w-12 place-items-center rounded-md bg-[#FA680A] text-black font-black text-xl",
						children: "F"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-2xl font-bold text-white tracking-tight",
						children: "FramedFast Admin"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/50",
						children: "Sign in to your dashboard"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "admin@framefast.com",
						required: true,
						className: "w-full bg-white/5 border border-white/10 focus:border-[#FA680A] outline-none text-white px-4 py-3 rounded-lg text-sm"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5",
						children: "Password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						placeholder: "••••••••",
						required: true,
						className: "w-full bg-white/5 border border-white/10 focus:border-[#FA680A] outline-none text-white px-4 py-3 rounded-lg text-sm"
					})] }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: loading,
						className: "w-full bg-[#FA680A] text-black font-semibold py-3 rounded-lg text-sm hover:bg-[#e05e08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
						children: loading ? "Signing in…" : "Sign In"
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminLoginPage as component };
