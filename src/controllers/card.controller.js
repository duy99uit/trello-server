import { CardService } from "@/services/card.service";
import { HttpStatusCode } from "@/utilities/constants.js";
const createNew = async (req, res) => {
  try {
    const result = await CardService.createNew(req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: err.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await CardService.update(id, req.body);
    res.status(HttpStatusCode.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: err.message,
    });
  }
};

export const CardController = { createNew, update };
