"use client";
"use strict";
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var Providers = function (_a) {
    var children = _a.children;
    var queryClient = new react_query_1.QueryClient();
    return (React.createElement(react_query_1.QueryClientProvider, { client: queryClient }, children));
};
exports["default"] = Providers;
