"use strict";
exports.__esModule = true;
exports.metadata = void 0;
// import { Inter } from "next/font/google";
require("@/styles/globals.css");
var Navbar_1 = require("@/components/Navbar");
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var Toaster_1 = require("@/components/ui/Toaster");
var Providers_1 = require("@/components/Providers");
var ProfileCompletionCheck_1 = require("@/components/ProfileCompletionCheck");
// const inter = Inter({ subsets: ["latin"] });
exports.metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};
function RootLayout(_a) {
    var children = _a.children, authModal = _a.authModal;
    return (react_1["default"].createElement("html", { lang: "en", className: utils_1.cn("bg-white text-slate-900 antialiased light"
        // inter.className
        ) },
        react_1["default"].createElement("body", { className: "min-h-screen pt-12 bg-slate-50 antialiased" },
            react_1["default"].createElement(Providers_1["default"], null,
                react_1["default"].createElement(ProfileCompletionCheck_1["default"], null),
                react_1["default"].createElement(Navbar_1["default"], null),
                authModal,
                react_1["default"].createElement("div", { className: "container max-w-7xl mx-auto h-full pt-12" }, children)),
            react_1["default"].createElement(Toaster_1.Toaster, null))));
}
exports["default"] = RootLayout;
