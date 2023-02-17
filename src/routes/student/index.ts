import { Router as couRouter } from "express";

// import { isAuthenticated, isStudent } from "../../middlewares";

const router = couRouter();
import StudentRoute from "./student";

router.use("/", StudentRoute);

export default router;
