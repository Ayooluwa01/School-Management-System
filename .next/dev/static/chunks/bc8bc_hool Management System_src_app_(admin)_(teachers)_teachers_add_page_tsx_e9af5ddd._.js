(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeacherProfileDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function TeacherProfileDetails({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-8 py-4",
        children: "jjj"
    }, void 0, false, {
        fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = TeacherProfileDetails;
// --- MINIMAL HELPERS (Unchanged) ---
function Section({ title, icon, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 mb-6 text-zinc-400",
                children: [
                    icon,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold uppercase tracking-[0.15em] text-[11px]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pl-6 border-l border-zinc-100 h-full",
                children: children
            }, void 0, false, {
                fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c1 = Section;
function InfoItem({ label, value, isAccent, icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] font-bold text-zinc-400 mb-1.5 flex items-center gap-1 uppercase tracking-wider",
                children: [
                    icon,
                    " ",
                    label
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-[13px] leading-relaxed ${isAccent ? "text-indigo-600 font-semibold" : "text-zinc-700 font-normal"}`,
                children: value || "—"
            }, void 0, false, {
                fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/app/(admin)/(teachers)/teachers/add/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c2 = InfoItem;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TeacherProfileDetails");
__turbopack_context__.k.register(_c1, "Section");
__turbopack_context__.k.register(_c2, "InfoItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=bc8bc_hool%20Management%20System_src_app_%28admin%29_%28teachers%29_teachers_add_page_tsx_e9af5ddd._.js.map