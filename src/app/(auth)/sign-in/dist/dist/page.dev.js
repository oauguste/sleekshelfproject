"use strict";

exports.__esModule = true; // import React from "react";

var SignIn_1 = require("@/components/SignIn");

var button_1 = require("@/components/ui/button");

var utils_1 = require("@/lib/utils");

var link_1 = require("next/link");

var page = function page() {
  return React.createElement("div", {
    className: "absolute inset-0"
  }, React.createElement("div", {
    className: "h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20"
  }, React.createElement(link_1["default"], {
    href: "/",
    className: utils_1.cn(button_1.buttonVariants({
      variant: "ghost"
    }), "self-start -mt-20 ")
  }, "Home"), React.createElement(SignIn_1["default"], null)));
};

exports["default"] = page;