import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectID } from "mongodb";

const cardCollectionName = "cards";
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cover: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const insertValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId),
      columnId: ObjectID(validatedValue.columnId),
    };
    const result = await getDB()
      .collection(cardCollectionName)
      .insertOne(insertValue);
    return result.ops[0];
  } catch (err) {
    throw new Error(err);
  }
};

const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map((i) => ObjectID(i));
    const result = await getDB()
      .collection(cardCollectionName)
      .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } });

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };
    if (data.boardId) {
      updateData.boardId = ObjectID(data.boardId);
    }
    if (data.columnId) {
      updateData.columnId = ObjectID(data.columnId);
    }
    const result = await getDB()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: updateData },
        { returnOriginal: false }
      );
    // console.log("result", result);
    return result.value;
  } catch (err) {
    throw new Error(err);
  }
};

export const CardModel = { createNew, cardCollectionName, deleteMany, update };
