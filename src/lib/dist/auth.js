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
exports.getAuthSession = exports.authOptions = void 0;
// [...nextauth].ts
var nanoid_1 = require("nanoid");
var google_1 = require("next-auth/providers/google");
var kysely_adapter_1 = require("@auth/kysely-adapter");
var database_1 = require("@/database/database"); // Adjust the path as necessary
var next_auth_1 = require("next-auth");
var userRepository_1 = require("../repositories/userRepository");
exports.authOptions = {
    //@ts-ignore
    adapter: kysely_adapter_1.KyselyAdapter(database_1.db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    providers: [
        google_1["default"]({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks: {
        session: function (_a) {
            var token = _a.token, session = _a.session;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    if (token) {
                        session.user.id = token.id;
                        session.user.name = token.name;
                        session.user.email = token.email;
                        session.user.image = token.picture;
                        session.user.username = token.username;
                        session.user.needsProfileCompletion = token.needsProfileCompletion;
                        // session.user.needsProfileCompletion = token.needsProfileCompletion ?? false;
                    }
                    return [2 /*return*/, session];
                });
            });
        },
        jwt: function (_a) {
            var token = _a.token, user = _a.user;
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, dbUser, dbUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!user) return [3 /*break*/, 7];
                            if (!(typeof user.email === 'string')) return [3 /*break*/, 2];
                            return [4 /*yield*/, userRepository_1.findUser({ email: user.email })];
                        case 1:
                            existingUser = _b.sent();
                            // Set the flag on the token based on whether the user exists
                            token.needsProfileCompletion = !existingUser;
                            _b.label = 2;
                        case 2:
                            if (!user.email) return [3 /*break*/, 6];
                            return [4 /*yield*/, userRepository_1.findUser({ email: user.email })];
                        case 3:
                            dbUser = _b.sent();
                            if (!dbUser) return [3 /*break*/, 6];
                            // Convert dbUser.id to string if it's a number, and assign it to token.id
                            token.id = dbUser.id.toString();
                            if (!!dbUser.username) return [3 /*break*/, 5];
                            // Generate and update username if it doesn't exist
                            return [4 /*yield*/, userRepository_1.updateUser(dbUser.id, { username: nanoid_1.nanoid(10) })];
                        case 4:
                            // Generate and update username if it doesn't exist
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            // Update token with username
                            token.username = dbUser.username || null;
                            _b.label = 6;
                        case 6: return [2 /*return*/, token];
                        case 7:
                            if (!token.email) return [3 /*break*/, 9];
                            return [4 /*yield*/, userRepository_1.findUser({ email: token.email })];
                        case 8:
                            dbUser = _b.sent();
                            if (dbUser) {
                                // Convert dbUser.id to string, and update token with username
                                token.id = dbUser.id.toString();
                                token.username = dbUser.username || null;
                            }
                            return [2 /*return*/, token];
                        case 9: 
                        // Return the token as is in other cases
                        return [2 /*return*/, token];
                    }
                });
            });
        },
        redirect: function () {
            return '/';
        }
    }
};
exports.getAuthSession = function () { return next_auth_1.getServerSession(exports.authOptions); };
// async signIn({user, account}) {
//   if(account?.provider === "google"){
//     if (typeof user.email === 'string') {
//       const existingUser = await findUser({ email: user.email });
//       console.log(existingUser)
//       console.log(existingUser?.email)
//       const needsProfileCompletion = !existingUser
//       // if (!existingUser) {
//       //   // Set the flag for profile completion
//       //   (user as any).needsProfileCompletion = true;
//       // } else {
//       //   (user as any).needsProfileCompletion = false;
//       // }
//     }
//     return true;
//   }
//   return true;
// },
