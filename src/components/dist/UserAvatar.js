"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var Avatar_1 = require("./ui/Avatar");
var image_1 = require("next/image");
var Icons_1 = require("./Icons");
var UserAvatar = function (_a) {
    var user = _a.user, props = __rest(_a, ["user"]);
    return (React.createElement(Avatar_1.Avatar, __assign({}, props), (user === null || user === void 0 ? void 0 : user.image) ? (React.createElement("div", { className: "relative aspect-square h-full w-full" },
        React.createElement(image_1["default"], { fill: true, src: user.image, alt: "profile picture", referrerPolicy: "no-referrer" }))) : (React.createElement(Avatar_1.AvatarFallback, null,
        React.createElement("span", { className: "sr-only" }, user === null || user === void 0 ? void 0 : user.name),
        React.createElement(Icons_1.Icons.user, { className: "h-4 w-4" })))));
};
exports["default"] = UserAvatar;
