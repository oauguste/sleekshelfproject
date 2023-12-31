"use strict";
// context/SessionContext.tsx
exports.__esModule = true;
exports.useSessionContext = exports.SessionContext = void 0;
var react_1 = require("react");
exports.SessionContext = react_1["default"].createContext(null);
exports.useSessionContext = function () {
    var context = react_1["default"].useContext(exports.SessionContext);
    if (!context) {
        throw new Error("useSessionContext must be used within a SessionProvider");
    }
    return context;
};
