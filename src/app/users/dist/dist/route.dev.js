"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var userRepository_1 = require("../../../repositories/userRepository");

var zod_1 = require("zod");

var zod_validation_error_1 = require("zod-validation-error");

var createUserSchema = zod_1.z.object({
  username: zod_1.z.string(),
  email: zod_1.z.string().email(),
  premium_status: zod_1.z["enum"](["free", "paid"]),
  created_at: zod_1.z.string().datetime(),
  passwordHash: zod_1.z.string()
});

function handler(req, res) {
  return __awaiter(this, void 0, void 0, function () {
    var parsed, newUser, error_1, validationError, users, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!(req.method === "POST")) return [3
          /*break*/
          , 5];
          _a.label = 1;

        case 1:
          _a.trys.push([1, 3,, 4]);

          parsed = createUserSchema.parse(req.body);
          return [4
          /*yield*/
          , userRepository_1.createUser(parsed)];

        case 2:
          newUser = _a.sent();

          if (newUser) {
            return [2
            /*return*/
            , res.status(201).json({
              message: "User created successfully",
              data: newUser
            })];
          } else {
            return [2
            /*return*/
            , res.status(400).json({
              message: "Error, failed to create user"
            })];
          }

          return [3
          /*break*/
          , 4];

        case 3:
          error_1 = _a.sent();

          if (error_1 instanceof zod_1.z.ZodError) {
            validationError = zod_validation_error_1.fromZodError(error_1);
            return [2
            /*return*/
            , res.status(400).json({
              message: validationError.message
            })];
          } else {
            return [2
            /*return*/
            , res.status(500).json({
              message: "Error, unable to process request"
            })];
          }

          return [3
          /*break*/
          , 4];

        case 4:
          return [3
          /*break*/
          , 11];

        case 5:
          if (!(req.method === "GET")) return [3
          /*break*/
          , 10];
          _a.label = 6;

        case 6:
          _a.trys.push([6, 8,, 9]);

          return [4
          /*yield*/
          , userRepository_1.findUser(req.query)];

        case 7:
          users = _a.sent();
          return [2
          /*return*/
          , res.status(200).json({
            message: "Successfully fetched users",
            data: users
          })];

        case 8:
          error_2 = _a.sent();
          return [2
          /*return*/
          , res.status(500).json({
            message: "Error, unable to process user fetch request"
          })];

        case 9:
          return [3
          /*break*/
          , 11];

        case 10:
          res.setHeader("Allow", ["GET", "POST"]);
          return [2
          /*return*/
          , res.status(405).end("Method " + req.method + " Not Allowed")];

        case 11:
          return [2
          /*return*/
          ];
      }
    });
  });
}

exports["default"] = handler;