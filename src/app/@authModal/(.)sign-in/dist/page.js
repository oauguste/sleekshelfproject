"use strict";
exports.__esModule = true;
var CloseModal_1 = require("@/components/CloseModal");
var SignIn_1 = require("@/components/SignIn");
var react_1 = require("react");
var page = function () {
    return (react_1["default"].createElement("div", { className: "fixed inset-0 bg-zinc-900/20 z-10" },
        react_1["default"].createElement("div", { className: "container flex items-center h-full max-w-lg mx-auto" },
            react_1["default"].createElement("div", { className: "relative bg-white w-full h-fit py-20 px-2 rounded-lg" },
                react_1["default"].createElement("div", { className: "absolute top-4 right-4" },
                    react_1["default"].createElement(CloseModal_1["default"], null)),
                react_1["default"].createElement(SignIn_1["default"], null)))));
};
exports["default"] = page;
