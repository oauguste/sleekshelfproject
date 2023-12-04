"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.down = exports.up = void 0;
var kysely_1 = require("kysely");
function up(db) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.schema
                        .createTable("User")
                        .addColumn("id", "uuid", function (col) {
                        return col.primaryKey().defaultTo(kysely_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"]))));
                    })
                        .addColumn("name", "text")
                        .addColumn("email", "text", function (col) { return col.unique().notNull(); })
                        .addColumn("emailVerified", "timestamptz")
                        .addColumn("image", "text")
                        .execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("Account")
                            .addColumn("id", "uuid", function (col) {
                            return col.primaryKey().defaultTo(kysely_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"]))));
                        })
                            .addColumn("userId", "uuid", function (col) {
                            return col.references("User.id").onDelete("cascade").notNull();
                        })
                            .addColumn("type", "text", function (col) { return col.notNull(); })
                            .addColumn("provider", "text", function (col) { return col.notNull(); })
                            .addColumn("providerAccountId", "text", function (col) { return col.notNull(); })
                            .addColumn("refresh_token", "text")
                            .addColumn("access_token", "text")
                            .addColumn("expires_at", "bigint")
                            .addColumn("token_type", "text")
                            .addColumn("scope", "text")
                            .addColumn("id_token", "text")
                            .addColumn("session_state", "text")
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("Session")
                            .addColumn("id", "uuid", function (col) {
                            return col.primaryKey().defaultTo(kysely_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["gen_random_uuid()"], ["gen_random_uuid()"]))));
                        })
                            .addColumn("userId", "uuid", function (col) {
                            return col.references("User.id").onDelete("cascade").notNull();
                        })
                            .addColumn("sessionToken", "text", function (col) { return col.notNull().unique(); })
                            .addColumn("expires", "timestamptz", function (col) { return col.notNull(); })
                            .execute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("VerificationToken")
                            .addColumn("identifier", "text", function (col) { return col.notNull(); })
                            .addColumn("token", "text", function (col) { return col.notNull().unique(); })
                            .addColumn("expires", "timestamptz", function (col) { return col.notNull(); })
                            .execute()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createIndex("Account_userId_index")
                            .on("Account")
                            .column("userId")
                            .execute()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createIndex("Session_userId_index")
                            .on("Session")
                            .column("userId")
                            .execute()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.up = up;
function down(db) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.schema.dropTable("Account").ifExists().execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("Session").ifExists().execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("User").ifExists().execute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("VerificationToken").ifExists().execute()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
var templateObject_1, templateObject_2, templateObject_3;
