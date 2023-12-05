"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var button_1 = require("./ui/button");
var lucide_react_1 = require("lucide-react");
var navigation_1 = require("next/navigation");
var CloseModal = function (_a) {
    var router = navigation_1.useRouter();
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(button_1.Button, { onClick: function () { return router.back(); }, "aria-label": "close modal", variant: "ghost", className: "h-6 w-6 p-0 rounded-md" },
            react_1["default"].createElement(lucide_react_1.X, { className: "h-4 w-4" }))));
};
exports["default"] = CloseModal;
