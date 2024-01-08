"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation"); // Use next/router instead of next/navigation
var react_2 = require("next-auth/react");
var ProfileCompletionCheck = function () {
    var session = react_2.useSession().data;
    var router = navigation_1.useRouter();
    var path = navigation_1.usePathname();
    react_1["default"].useEffect(function () {
        var _a;
        // Check if the user is signed in and needs profile completion
        if (session && ((_a = session.user) === null || _a === void 0 ? void 0 : _a.needsProfileCompletion)) {
            // Redirect only if not already on the complete-profile page
            if (path !==
                "/User/" + session.user.email + "/completeProfile") {
                console.log("Redirecting to complete-profile");
                router.push("/User/" + session.user.email + "/completeProfile");
            }
        }
        else if (!session) {
            console.log("No session found. User not signed in.");
        }
    }, [session, router]);
    return null;
};
exports["default"] = ProfileCompletionCheck;
