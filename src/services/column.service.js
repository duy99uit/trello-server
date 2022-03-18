import { ColumnModel } from "@/models/column.model";
import { BoardModel } from "@/models/board.model";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);
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
    const result = await ColumnModel.update(id, updateData);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const ColumnService = { createNew, update };
