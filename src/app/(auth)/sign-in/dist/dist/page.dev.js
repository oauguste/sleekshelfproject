"use strict";

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.__esModule = true;

var SignIn_1 = require("@/components/SignIn");

var button_1 = require("@/components/ui/button");

var utils_1 = require("@/lib/utils");

var link_1 = require("next/link");

var page = function page() {
  return _react["default"].createElement("div", {
    className: "absolute inset-0"
  }, _react["default"].createElement("div", {
    className: "h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20"
  }, _react["default"].createElement(link_1["default"], {
    href: "/",
    className: utils_1.cn(button_1.buttonVariants({
      variant: "ghost"
    }), "self-start -mt-20 ")
  }, "Home"), _react["default"].createElement(SignIn_1["default"], null)));
};

exports["default"] = page;