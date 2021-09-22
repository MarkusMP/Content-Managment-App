import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface BoardObject {
  _id: string;
  title: string;
  user: string;
  createdAt: string;
  lists: string[];
}

interface BoardsState {
  status: string;
  boards: BoardObject[];
}

const initialState: BoardsState = {
  status: "",
  boards: [],
};

export const getAllBoardsByUser = createAsyncThunk(
  "boards/allBoardsUser",
  async ({
    refreshToken,
    accessToken,
  }: {
    refreshToken: string;
    accessToken: string;
  }) => {
    try {
      const res = await axios.get("/api/board", {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
      });

      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async ({
    refreshToken,
    accessToken,
    title,
  }: {
    refreshToken: string;
    accessToken: string;
    title: string;
  }) => {
    try {
      const res = await axios.post(
        "/api/board",
        { title },
        {
          headers: {
            "x-refresh": refreshToken,
            Authorization: accessToken,
          },
        }
      );

      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBoardsByUser.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(getAllBoardsByUser.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload);
    });
  },
});

export default boardsSlice.reducer;
