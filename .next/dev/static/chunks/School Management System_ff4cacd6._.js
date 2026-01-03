(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/School Management System/libs/axios.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
const api = __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: 'http://localhost:4000'
});
const __TURBOPACK__default__export__ = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RegisterStudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/camera.js [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/libs/axios.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const CLASS_OPTIONS = [
    "JSS 1",
    "JSS 2",
    "JSS 3",
    "SSS 1 (Science)",
    "SSS 1 (Art)",
    "SSS 1 (Commercial)",
    "SSS 2 (Science)",
    "SSS 2 (Art)",
    "SSS 2 (Commercial)",
    "SSS 3 (Science)",
    "SSS 3 (Art)",
    "SSS 3 (Commercial)"
];
const ARM_OPTIONS = Array.from({
    length: 26
}, (_, i)=>String.fromCharCode(65 + i));
const INITIAL_STATE = {
    // Personal
    firstName: "",
    lastName: "",
    assignedClass: "",
    arm: "",
    dob: "",
    gender: "",
    nationality: "Nigerian",
    religion: "",
    address: "",
    city: "",
    bloodGroup: "",
    genotype: "",
    stateOrigin: "",
    lga: "",
    // Guardian
    fatherName: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    guardianOcc: "",
    guardianEmail: ""
};
// --- MEMOIZED COMPONENTS ---
// 1. Modal Preluder Component
const SaveModal = ({ status })=>{
    if (status === 'idle') return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm animate-in fade-in duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center transform transition-all scale-100",
            children: [
                status === 'saving' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                className: "animate-spin text-indigo-600",
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-zinc-900",
                            children: "Saving Record..."
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 47,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-500 text-sm mt-2",
                            children: "Please wait while we enroll the student."
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                status === 'success' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "text-green-600",
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-zinc-900",
                            children: "Registration Complete!"
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-500 text-sm mt-2",
                            children: "The student has been successfully added."
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true),
                status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "text-red-600",
                                size: 32
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-zinc-900",
                            children: "Submission Failed"
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 67,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-zinc-500 text-sm mt-2",
                            children: "Please check your connection and try again."
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SaveModal;
const NavItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(({ label, active, onClick })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `w-full text-left px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${active ? "bg-white border-indigo-600 text-indigo-900 shadow-sm" : "border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50"}`,
        children: label
    }, void 0, false, {
        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = NavItem;
NavItem.displayName = "NavItem";
const SectionHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(({ icon, title, subtitle })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-5 mb-8 pb-6 border-b border-zinc-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100/50",
                children: icon
            }, void 0, false, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 92,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-bold text-zinc-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                        lineNumber: 96,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-zinc-500 mt-1 leading-relaxed",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                        lineNumber: 97,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 95,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
        lineNumber: 91,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = SectionHeader;
SectionHeader.displayName = "SectionHeader";
const InputGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(({ label, name, value, onChange, placeholder, type = "text", required, options, fullWidth, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `space-y-1.5 ${fullWidth ? "md:col-span-2" : ""} ${className || ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "text-xs font-semibold text-zinc-500 uppercase tracking-wider pl-1",
                children: [
                    label,
                    " ",
                    required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: "*"
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                        lineNumber: 110,
                        columnNumber: 30
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative group",
                children: type === "select" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            name: name,
                            value: value,
                            onChange: onChange,
                            className: "w-full px-4 py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all appearance-none cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    disabled: true,
                                    children: [
                                        "Select ",
                                        label
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                options?.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: opt,
                                        children: opt
                                    }, opt, false, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 46
                                    }, ("TURBOPACK compile-time value", void 0)))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 116,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: "absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-indigo-500",
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: type,
                    name: name,
                    value: value,
                    onChange: onChange,
                    placeholder: placeholder,
                    className: "w-full px-4 py-3 rounded-xl bg-zinc-50/50 border border-zinc-200 text-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all placeholder:text-zinc-300"
                }, void 0, false, {
                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = InputGroup;
InputGroup.displayName = "InputGroup";
function RegisterStudent() {
    _s();
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("personal");
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_STATE);
    const [saveStatus, setSaveStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RegisterStudent.useCallback[handleInputChange]": (e)=>{
            const { name, value } = e.target;
            setFormData({
                "RegisterStudent.useCallback[handleInputChange]": (prev)=>({
                        ...prev,
                        [name]: value
                    })
            }["RegisterStudent.useCallback[handleInputChange]"]);
        }
    }["RegisterStudent.useCallback[handleInputChange]"], []);
    async function handleSave() {
        // Trigger the Modal Preluder
        setSaveStatus('saving');
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dob,
            gender: formData.gender,
            nationality: formData.nationality,
            religion: formData.religion,
            address: formData.address,
            stateOfOrigin: formData.stateOrigin,
            lga: formData.lga,
            bloodGroup: formData.bloodGroup,
            genotype: formData.genotype,
            class_id: formData.assignedClass,
            arm: formData.arm,
            fatherName: formData.fatherName,
            fatherPhone: formData.fatherPhone,
            motherName: formData.motherName,
            motherPhone: formData.motherPhone,
            guardianOccupation: formData.guardianOcc,
            guardianEmail: formData.guardianEmail
        };
        // Delay slightly to show the nice loading animation (optional, but looks better)
        await new Promise((r)=>setTimeout(r, 800));
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/students/register", payload);
            console.log("Backend response:", response.data);
            // Update Modal to Success State
            setSaveStatus('success');
            // Close modal and reset form after delay
            setTimeout(()=>{
                setSaveStatus('idle');
                setFormData(INITIAL_STATE);
            }, 2000);
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
            // Update Modal to Error State
            setSaveStatus('error');
            setTimeout(()=>setSaveStatus('idle'), 2500);
        }
    }
    ;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#FDFDFE] text-zinc-900 font-sans selection:bg-indigo-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SaveModal, {
                status: saveStatus
            }, void 0, false, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-zinc-100 px-6 md:px-8 py-4 supports-[backdrop-filter]:bg-white/60",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200",
                                    children: "ES"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                    lineNumber: 217,
                                    columnNumber: 14
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl font-bold text-zinc-900 tracking-tight leading-none",
                                            children: "Enroll System"
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                            lineNumber: 221,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-medium text-zinc-500 pt-1",
                                            children: "New Student Registration"
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                    lineNumber: 220,
                                    columnNumber: 14
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-sm font-semibold text-zinc-500 hover:text-zinc-800 transition-colors",
                                    children: "Discard"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleSave(),
                                    disabled: saveStatus === 'saving',
                                    className: "px-6 py-2.5 bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 rounded-xl shadow-xl shadow-zinc-200",
                                    children: [
                                        saveStatus === 'saving' ? 'Processing...' : 'Save Record',
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                            lineNumber: 232,
                                            columnNumber: 75
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 md:gap-16 p-6 md:p-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "hidden md:block sticky top-32 h-fit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                                        active: activeSection === "personal",
                                        label: "Personal Information",
                                        onClick: ()=>setActiveSection("personal")
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                                        active: activeSection === "guardian",
                                        label: "Guardian Details",
                                        onClick: ()=>setActiveSection("guardian")
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 244,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-10 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-indigo-800 font-medium leading-relaxed",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: "Tip:"
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 15
                                        }, this),
                                        " Ensure the passport photograph is under 2MB and clear."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "min-h-[600px]",
                        children: [
                            activeSection === 'personal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "personal",
                                className: "animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                            lineNumber: 260,
                                            columnNumber: 36
                                        }, void 0),
                                        title: "Personal Details",
                                        subtitle: "Enter the student's legal name and biological information used for official records."
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col-reverse md:flex-row gap-10 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "First Name",
                                                        name: "firstName",
                                                        placeholder: "e.g. Daniel",
                                                        required: true,
                                                        value: formData.firstName,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Last Name",
                                                        name: "lastName",
                                                        placeholder: "e.g. Adebayo",
                                                        required: true,
                                                        value: formData.lastName,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 265,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2 grid grid-cols-3 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "col-span-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                                    label: "Class",
                                                                    name: "assignedClass",
                                                                    type: "select",
                                                                    options: CLASS_OPTIONS,
                                                                    required: true,
                                                                    value: formData.assignedClass,
                                                                    onChange: handleInputChange
                                                                }, void 0, false, {
                                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                    lineNumber: 270,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 22
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "col-span-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                                    label: "Arm",
                                                                    name: "arm",
                                                                    type: "select",
                                                                    options: ARM_OPTIONS,
                                                                    required: true,
                                                                    value: formData.arm,
                                                                    onChange: handleInputChange
                                                                }, void 0, false, {
                                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                    lineNumber: 273,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 22
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 268,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Gender",
                                                        name: "gender",
                                                        type: "select",
                                                        options: [
                                                            "Male",
                                                            "Female"
                                                        ],
                                                        value: formData.gender,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Date of Birth",
                                                        name: "dob",
                                                        type: "date",
                                                        required: true,
                                                        value: formData.dob,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 263,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full md:w-auto flex flex-col items-center md:items-start",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2",
                                                        children: "Passport"
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 283,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-32 h-32 md:w-40 md:h-40 bg-white border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 group hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer shadow-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "p-3 bg-zinc-50 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"], {
                                                                    size: 20
                                                                }, void 0, false, {
                                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                    lineNumber: 286,
                                                                    columnNumber: 24
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] mt-2 font-semibold uppercase tracking-wide",
                                                                children: "Upload"
                                                            }, void 0, false, {
                                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                lineNumber: 288,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                label: "Residential Address",
                                                name: "address",
                                                placeholder: "Street number, Area, City...",
                                                required: true,
                                                value: formData.address,
                                                onChange: handleInputChange,
                                                fullWidth: true
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-zinc-50/80 border border-zinc-100 rounded-2xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Blood Group",
                                                        name: "bloodGroup",
                                                        placeholder: "O+",
                                                        value: formData.bloodGroup,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Genotype",
                                                        name: "genotype",
                                                        placeholder: "AA",
                                                        value: formData.genotype,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Origin State",
                                                        name: "stateOrigin",
                                                        placeholder: "Lagos",
                                                        value: formData.stateOrigin,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "LGA",
                                                        name: "lga",
                                                        placeholder: "Ikeja",
                                                        value: formData.lga,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                label: "Religion",
                                                name: "religion",
                                                placeholder: "e.g. Christianity",
                                                value: formData.religion,
                                                onChange: handleInputChange
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 259,
                                columnNumber: 13
                            }, this),
                            activeSection === 'guardian' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                id: "guardian",
                                className: "animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            size: 24
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 36
                                        }, void 0),
                                        title: "Guardian Units",
                                        subtitle: "Emergency contacts and sponsor details."
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2 pb-2 border-b border-zinc-100 mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-bold text-zinc-900 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 rounded-full bg-blue-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                    lineNumber: 325,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " Father's Details"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 24
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Full Name",
                                                        name: "fatherName",
                                                        placeholder: "",
                                                        value: formData.fatherName,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Phone Number",
                                                        name: "fatherPhone",
                                                        placeholder: "+234...",
                                                        value: formData.fatherPhone,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "md:col-span-2 pb-2 border-b border-zinc-100 mb-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-sm font-bold text-zinc-900 flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-2 h-2 rounded-full bg-pink-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                                    lineNumber: 335,
                                                                    columnNumber: 27
                                                                }, this),
                                                                " Mother's Details"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                            lineNumber: 334,
                                                            columnNumber: 24
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Full Name",
                                                        name: "motherName",
                                                        placeholder: "",
                                                        value: formData.motherName,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 338,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Phone Number",
                                                        name: "motherPhone",
                                                        placeholder: "+234...",
                                                        value: formData.motherPhone,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 339,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 332,
                                                columnNumber: 18
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Guardian Occupation",
                                                        name: "guardianOcc",
                                                        placeholder: "e.g. Civil Servant",
                                                        value: formData.guardianOcc,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputGroup, {
                                                        label: "Guardian Email",
                                                        name: "guardianEmail",
                                                        placeholder: "example@email.com",
                                                        value: formData.guardianEmail,
                                                        onChange: handleInputChange
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 18
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
                lineNumber: 238,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/add/page.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s(RegisterStudent, "NbqeUdI/sA+tnlGlaPMJJdKDuRs=");
_c4 = RegisterStudent;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SaveModal");
__turbopack_context__.k.register(_c1, "NavItem");
__turbopack_context__.k.register(_c2, "SectionHeader");
__turbopack_context__.k.register(_c3, "InputGroup");
__turbopack_context__.k.register(_c4, "RegisterStudent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=School%20Management%20System_ff4cacd6._.js.map