"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
var Icons_1 = require("./Icons");
var UserAuthForm_1 = require("./UserAuthForm");
var SignIn = function (_a) {
    return (React.createElement("div", { className: "container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]" },
        React.createElement("div", { className: "flex flex-col space-y-2 text-center" },
            React.createElement(Icons_1.Icons.logo, { className: "mx-auto h-6 w-6" }),
            React.createElement("h1", { className: "text-2xl font-semibold tracking-tight " }, "Welcome back"),
            React.createElement("p", { className: "text-sm max-w-xs mx-auto" }, "By continuing you are setting up a Sleek Shelf account and agree to our User Agreement and Privacy Policy."),
            React.createElement(UserAuthForm_1["default"], null),
            React.createElement("p", { className: "px-8 text-center text-sm text-zinc-700 " },
                "New to Sleek Shelf?",
                React.createElement(link_1["default"], { href: "/sign-up", className: "hover:text-zinc-800 text-sm underline-offset-4 underline" }, "Sign Up")))));
};
exports["default"] = SignIn;
