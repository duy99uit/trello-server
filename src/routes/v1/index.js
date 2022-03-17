import express from "express";
import { HttpStatusCode } from "@/utilities/constants.js";
import { boardRoutes } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";

const router = express.Router();

// check server status
router.get("/status", (req, res) =>
  res.status(200).json({ status: HttpStatusCode.OK })
);

//boards
router.use("/boards", boardRoutes);
//column
router.use("/columns", columnRoutes);
//card
router.use("/cards", cardRoutes);

export const apiV1 = router;
