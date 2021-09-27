import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CardObject {
  _id: string;
  title: string;
}

interface ListObject {
  _id: string;
  title: string;
  board: string;
  cards: CardObject[];
}

interface BoardState {
  status: string;
  lists: ListObject[];
}

const initialState: BoardState = {
  status: "",
  lists: [],
};

export const getAllListsByBoardId = createAsyncThunk(
  "board/lists",
  async ({
    refreshToken,
    accessToken,
    boardId,
  }: {
    refreshToken: string;
    accessToken: string;
    boardId: string;
  }) => {
    try {
      const res = await axios.get(`/api/list/${boardId}`, {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
      });

      console.log(res);
      return res.data.lists;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createList = createAsyncThunk(
  "board/createList",
  async ({
    refreshToken,
    accessToken,
    title,
    boardId,
  }: {
    refreshToken: string;
    accessToken: string;
    title: string;
    boardId: string;
  }) => {
    try {
      const res = await axios.post(
        `/api/list/${boardId}`,
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

export const deleteList = createAsyncThunk(
  "board/deleteList",
  async ({
    refreshToken,
    accessToken,
    listId,
  }: {
    refreshToken: string;
    accessToken: string;
    listId: string;
  }) => {
    try {
      const res = await axios.delete(`/api/list/${listId}`, {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
      });
      console.log(res);
      return { ...res.data, listId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const moveList = createAsyncThunk(
  "board/moveList",
  async ({
    refreshToken,
    accessToken,
    listId,
    boardId,
    toIndex,
    list,
  }: {
    refreshToken: string;
    accessToken: string;
    boardId: string;
    toIndex: number;
    listId: string;
    list: any;
  }) => {
    try {
      const res = await axios.post(
        `/api/list/list/${listId}`,
        { boardId, toIndex },
        {
          headers: {
            "x-refresh": refreshToken,
            Authorization: accessToken,
          },
        }
      );

      console.log(res);
      return list;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateList = createAsyncThunk(
  "board/updateList",
  async ({
    refreshToken,
    accessToken,
    listId,
    title,
  }: {
    refreshToken: string;
    accessToken: string;
    listId: string;
    title: string;
  }) => {
    try {
      const res = await axios.put(
        `/api/list/list/${listId}`,
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

const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    moveTheList: (state, action) => {
      state.lists = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllListsByBoardId.pending, (state, action) => {
      state.status = "Loading";
      state.lists = [];
    });
    builder.addCase(getAllListsByBoardId.fulfilled, (state, action) => {
      state.status = "Success";
      state.lists = action.payload;
    });
    builder.addCase(getAllListsByBoardId.rejected, (state, action) => {
      state.status = "Fail";
    });
    builder.addCase(createList.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      state.status = "Success";
      state.lists = [...state.lists, action.payload];
    });
    builder.addCase(createList.rejected, (state, action) => {
      state.status = "Fail";
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.lists = state.lists.filter(
        (list) => list._id !== action.payload.listId
      );
    });
    builder.addCase(moveList.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload._id
          ? { ...list, title: action.payload.title }
          : list
      );
    });
  },
});
export const { moveTheList } = boardSlice.actions;
export default boardSlice.reducer;
