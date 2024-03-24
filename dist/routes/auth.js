"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const router = (0, express_1.Router)();
router.route("/register").post(auth_1.registerUser);
router.route("/login").post(auth_1.loginUser);
exports.default = router;
