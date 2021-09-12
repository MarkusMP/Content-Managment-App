import { object, string } from "yup";

export const payload = {
  body: object({
    title: string().required("Title is required"),
  }),
};

const params = {
  params: object({
    listId: string().required("listId is required"),
  }),
};

const paramsCardId = {
  params: object({
    cardId: string().required("cardID is required"),
  }),
};

export const createCardSchema = object({
  ...payload,
  ...params,
});

export const editCardSchema = object({
  ...payload,
  ...paramsCardId,
});
