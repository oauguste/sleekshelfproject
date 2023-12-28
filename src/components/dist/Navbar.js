"use client";
"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var Icons_1 = require("./Icons");
var button_1 = require("./ui/button");
var react_2 = require("next-auth/react");
var UserAccountNav_1 = require("./UserAccountNav");
var react_3 = require("next-auth/react");
var Navbar = function () {
    var _a = react_2.useSession(), session = _a.data, status = _a.status;
    return (react_1["default"].createElement(react_3.SessionProvider, null,
        react_1["default"].createElement("div", { className: "fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2" },
            react_1["default"].createElement("div", { className: "container max-w-7xl h-full mx-auto flex items-center justify-between gap-2" },
                react_1["default"].createElement(link_1["default"], { href: "/", className: "flex gap-2 items-center" },
                    react_1["default"].createElement(Icons_1.Icons.logo, { className: "h-8 w-8 sm:h-6 sm:w-6" }),
                    react_1["default"].createElement("p", { className: "hidden text-zinc-700 text-sm font-medium md:block" }, "Sleek Shelf")),
                (session === null || session === void 0 ? void 0 : session.user) ? (react_1["default"].createElement(UserAccountNav_1["default"], { user: session.user, id: session.user.email })) : (react_1["default"].createElement(link_1["default"], { href: "/sign-in", className: button_1.buttonVariants() }, "Sign In"))))));
};
exports["default"] = Navbar;
