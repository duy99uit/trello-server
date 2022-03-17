import { BoardModel } from "@/models/board.model";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const getFullBoard = async (id) => {
  try {
    const result = await BoardModel.getFullBoard(id);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const BoardService = { createNew, getFullBoard };
