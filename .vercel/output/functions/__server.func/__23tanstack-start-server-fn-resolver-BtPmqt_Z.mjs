//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BtPmqt_Z.js
var manifest = {
	"1654a5d11e1d2d18294b6e7f117a4dedb488b3027c164739697bb2c9aeddd4fc": {
		functionName: "getDashboardKPIs_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"1c066c0ff21df259a0e9c503dccdd48e635b283f0d186918822ffad4e35f0074": {
		functionName: "getBookedSlots_createServerFn_handler",
		importer: () => import("./_ssr/booking-admin-BIQ-gQob.mjs")
	},
	"2c94b40e25dc80fda86fe1d7d850f8e82614dbe91a4a0b7e9776506073ba03bf": {
		functionName: "getOrderStats_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"2d822ead8a301ba667bf152eabc011df3d94f81643f508f84c2cf32ccb7ec422": {
		functionName: "getBookingsList_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"453c9735da5d4d12fe76d448fb0e592be130f1a9d46a769e5f5003f648a03240": {
		functionName: "setBulkStatus_createServerFn_handler",
		importer: () => import("./_ssr/booking-admin-BIQ-gQob.mjs")
	},
	"4c85e4e740b2bbcb243a2cb3eea45565faf5567d2b241703fdbbddab7d8a733d": {
		functionName: "getRecentTransactions_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"5501624098d506cfbf9b0d567e69ae9546010b4cae36ebbdd8e47c3e11143754": {
		functionName: "getPaymentMethods_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"5c8ce7cebb4b1d1bb2f57ed947262a49b0581a5c453ea3ce4b405ea48f399e52": {
		functionName: "getLeadsData_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"828b198f073002d10d734a27234d14eaa4e45e87e658b07912a749889f097583": {
		functionName: "getCustomerGrowth_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"8f9961b8f17eb26fb1602fe1d7668f8faeafc6306092d13b093b9964a0a6f0ce": {
		functionName: "getRecentActivity_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"98d718cc96486a19218ab540e4ff180a1c069dda9e6a933998823510dce56374": {
		functionName: "createBooking_createServerFn_handler",
		importer: () => import("./_ssr/bookings-CQThGd_2.mjs")
	},
	"bd28f88072d07bdb5da39428c1abd268fe83545278744fd265a70e8b32ce2e33": {
		functionName: "closeDay_createServerFn_handler",
		importer: () => import("./_ssr/booking-admin-BIQ-gQob.mjs")
	},
	"be1ec7f7ab9f3415ac9af9bf9f90070452a36b8b096267a4ed79d37b362f6edd": {
		functionName: "openDay_createServerFn_handler",
		importer: () => import("./_ssr/booking-admin-BIQ-gQob.mjs")
	},
	"be8399ac1dc88e1554036749969ad9335d13f592f8156a8a32c35f021abf074a": {
		functionName: "getTopProducts_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"c5108bfa4fe92e56281038daf731a54b71af4d1f4cb6287e211363fe6ec522f1": {
		functionName: "checkDatesOpen_createServerFn_handler",
		importer: () => import("./_ssr/booking-admin-BIQ-gQob.mjs")
	},
	"cea4870aa5753c84a0d76c350d3e75d938f6ec066e0ccb015ffdb9381468b394": {
		functionName: "getSalesFunnel_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"d7b8ba51b3773a61e0cd47f5adfe808de9bcf483fc17d021e7534e91b120b3db": {
		functionName: "getMonthAvailability_createServerFn_handler",
		importer: () => import("./_ssr/booking-admin-BIQ-gQob.mjs")
	},
	"db11d32bc759d08efabb7009dd0b44032c455ef2c9c677b0b2b8df60ea436501": {
		functionName: "getMonthlyRevenue_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"ead5cdddaf2ba01c984cd14d706f87e9146e718d8ffa7bdcf1bd89bbb8d2c796": {
		functionName: "getTeamPerformance_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	},
	"ee78d6e67828ddc813f51f0055a91d878d6d55b10ebaab72d3eab987465e6e97": {
		functionName: "getRevenueSeries_createServerFn_handler",
		importer: () => import("./_ssr/admin-CClgCd6t.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
