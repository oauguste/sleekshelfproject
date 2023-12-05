"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var DropdownMenu_1 = require("./ui/DropdownMenu");
var UserAvatar_1 = require("./UserAvatar");
var link_1 = require("next/link");
var react_2 = require("next-auth/react");
var UserAccountNav = function (_a) {
    var user = _a.user;
    return (react_1["default"].createElement(DropdownMenu_1.DropdownMenu, null,
        react_1["default"].createElement(DropdownMenu_1.DropdownMenuTrigger, null,
            react_1["default"].createElement(UserAvatar_1["default"], { className: "h-8 w-8", user: {
                    name: user.name || null,
                    image: user.image || null
                } })),
        react_1["default"].createElement(DropdownMenu_1.DropdownMenuContent, { className: "bg-white", align: "end" },
            react_1["default"].createElement("div", { className: "flex items-center justify-start gap-2 p-2" },
                react_1["default"].createElement("div", { className: "flex flex-col space-y-1 leading-none" },
                    user.name && (react_1["default"].createElement("p", { className: " font-medium" }, user.name)),
                    user.email && (react_1["default"].createElement("p", { className: "w-[200px] truncate text-sm text-zinc-700" }, user.email)))),
            react_1["default"].createElement(DropdownMenu_1.DropdownMenuSeparator, null),
            react_1["default"].createElement(DropdownMenu_1.DropdownMenuItem, { asChild: true },
                react_1["default"].createElement(link_1["default"], { href: "/" }, "Profile")),
            react_1["default"].createElement(DropdownMenu_1.DropdownMenuItem, { asChild: true },
                react_1["default"].createElement(link_1["default"], { href: "/l/user/lists" }, "My Lists")),
            react_1["default"].createElement(DropdownMenu_1.DropdownMenuItem, { asChild: true },
                react_1["default"].createElement(link_1["default"], { href: "/settings" }, "Account Settings")),
            react_1["default"].createElement(DropdownMenu_1.DropdownMenuSeparator, null),
            react_1["default"].createElement(DropdownMenu_1.DropdownMenuItem, { className: "cursor-pointer", onSelect: function (event) {
                    event.preventDefault();
                    react_2.signOut({
                        callbackUrl: window.location.origin + "/signin"
                    });
                } },
                react_1["default"].createElement(link_1["default"], { href: "/signout" }, "Sign out")))));
};
exports["default"] = UserAccountNav;
