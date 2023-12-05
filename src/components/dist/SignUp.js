"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var Icons_1 = require("./Icons");
var UserAuthForm_1 = require("./UserAuthForm");
var react_1 = require("react");
var SignUp = function () {
    return (react_1["default"].createElement("div", { className: "container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]" },
        react_1["default"].createElement("div", { className: "flex flex-col space-y-2 text-center" },
            react_1["default"].createElement(Icons_1.Icons.logo, { className: "mx-auto h-6 w-6" }),
            react_1["default"].createElement("h1", { className: "text-2xl font-semibold tracking-tight " }, "Sign Up"),
            react_1["default"].createElement("p", { className: "text-sm max-w-xs mx-auto" }, "By continuing you are setting up a Sleek Shelf account and agree to our User Agreement and Privacy Policy."),
            react_1["default"].createElement(UserAuthForm_1["default"], null),
            react_1["default"].createElement("p", { className: "px-8 text-center text-sm text-zinc-700 " },
                "Already have an account?",
                react_1["default"].createElement(link_1["default"], { href: "/sign-in", className: "hover:text-zinc-800 text-sm underline-offset-4 underline" }, "Sign In")))));
};
exports["default"] = SignUp;
