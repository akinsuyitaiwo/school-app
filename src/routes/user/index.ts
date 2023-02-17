import { Router as couRouter } from "express";

// import { isAuthenticated, isStudent } from "../../middlewares";

const router = couRouter();
import userRouter from "./user";

router.use("/", userRouter);

export default router;
