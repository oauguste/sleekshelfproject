"use strict";
// useProfileCompletion.ts (custom hook)
exports.__esModule = true;
exports.useProfileCompletion = void 0;
var react_1 = require("react");
var react_2 = require("next-auth/react");
var router_1 = require("next/router");
var useProfileCompletion = function () {
    var session = react_2.useSession().data;
    var router = router_1.useRouter();
    react_1.useEffect(function () {
        var _a;
        if ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.needsProfileCompletion) {
            router.push('/complete-profile');
        }
    }, [session, router]);
};
exports.useProfileCompletion = useProfileCompletion;
