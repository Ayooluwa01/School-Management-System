(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/School Management System/src/components/form/input/InputField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Input = ({ type = "text", id, name, placeholder, defaultValue, onChange, className = "", min, max, step, disabled = false, success = false, error = false, hint })=>{
    // Determine input styles based on state (disabled, success, error)
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;
    // Add styles for the different states
    if (disabled) {
        inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
    } else if (success) {
        inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
    } else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                id: id,
                name: name,
                placeholder: placeholder,
                defaultValue: defaultValue,
                onChange: onChange,
                min: min,
                max: max,
                step: step,
                disabled: disabled,
                className: inputClasses
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/form/input/InputField.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `mt-1.5 text-xs ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500"}`,
                children: hint
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/form/input/InputField.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/components/form/input/InputField.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Input;
const __TURBOPACK__default__export__ = Input;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/components/form/Label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
const Label = ({ htmlFor, children, className })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: htmlFor,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])(// Default classes that apply by default
        "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400", // User-defined className that can override the default margin
        className),
        children: children
    }, void 0, false, {
        fileName: "[project]/School Management System/src/components/form/Label.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Label;
const __TURBOPACK__default__export__ = Label;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/components/ui/button/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const Button = ({ children, size = "md", variant = "primary", startIcon, endIcon, onClick, className = "", disabled = false })=>{
    // Size Classes
    const sizeClasses = {
        sm: "px-4 py-3 text-sm",
        md: "px-5 py-3.5 text-sm"
    };
    // Variant Classes
    const variantClasses = {
        primary: "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
        outline: "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: `inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`,
        onClick: onClick,
        disabled: disabled,
        children: [
            startIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center",
                children: startIcon
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/ui/button/Button.tsx",
                lineNumber: 48,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            children,
            endIcon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex items-center",
                children: endIcon
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/ui/button/Button.tsx",
                lineNumber: 50,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/components/ui/button/Button.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Button;
const __TURBOPACK__default__export__ = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/components/ui/modal/index.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const Modal = ({ isOpen, onClose, children, className, showCloseButton = true, isFullscreen = false })=>{
    _s();
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            const handleEscape = {
                "Modal.useEffect.handleEscape": (event)=>{
                    if (event.key === "Escape") {
                        onClose();
                    }
                }
            }["Modal.useEffect.handleEscape"];
            if (isOpen) {
                document.addEventListener("keydown", handleEscape);
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.removeEventListener("keydown", handleEscape);
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        isOpen,
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "unset";
            }
            return ({
                "Modal.useEffect": ()=>{
                    document.body.style.overflow = "unset";
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        isOpen
    ]);
    if (!isOpen) return null;
    const contentClasses = isFullscreen ? "w-full h-full" : "relative w-full rounded-3xl bg-white  dark:bg-gray-900";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999",
        children: [
            !isFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: modalRef,
                className: `${contentClasses}  ${className}`,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                                d: "M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
                            lineNumber: 75,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/components/ui/modal/index.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Modal, "Hfgks34jZ8gGGjujuH3DNi1cOoA=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/hooks/useModal.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useModal",
    ()=>useModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
const useModal = (initialState = false)=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const openModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useModal.useCallback[openModal]": ()=>setIsOpen(true)
    }["useModal.useCallback[openModal]"], []);
    const closeModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useModal.useCallback[closeModal]": ()=>setIsOpen(false)
    }["useModal.useCallback[closeModal]"], []);
    const toggleModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useModal.useCallback[toggleModal]": ()=>setIsOpen({
                "useModal.useCallback[toggleModal]": (prev)=>!prev
            }["useModal.useCallback[toggleModal]"])
    }["useModal.useCallback[toggleModal]"], []);
    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
};
_s(useModal, "csqedsyBbrmox+qB/JtdaMGyNFE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/zustand/Activestudent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Activestudent",
    ()=>Activestudent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
const Activestudent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])(_c = (set, get)=>({
        student_id: 0,
        admission_no: '',
        name: '',
        sex: '',
        date_of_birth: '',
        class_id: 0,
        setstudent_id: (value)=>set({
                student_id: value
            }),
        setadmission_no: (value)=>set({
                admission_no: value
            }),
        setname: (value)=>set({
                name: value
            }),
        setsex: (value)=>set({
                sex: value
            }),
        setdob: (value)=>set({
                date_of_birth: value
            }),
        setclass_id: (value)=>set({
                class_id: value
            })
    }));
_c1 = Activestudent;
var _c, _c1;
__turbopack_context__.k.register(_c, "Activestudent$create");
__turbopack_context__.k.register(_c1, "Activestudent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/libs/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Backend",
    ()=>Backend,
    "Fetch",
    ()=>Fetch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$stream$2d$http$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/stream-http/index.js [app-client] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:4000");
async function Fetch(endpoint) {
    const res = await fetch(`${API_URL}/${endpoint}`, {
        cache: 'no-store'
    });
    if (!res.ok) throw new Error(`API request failed with status ${res.status}`);
    const data = await res.json();
    const count = Number(res.headers.get("X-Total-Count") ?? (Array.isArray(data) ? data.length : 1));
    return {
        data,
        count
    };
}
_c = Fetch;
async function Backend(endpoint) {
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$stream$2d$http$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(`http://localhost:5050/${endpoint}`);
}
_c1 = Backend;
var _c, _c1;
__turbopack_context__.k.register(_c, "Fetch");
__turbopack_context__.k.register(_c1, "Backend");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/components/common/Reusables/Lists.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "List",
    ()=>List
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/components/form/input/InputField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/components/form/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/components/ui/button/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$ui$2f$modal$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/components/ui/modal/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/hooks/useModal.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$zustand$2f$Activestudent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/zustand/Activestudent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/libs/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function List({ currentStudents, handleDelete, currentPage, setCurrentPage, totalPages, totalCount, startIndex, endIndex }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isOpen, openModal, closeModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"])();
    const { student_id, admission_no, name, sex, date_of_birth, class_id, setadmission_no, setclass_id, setstudent_id, setname, setsex, setdob } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$zustand$2f$Activestudent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Activestudent"])();
    async function Toggleedit(student) {
        try {
            setname(student.name);
            setadmission_no(student.admission_no);
            setstudent_id(student.student_id);
            setsex(student.sex);
            setdob(student.date_of_birth);
            setclass_id(student.clas_id);
            openModal();
        } catch (error) {}
    }
    // 
    async function connectBackend() {
        const backend = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Backend"])(`school/${student_id}`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        className: "bg-gray-100 text-gray-600 uppercase",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3",
                                    children: "Admission No"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3",
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3",
                                    children: "Class"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-center",
                                    children: "Sex"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-4 py-3 text-center",
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 71,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "divide-y",
                        children: currentStudents.map((student)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "hover:bg-gray-50 transition cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3",
                                        children: student.admission_no
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 font-medium",
                                        onClick: ()=>router.push(`/students/profile/${student.student_id}`),
                                        children: student.name
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3",
                                        children: student.class_id
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `px-3 py-1 rounded-full text-xs font-medium
                  ${student.sex === "Male" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`,
                                            children: student.sex
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-4 py-3 text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-gray-500 hover:text-blue-600",
                                                    onClick: ()=>Toggleedit(student),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 21
                                                    }, this)
                                                }, student.clas_id, false, {
                                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDelete(student.student_id),
                                                    className: "text-gray-500 hover:text-red-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                        lineNumber: 116,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, student.student_id, true, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t bg-gray-50",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600",
                        children: [
                            "Showing ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: startIndex + 1
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 130,
                                columnNumber: 19
                            }, this),
                            " to",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: Math.min(endIndex, totalCount)
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            " of",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: totalCount
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            " students"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: currentPage === 1,
                                onClick: ()=>setCurrentPage(currentPage - 1),
                                className: "p-2 rounded border disabled:opacity-40 hover:bg-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-3 text-sm font-medium",
                                children: [
                                    "Page ",
                                    currentPage,
                                    " of ",
                                    totalPages
                                ]
                            }, void 0, true, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: currentPage === totalPages,
                                onClick: ()=>setCurrentPage(currentPage + 1),
                                className: "p-2 rounded border disabled:opacity-40 hover:bg-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                    lineNumber: 154,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$ui$2f$modal$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                isOpen: isOpen,
                onClose: closeModal,
                className: "max-w-[700px] m-4 p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6",
                                children: "Personal Information"
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 162,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 168,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "text",
                                                defaultValue: name
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 169,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 167,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 lg:col-span-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: "DOB"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 173,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "text",
                                                defaultValue: date_of_birth
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 174,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 172,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 lg:col-span-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: "Address"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 178,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "text",
                                                defaultValue: "randomuser@pimjo.com"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 179,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 177,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-2 lg:col-span-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: "Parent Number"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 183,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "text",
                                                defaultValue: "+09 363 398 46"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 184,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 182,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                children: "Admission Number"
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$form$2f$input$2f$InputField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                type: "text",
                                                defaultValue: admission_no,
                                                disabled: true
                                            }, void 0, false, {
                                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                                lineNumber: 189,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                        lineNumber: 187,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 166,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                        lineNumber: 161,
                        columnNumber: 2
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 px-2 mt-6 lg:justify-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: "sm",
                                variant: "outline",
                                onClick: closeModal,
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 195,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$ui$2f$button$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                size: "sm",
                                onClick: ()=>connectBackend(),
                                children: "Save Changes"
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                                lineNumber: 198,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                        lineNumber: 194,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/components/common/Reusables/Lists.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(List, "dBVKOfyVf2xdtdDPFtaGvcC+/cQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$hooks$2f$useModal$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useModal"]
    ];
});
_c = List;
var _c;
__turbopack_context__.k.register(_c, "List");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/components/common/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToastProvider",
    ()=>ToastProvider,
    "notify",
    ()=>notify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/react-toastify/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
"use client";
;
;
;
const CustomToast = ({ title, message, type = "info", onRetry, closeToast })=>{
    const iconMap = {
        success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
            className: "text-emerald-500",
            size: 20
        }, void 0, false, {
            fileName: "[project]/School Management System/src/components/common/Toast.tsx",
            lineNumber: 15,
            columnNumber: 14
        }, ("TURBOPACK compile-time value", void 0)),
        error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
            className: "text-red-500",
            size: 20
        }, void 0, false, {
            fileName: "[project]/School Management System/src/components/common/Toast.tsx",
            lineNumber: 16,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0)),
        info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            className: "text-indigo-500",
            size: 20
        }, void 0, false, {
            fileName: "[project]/School Management System/src/components/common/Toast.tsx",
            lineNumber: 17,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-start gap-4 p-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-0.5",
                children: iconMap[type]
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-sm font-bold text-zinc-800 leading-none mb-1",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-zinc-500 leading-relaxed",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 mt-3",
                        children: [
                            onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    onRetry();
                                },
                                className: "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 hover:text-indigo-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Retry"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: closeToast,
                                className: "text-[10px] font-black uppercase tracking-wider text-zinc-400 hover:text-zinc-600",
                                children: "Dismiss"
                            }, void 0, false, {
                                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/School Management System/src/components/common/Toast.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = CustomToast;
const notify = {
    success: (title, message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(({ closeToast })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomToast, {
                type: "success",
                title: title,
                message: message,
                closeToast: closeToast
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))),
    error: (title, message, onRetry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(({ closeToast })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomToast, {
                type: "error",
                title: title,
                message: message,
                onRetry: onRetry,
                closeToast: closeToast
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))),
    info: (title, message)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(({ closeToast })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomToast, {
                type: "info",
                title: title,
                message: message,
                closeToast: closeToast
            }, void 0, false, {
                fileName: "[project]/School Management System/src/components/common/Toast.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)))
};
function ToastProvider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$react$2d$toastify$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastContainer"], {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        newestOnTop: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        toastClassName: ()=>"relative flex p-4 mb-4 min-h-10 z-50 rounded-2xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/50 cursor-default overflow-hidden",
        className: ()=>"text-sm font-white block p-0 w-full",
        closeButton: false
    }, void 0, false, {
        fileName: "[project]/School Management System/src/components/common/Toast.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c1 = ToastProvider;
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomToast");
__turbopack_context__.k.register(_c1, "ToastProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Allstudents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$wide$2d$narrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownWideNarrow$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/arrow-down-wide-narrow.js [app-client] (ecmascript) <export default as ArrowDownWideNarrow>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/School Management System/node_modules/lucide-react/dist/esm/icons/funnel.js [app-client] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$common$2f$Reusables$2f$Lists$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/components/common/Reusables/Lists.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/libs/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$common$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/School Management System/src/components/common/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Allstudents() {
    _s();
    const [students, setStudents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedClass, setSelectedClass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [selectedSex, setSelectedSex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [classes, setClasses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [totalCount, setTotalCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    /* -------------------------------------------------------------------------- */ /*                            Fetch STUDENTS (API)                             */ /* -------------------------------------------------------------------------- */ async function getStudents() {
        try {
            const offset = (currentPage - 1) * itemsPerPage;
            // Base URL with pagination
            let url = `student?_start=${offset}&_limit=${itemsPerPage}`;
            // Conditionally add filters
            if (selectedClass && selectedClass !== "All") {
                url += `&class_id=${selectedClass}`;
            }
            if (selectedSex && selectedSex !== "All") {
                url += `&sex=${selectedSex}`;
            }
            if (searchTerm) {
                url += `&q=${searchTerm}`;
            }
            const student = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fetch"])(url);
            setStudents(student.data);
            setTotalCount(3000);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    /* -------------------------------------------------------------------------- */ /*                            Fetch CLASSES (API)                              */ /* -------------------------------------------------------------------------- */ async function getClasses() {
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$libs$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fetch"])("class");
            setClasses(res.data);
            console.log(classes);
        } catch (error) {
            console.error("Classes error:", error);
        }
    }
    /* -------------------------------------------------------------------------- */ /*                        EFFECT: Runs ONLY when needed                       */ /* -------------------------------------------------------------------------- */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Allstudents.useEffect": ()=>{
            getClasses(); // run once
            getStudents();
        }
    }["Allstudents.useEffect"], [
        currentPage,
        selectedClass,
        selectedSex,
        searchTerm
    ]);
    /* ---------------- DELETE HANDLER ---------------- */ const handleDelete = (id)=>{
        setStudents((prev)=>prev.filter((s)=>s.student_id !== id));
    };
    const classOptions = [
        "All",
        ...Array.from(new Set(classes.map((c)=>c.class_id)))
    ];
    __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$common$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notify"].success("Record Saved", "Student registration has been finalized.");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-6xl mx-auto antialiased",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5 bg-white border-b border-gray-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group flex-grow max-w-md",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors"
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search by name or admission ID...",
                                    className: "w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all",
                                    onChange: (e)=>{
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-gray-400 pr-2 border-r border-gray-100 mr-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold uppercase tracking-wider",
                                            children: "Filters"
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all",
                                            value: selectedClass,
                                            onChange: (e)=>{
                                                setSelectedClass(e.target.value);
                                                setCurrentPage(1);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "All",
                                                    children: "All Classes"
                                                }, void 0, false, {
                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 17
                                                }, this),
                                                classOptions.filter((c)=>c !== "All").map((cls)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: cls,
                                                        children: cls
                                                    }, cls, false, {
                                                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$wide$2d$narrow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownWideNarrow$3e$__["ArrowDownWideNarrow"], {
                                            className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 cursor-pointer transition-all",
                                            value: selectedSex,
                                            onChange: (e)=>{
                                                setSelectedSex(e.target.value);
                                                setCurrentPage(1);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "All",
                                                    children: "All Genders"
                                                }, void 0, false, {
                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Male",
                                                    children: "Male"
                                                }, void 0, false, {
                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "Female",
                                                    children: "Female"
                                                }, void 0, false, {
                                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                            className: "absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-[400px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$School__Management__System$2f$src$2f$components$2f$common$2f$Reusables$2f$Lists$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
                        currentStudents: students,
                        handleDelete: handleDelete,
                        currentPage: currentPage,
                        setCurrentPage: setCurrentPage,
                        totalPages: totalPages,
                        totalCount: totalCount,
                        startIndex: 1,
                        endIndex: 2
                    }, void 0, false, {
                        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/School Management System/src/app/(admin)/(Students)/students/allstudents/page.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(Allstudents, "7FL8uGptzppb3lgK7Z+rltmQ/Sc=");
_c = Allstudents;
var _c;
__turbopack_context__.k.register(_c, "Allstudents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=School%20Management%20System_24be6f00._.js.map