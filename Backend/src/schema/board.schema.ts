import { object, string } from "yup";

export const payload = {
  body: object({
    title: string().required("Title is required"),
  }),
};

const params = {
  params: object({
    boardId: string().required("boardId is required"),
  }),
};

export const createBoardSchema = object({
  ...payload,
});

export const updateBoardSchema = object({
  ...payload,
  ...params,
});

export const deleteBoardSchema = object({
  ...params,
});
