import express from "express";
import { HttpStatusCode } from "@/utilities/constants.js";
import { boardRoutes } from "./board.route";

const router = express.Router();

// check server status
router.get("/status", (req, res) =>
  res.status(200).json({ status: HttpStatusCode.OK })
);

router.use("/boards", boardRoutes);

export const apiV1 = router;
