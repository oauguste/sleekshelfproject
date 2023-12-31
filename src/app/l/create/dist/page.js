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
var Input_1 = require("@/components/ui/Input");
var button_1 = require("@/components/ui/button");
var react_query_1 = require("@tanstack/react-query");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var axios_1 = require("axios");
var Page = function () {
    var router = navigation_1.useRouter();
    var _a = react_1.useState(""), title = _a[0], setTitle = _a[1];
    var _b = react_1.useState(""), description = _b[0], setDescription = _b[1];
    // const [istemplate, setIsTemplate] = useState(false);
    // const [id, setId] = useState(0);
    // const [userId, setUserId] = useState(0);
    // const [date, setDate] = useState("");
    var _c = react_query_1.useMutation({
        mutationFn: function () { return __awaiter(void 0, void 0, void 0, function () {
            var payload, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = { title: title, description: description };
                        return [4 /*yield*/, axios_1["default"].post("/lists", payload)];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, data];
                }
            });
        }); },
        onSuccess: function () {
            // Handle success (e.g., redirecting to a confirmation page or displaying a success message)
            console.log("List created");
        },
        onError: function () {
            // Handle error
            console.log("List not created");
        }
    }), createList = _c.mutate, isPending = _c.isPending;
    return (React.createElement("div", { className: "container flex items-center h-full max-w-3xl mx-auto" },
        React.createElement("div", { className: "relative bg-white w-full h-fit p-4 rounded-lg space-y-6" },
            React.createElement("div", { className: "flex justify-between items-center" },
                React.createElement("h1", { className: "text-xl font-semibold" }, "Create a list")),
            React.createElement("hr", { className: " bg-zinc-500 h-px" }),
            React.createElement("div", null,
                React.createElement("p", { className: "text-lg font-medium " }, "name"),
                React.createElement("p", { className: " text-xs pb-2" }, "List names cannot be changed"),
                React.createElement("div", { className: " relative" },
                    React.createElement(Input_1.Input, { placeholder: "name", value: title, onChange: function (e) { return setTitle(e.target.value); } })),
                React.createElement("div", { className: " relative mt-2" },
                    React.createElement(Input_1.Input, { type: "text", placeholder: "description", value: description, onChange: function (e) {
                            return setDescription(e.target.value);
                        } }))),
            React.createElement("div", { className: " flex justify-end gap-4" },
                React.createElement(button_1.Button, { variant: "ghost", onClick: function (e) { return router.back(); } }, "cancel"),
                React.createElement(button_1.Button, { isLoading: isPending, disabled: title.length === 0, onClick: function () { return createList(); } }, "Create List")))));
};
exports["default"] = Page;
