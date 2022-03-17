import { CardModel } from "@/models/card.model";

const createNew = async (data) => {
  try {
    const result = await CardModel.createNew(data);
    return result;
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
    const result = await CardModel.update(id, updateData);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const CardService = { createNew, update };
