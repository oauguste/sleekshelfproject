"use strict";
exports.__esModule = true;
exports.db = void 0;
var kysely_adapter_1 = require("@auth/kysely-adapter");
var pg_1 = require("pg");
var kysely_1 = require("kysely");
// Ensure you load environment variables
//require("dotenv").config();
var pool = new pg_1.Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
});
var dialect = new kysely_1.PostgresDialect({ pool: pool });
exports.db = new kysely_adapter_1.KyselyAuth({ dialect: dialect });
