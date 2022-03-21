import { ColumnModel } from "@/models/column.model";
import { BoardModel } from "@/models/board.model";
import { CardModel } from "@/models/card.model";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);
    newColumn.cards = [];
    // update column order array in board

    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    );

    return newColumn;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updatedAt: Date.now(),
    };
    if (updateData._id) delete updateData._id;
    if (updateData.cards) delete updateData.cards;
    const updatedColumn = await ColumnModel.update(id, updateData);

    // delete when há "_destroy: true"

    if (updatedColumn._destroy) {
      CardModel.deleteMany(updatedColumn.cardOrder);
    }
    return updatedColumn;
  } catch (err) {
    throw new Error(err);
  }
};

export const ColumnService = { createNew, update };
