"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var SignUp_1 = require("@/components/SignUp");
var page = function () {
    return (react_1["default"].createElement("div", { className: "absolute inset-0" },
        react_1["default"].createElement("div", { className: "h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20" },
            react_1["default"].createElement(link_1["default"], { href: "/", className: utils_1.cn(button_1.buttonVariants({ variant: "ghost" }), "self-start -mt-20 ") },
                react_1["default"].createElement(lucide_react_1.ChevronLeft, { className: "mr-2 h-4 w-4" }),
                "Home"),
            react_1["default"].createElement(SignUp_1["default"], null))));
};
exports["default"] = page;
