import express from "express"
import { login, signup, test, userDetail, verify } from "../controllers/user.js";

const router = express.Router();

router.get("/", test)
router.post("/login", login)
router.post("/signup", signup)
router.post("/verify", verify)
router.post("/detail", userDetail)

export default router