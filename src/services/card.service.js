import { CardModel } from "@/models/card.model";
import { ColumnModel } from "@/models/column.model";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);
    // update column order array in board

    await ColumnModel.pushCardOrder(
      newCard.columnId.toString(),
      newCard._id.toString()
    );

    return newCard;
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

    const result = await CardModel.update(id, updateData);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const CardService = { createNew, update };
