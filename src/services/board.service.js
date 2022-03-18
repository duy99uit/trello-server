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
    const board = await BoardModel.getFullBoard(id);
    // add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });
    // sort column by columnOrder
    // remove card from card
    delete board.cards;
    // console.log("board", board);
    return board;
  } catch (err) {
    throw new Error(err);
  }
};

export const BoardService = { createNew, getFullBoard };
