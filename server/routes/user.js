import express from "express";
const router = express.Router();

import {
  signup,
  signin,
  addUserInfo,
  getUserInfo,
} from "../controllers/user.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.patch("/userinfo/:id", addUserInfo);
router.get("/userinfo/:id", getUserInfo);

export default router;
