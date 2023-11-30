"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Toaster = void 0;
var Toast_1 = require("@/components/ui/Toast");
var use_toast_1 = require("@/hooks/use-toast");
function Toaster() {
    var toasts = use_toast_1.useToast().toasts;
    return (React.createElement(Toast_1.ToastProvider, null,
        toasts.map(function (_a) {
            var id = _a.id, title = _a.title, description = _a.description, action = _a.action, props = __rest(_a, ["id", "title", "description", "action"]);
            return (React.createElement(Toast_1.Toast, __assign({ key: id }, props),
                React.createElement("div", { className: "grid gap-1" },
                    title && React.createElement(Toast_1.ToastTitle, null, title),
                    description && (React.createElement(Toast_1.ToastDescription, null, description))),
                action,
                React.createElement(Toast_1.ToastClose, null)));
        }),
        React.createElement(Toast_1.ToastViewport, null)));
}
exports.Toaster = Toaster;
