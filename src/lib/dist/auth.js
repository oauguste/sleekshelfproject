"use strict";
exports.__esModule = true;
exports.authOptions = void 0;
var database_1 = require("@/app/database/database");
var kysely_adapter_1 = require("@auth/kysely-adapter");
var google_1 = require("next-auth/providers/google");
exports.authOptions = {
    adapter: kysely_adapter_1.KyselyAdapter(database_1.db),
    session: { strategy: "jwt" },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        google_1["default"]({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ]
};
