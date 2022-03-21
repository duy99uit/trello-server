import Joi from "joi";
import { getDB } from "../config/mongodb";
import { ObjectID } from "mongodb";
import { ColumnModel } from "@/models/column.model";
import { CardModel } from "@/models/card.model";
import { cloneDeep } from "lodash";

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
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectID(boardId) },
        { $push: { columnOrder: columnId } },
        { returnOriginal: false }
      );
    return result.value;
  } catch (err) {
    throw new Error(err);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDB()
      .collection(boardCollectionName)
      .aggregate([
        // off this object for getAllBoards --> return []
        {
          $match: {
            _id: ObjectID(boardId),
            _destroy: false,
          },
        },
        // {
        //   $addFields: {
        //     _id: { $toString: "$_id" },
        //   },
        // },
        {
          $lookup: {
            from: ColumnModel.columnCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "columns", // key for return data
          },
        },
        {
          $lookup: {
            from: CardModel.cardCollectionName,
            localField: "_id",
            foreignField: "boardId",
            as: "cards", // key for return data
          },
        },
      ])
      .toArray();
    // console.log("result", result);
    return result[0] || {};
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      boardId: ObjectID(data.boardId),
    };
    const result = await getDB()
      .collection(boardCollectionName)
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

export const BoardModel = { createNew, getFullBoard, pushColumnOrder, update };
