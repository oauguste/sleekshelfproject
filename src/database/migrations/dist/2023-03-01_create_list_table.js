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
                        .createTable("user")
                        .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                        .addColumn("username", "varchar", function (col) { return col.notNull(); })
                        .addColumn("email", "varchar", function (col) { return col.notNull().unique(); })
                        .addColumn("password_hash", "varchar", function (col) { return col.notNull(); })
                        .addColumn("premium_status", "varchar", function (col) { return col.notNull().defaultTo("free"); }) //Todo: eun the migration again then delete this
                        .addColumn("created_at", "timestamp", function (col) {
                        return col.defaultTo(kysely_1.sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["now()"], ["now()"])))).notNull();
                    })
                        .execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("list")
                            .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                            .addColumn("user_id", "integer", function (col) {
                            return col.references("user.id").onDelete("cascade").notNull();
                        })
                            .addColumn("title", "varchar")
                            .addColumn("description", "varchar")
                            .addColumn("is_template", "boolean", function (col) { return col.notNull(); })
                            .addColumn("created_at", "timestamp", function (col) {
                            return col.defaultTo(kysely_1.sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["now()"], ["now()"])))).notNull();
                        })
                            .execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("book")
                            .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                            .addColumn("title", "varchar", function (col) { return col.notNull(); })
                            .addColumn("author", "varchar", function (col) { return col.notNull(); })
                            .addColumn("isbn_10", "varchar")
                            .addColumn("isbn_13", "varchar")
                            .addColumn("publication_year", "integer")
                            .addColumn("genre", "varchar")
                            .addColumn("pages", "integer")
                            .addColumn("cover_image", "varchar")
                            .execute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("list_book")
                            .addColumn("list_id", "integer", function (col) {
                            return col.references("list.id").onDelete("cascade").notNull();
                        })
                            .addColumn("book_id", "integer", function (col) {
                            return col.references("book.id").onDelete("cascade").notNull();
                        })
                            .addColumn("user_ranking", "integer")
                            .execute()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("tag")
                            .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                            .addColumn("tag_name", "varchar", function (col) { return col.notNull(); })
                            .execute()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("list_tag")
                            .addColumn("list_id", "integer", function (col) {
                            return col.references("list.id").onDelete("cascade").notNull();
                        })
                            .addColumn("tag_id", "integer", function (col) {
                            return col.references("tag.id").onDelete("cascade").notNull();
                        })
                            .execute()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("comment")
                            .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                            .addColumn("list_id", "integer", function (col) {
                            return col.references("list.id").onDelete("cascade").notNull();
                        })
                            .addColumn("user_id", "integer", function (col) {
                            return col.references("user.id").onDelete("cascade").notNull();
                        })
                            .addColumn("comment_text", "text", function (col) { return col.notNull(); })
                            .addColumn("created_at", "timestamp", function (col) {
                            return col.defaultTo(kysely_1.sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["now()"], ["now()"])))).notNull();
                        })
                            .execute()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("comment_rating")
                            .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                            .addColumn("comment_id", "integer", function (col) {
                            return col.references("comment.id").onDelete("cascade").notNull();
                        })
                            .addColumn("user_id", "integer", function (col) {
                            return col.references("user.id").onDelete("cascade").notNull();
                        })
                            .addColumn("vote", "integer", function (col) { return col.notNull().defaultTo(0); })
                            .execute()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, db.schema
                            .createTable("list_rating")
                            .addColumn("id", "serial", function (col) { return col.primaryKey(); })
                            .addColumn("list_id", "integer", function (col) {
                            return col.references("list.id").onDelete("cascade").notNull();
                        })
                            .addColumn("user_id", "integer", function (col) {
                            return col.references("user.id").onDelete("cascade").notNull();
                        })
                            .addColumn("vote", "integer", function (col) { return col.notNull().defaultTo(0); })
                            .execute()];
                case 9:
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
                case 0: return [4 /*yield*/, db.schema.dropTable("list_rating").execute()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("comment_rating").execute()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("comment").execute()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("tag_list").execute()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("tag").execute()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("list_book").execute()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("book").execute()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("list").execute()];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, db.schema.dropTable("user").execute()];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.down = down;
var templateObject_1, templateObject_2, templateObject_3;
