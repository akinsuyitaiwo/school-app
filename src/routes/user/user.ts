import { Router as expRouter } from "express";
import { loginStudent } from "../../controllers";

const router = expRouter();

router.get("/login", loginStudent);

export default router;
