import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectID } from "mongodb";

const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);
    const result = await getDB()
      .collection(boardCollectionName)
      .insertOne(value);
    return result.ops[0];
  } catch (err) {
    throw new Error(err);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectID(boardId),
          },
        },
        {
          $addFields: {
            _id: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "boardId",
            as: "columns", // fieldname
          },
        },
      ])
      .toArray();
    console.log("result", result);
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export const BoardModel = { createNew, getFullBoard };
