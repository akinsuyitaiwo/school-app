import { Router as expRouter } from "express";
import studentRoutes from "./student";

const router = expRouter();

router.use("/students", studentRoutes);

export default router;
