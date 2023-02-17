import { Router as expRouter } from "express";
import { registerStudent } from "../../controllers";

const router = expRouter();

router.get("/register", registerStudent);
export default router;
