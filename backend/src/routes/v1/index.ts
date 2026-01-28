import express from "express";
import authRoutes from "./auth.routes";
import demoRoutes from "./demo.routes";
import adminRoutes from "./admin.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/demo", demoRoutes);
router.use("/demo-requests", adminRoutes);

export default router;
