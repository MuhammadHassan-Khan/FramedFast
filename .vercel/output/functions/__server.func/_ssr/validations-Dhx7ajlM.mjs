import { a as objectType, i as numberType, n as booleanType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/validations-Dhx7ajlM.js
var bookingSchema = objectType({
	name: stringType().min(2, "Name must be at least 2 characters").max(100),
	brand: stringType().min(1, "Brand name is required").max(100),
	whatsapp: stringType().min(8, "Valid WhatsApp number required").max(20).regex(/^\+?[\d\s-]+$/, "Enter a valid phone number"),
	package: enumType([
		"Starter",
		"Growth",
		"Premium",
		"Growth Retainer",
		"Not Sure"
	]),
	productsCount: stringType().optional().transform((v) => v ? parseInt(v, 10) : void 0),
	source: stringType().optional(),
	selectedDate: stringType().optional(),
	selectedTime: stringType().optional()
});
objectType({
	email: stringType().email("Valid email required"),
	password: stringType().min(12, "Password must be at least 12 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});
objectType({ range: enumType([
	"7d",
	"30d",
	"90d",
	"1y",
	"all"
]).optional().default("30d") });
var tokenOnlySchema = objectType({ token: stringType().optional() });
var datesSchema = objectType({ dates: arrayType(stringType()) });
var closeDaySchema = objectType({
	token: stringType().optional(),
	date: stringType().min(1)
});
var bulkStatusSchema = objectType({
	token: stringType().optional(),
	dates: arrayType(stringType()).min(1),
	isOpen: booleanType()
});
var monthAvailabilitySchema = objectType({
	token: stringType().optional(),
	year: numberType().int(),
	month: numberType().int().min(0).max(11)
});
//#endregion
export { monthAvailabilitySchema as a, datesSchema as i, bulkStatusSchema as n, tokenOnlySchema as o, closeDaySchema as r, bookingSchema as t };
