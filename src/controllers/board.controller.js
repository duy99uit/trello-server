import { BoardService } from "@/services/board.service";
import { HttpStatusCode } from "@/utilities/constants.js";
const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body);
    console.log("result", result);
    res.status(HttpStatusCode.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: err.message,
    });
  }
};

export const BoardController = { createNew };
