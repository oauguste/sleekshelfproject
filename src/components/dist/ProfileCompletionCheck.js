// ProfileCompletionCheck.client.tsx
"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("next/router");
var SessionContext_1 = require("@/lib/SessionContext");
var ProfileCompletionCheck = function () {
    var session = SessionContext_1.useSessionContext().session;
    var router = router_1.useRouter();
    react_1["default"].useEffect(function () {
        var _a;
        if ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.needsProfileCompletion) {
            router.push("/complete-profile");
        }
    }, [session, router]);
    return null;
};
exports["default"] = ProfileCompletionCheck;
