import { object, string } from "yup";

export const payload = {
  body: object({
    title: string().required("Title is required"),
  }),
};

const params = {
  params: object({
    boardId: string().required("BoardId is required"),
  }),
};

export const createListSchema = object({
  ...payload,
  ...params,
});
