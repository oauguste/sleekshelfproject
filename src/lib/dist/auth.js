"use strict";
// [...nextauth].ts
exports.__esModule = true;
exports.authOptions = void 0;
var google_1 = require("next-auth/providers/google");
var kysely_adapter_1 = require("@auth/kysely-adapter");
var database_1 = require("@/app/database/database"); // Adjust the path as necessary
exports.authOptions = {
    providers: [
        google_1["default"]({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    //@ts-ignore
    adapter: kysely_adapter_1.KyselyAdapter(database_1.db),
    pages: {
        signIn: '/sign-in'
    }
};
