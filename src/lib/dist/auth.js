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
        jwt: function (_a) {
            var token = _a.token, user = _a.user, trigger = _a.trigger, session = _a.session;
            return __awaiter(this, void 0, void 0, function () {
                var existingUser;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!token.id) {
                                token.id = nanoid_1.nanoid();
                            }
                            if (!(user && typeof user.email === 'string')) return [3 /*break*/, 2];
                            return [4 /*yield*/, userRepository_1.findUser({ email: user.email })];
                        case 1:
                            existingUser = _b.sent();
                            token.needsProfileCompletion = !existingUser; // false if user exists
                            if (existingUser) {
                                token.id = existingUser.id.toString();
                                token.username = existingUser.username || null;
                            }
                            _b.label = 2;
                        case 2:
                            // Update token based on session changes
                            if (trigger === "update" && (session === null || session === void 0 ? void 0 : session.needsProfileCompletion) !== undefined) {
                                token.needsProfileCompletion = session.needsProfileCompletion;
                            }
                            return [2 /*return*/, token];
                    }
                });
            });
        },
        session: function (_a) {
            var token = _a.token, session = _a.session;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    if (token) {
                        session.user.id = token.id || nanoid_1.nanoid();
                        session.user.name = token.name;
                        session.user.email = token.email || '';
                        session.user.image = token.picture;
                        session.user.username = token.username;
                        // session.user.needsProfileCompletion = true;
                        session.user.needsProfileCompletion = token.needsProfileCompletion;
                        //     if(user){ 
                        //       if (typeof user.email === 'string') { 
                        //         console.log(user)
                        //       const existingUser = await findUser({ email:  session.user.email });
                        //       if (existingUser) {
                        //         session.user.needsProfileCompletion = false;
                        //         console.log(session.user.needsProfileCompletion)
                        //     }
                        //   }
                        // }
                    }
                    return [2 /*return*/, session];
                });
            });
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
