import { Router as expRouter } from "express";
import studentRoutes from "./student";
import userRoutes from "./user";

const router = expRouter();

router.use("/students", studentRoutes);
router.use("/users", userRoutes);

export default router;
