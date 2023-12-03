"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var react_1 = require("react");
var Icons_1 = require("./Icons");
var button_1 = require("./ui/button");
var Navbar = function () {
    // const session = await getAuthSession();
    return (react_1["default"].createElement("div", { className: "fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300\r\n    z-[10] py-2" },
        react_1["default"].createElement("div", { className: "container max-w-7xl h-full mx-auto flex items-center justify-between gap-2" },
            react_1["default"].createElement(link_1["default"], { href: "/", className: "flex gap-2 items-center" },
                react_1["default"].createElement(Icons_1.Icons.logo, { className: "h-8 w-8 sm:h-6 sm:w-6" }),
                react_1["default"].createElement("p", { className: "hidden text-zinc-700 text-sm font-medium md:block" }, "Sleek Shelf")),
            react_1["default"].createElement(link_1["default"], { href: "sign-in", className: button_1.buttonVariants() }, "Sign In"))));
};
exports["default"] = Navbar;
