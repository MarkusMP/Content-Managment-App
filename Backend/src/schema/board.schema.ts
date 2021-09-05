import { object, string } from "yup";

export const createBoardSchema = object({
  body: object({
    title: string().required("Title is required"),
  }),
});
