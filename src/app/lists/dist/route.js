"use strict";
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
exports.GET = exports.POST = exports.dynamic = void 0;
var listRepository_1 = require("../../repositories/listRepository");
var zod_1 = require("zod");
var zod_validation_error_1 = require("zod-validation-error");
var next_1 = require("next-auth/next");
var auth_1 = require("@/lib/auth");
var createListSchema = zod_1.z.object({
    id: zod_1.z.string(),
    user_id: zod_1.z.number(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    is_template: zod_1.z.boolean(),
    created_at: zod_1.z.string().datetime()
});
exports.dynamic = 'auto';
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var session, userId, body, title, description, newList, error_1, validationError;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, next_1.getServerSession(auth_1.authOptions)];
                case 1:
                    session = _a.sent();
                    if (!session || isNaN(Number(session === null || session === void 0 ? void 0 : session.user.id))) {
                        console.log(session === null || session === void 0 ? void 0 : session.user.id);
                        return [2 /*return*/, Response.json({ message: "Invalid user ID" })];
                    }
                    userId = Number(session.user.id);
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _a.sent();
                    title = body.title, description = body.description;
                    return [4 /*yield*/, listRepository_1.createList({
                            user_id: userId,
                            title: title,
                            description: description,
                            is_template: false,
                            created_at: new Date().toISOString()
                        })];
                case 3:
                    newList = _a.sent();
                    if (newList) {
                        return [2 /*return*/, Response.json({ message: "List created successfully", data: newList })];
                    }
                    else {
                        return [2 /*return*/, Response.json({ message: "Error, failed to create list" })];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    if (error_1 instanceof zod_1.z.ZodError) {
                        validationError = zod_validation_error_1.fromZodError(error_1);
                        return [2 /*return*/, Response.json({ message: validationError.message })];
                    }
                    else {
                        console.error(error_1);
                        return [2 /*return*/, Response.json({ message: "Error, unable to  process this request" })];
                    }
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        var list, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, listRepository_1.findList(request.url)];
                case 1:
                    list = _a.sent();
                    return [2 /*return*/, Response.json({ message: "Successfully fetched lists", data: list })];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, Response.json({ message: "Error, unable to process lists fetch request" })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
