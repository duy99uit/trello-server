import { BoardModel } from "@/models/board.model";
import { cloneDeep } from "lodash";

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
    const board = await BoardModel.getFullBoard(id);

    if (!board || !board.columns) {
      throw new Error("Board not found");
    }

    const transformBoard = cloneDeep(board);
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );
    // add card to each column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    // sort column by columnOrder
    // remove card from card
    delete transformBoard.cards;
    // console.log("board", board);
    return transformBoard;
  } catch (err) {
    throw new Error(err);
  }
};

export const BoardService = { createNew, getFullBoard };
