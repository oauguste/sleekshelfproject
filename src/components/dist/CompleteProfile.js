// pages/complete-profile.tsx
"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("next/router");
var SessionContext_1 = require("@/lib/SessionContext");
var userRepository_1 = require("@/repositories/userRepository");
var CompleteProfile = function () {
    var _a, _b;
    var _c = react_1.useState({}), profileData = _c[0], setProfileData = _c[1]; // Define the type according to your user model
    var session = SessionContext_1.useSessionContext().session;
    var router = router_1.useRouter();
    var _d = react_1.useState(""), username = _d[0], setUsername = _d[1];
    var email = ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email) || ""; // From session
    var premiumStatus = "free"; // Default status
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    newUser = {
                        username: username,
                        email: email,
                        premium_status: premiumStatus,
                        created_at: new Date().toISOString(),
                        password_hash: ""
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository_1.createUser(newUser)];
                case 2:
                    _b.sent();
                    // Redirect or handle response
                    router.push("/profile"); // Example redirect
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Failed to create user:", error_1);
                    return [3 /*break*/, 4];
                case 4:
                    if (!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email)) return [3 /*break*/, 6];
                    return [4 /*yield*/, userRepository_1.updateUserEmail(session.user.email, {
                            username: username
                        })];
                case 5:
                    _b.sent();
                    router.push("/some-redirect-path");
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    if (!((_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.needsProfileCompletion)) {
        router.push("/");
        return null;
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Complete Your Profile"),
        react_1["default"].createElement("form", { onSubmit: handleSubmit },
            react_1["default"].createElement("input", { type: "text", value: username, onChange: function (e) { return setUsername(e.target.value); }, placeholder: "Enter your username", required: true }),
            react_1["default"].createElement("p", null,
                "Email: ",
                email),
            react_1["default"].createElement("button", { type: "submit" }, "Submit"))));
};
exports["default"] = CompleteProfile;
