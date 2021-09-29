import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CardObject {
  _id: string;
  title: string;
  listId: string;
}

interface ListObject {
  _id: string;
  title: string;
  board: string;
  cards: CardObject[];
}

interface BoardState {
  status: string;
  title: string;
  _id: string;
  backgroundURL: string;
  lists: ListObject[];
}

const initialState: BoardState = {
  status: "",
  title: "",
  _id: "",
  backgroundURL: "",
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
      const lists = await axios.get(`/api/list/${boardId}`, {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
      });
      const board = await axios.get(`/api/board/${boardId}`, {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
      });

      return { ...board.data, lists: lists.data };
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

export const createCard = createAsyncThunk(
  "board/createCard",
  async ({
    refreshToken,
    accessToken,
    listId,
    title,
  }: {
    refreshToken: string;
    accessToken: string;
    title: string;
    listId: string;
  }) => {
    try {
      const res = await axios.post(
        `/api/card/${listId}`,
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

export const deleteCard = createAsyncThunk(
  "board/deleteCard",
  async ({
    refreshToken,
    accessToken,
    listId,
    cardId,
  }: {
    refreshToken: string;
    accessToken: string;
    listId: string;
    cardId: string;
  }) => {
    console.log(listId, cardId);
    try {
      const res = await axios.delete(`/api/card/${listId}`, {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
        data: { cardId: cardId },
      });

      console.log(res);
      return { cardId, listId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCard = createAsyncThunk(
  "board/updateCard",
  async ({
    refreshToken,
    accessToken,
    cardId,
    title,
  }: {
    refreshToken: string;
    accessToken: string;
    title: string;
    cardId: string;
  }) => {
    try {
      const res = await axios.put(
        `/api/card/cards/${cardId}`,
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

export const moveCard = createAsyncThunk(
  "board/moveCard",
  async ({
    refreshToken,
    accessToken,
    listId,
    cardId,
    toIndex,
    newCards,
  }: {
    refreshToken: string;
    accessToken: string;
    cardId: string;
    toIndex: number;
    listId: string;
    newCards: any;
  }) => {
    try {
      const res = await axios.post(
        `/api/card/cards/${cardId}`,
        { listId, toIndex },
        {
          headers: {
            "x-refresh": refreshToken,
            Authorization: accessToken,
          },
        }
      );

      console.log(res);
      return { newCards, listId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
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
      const res = await axios.delete(`/api/board/${boardId}`, {
        headers: {
          "x-refresh": refreshToken,
          Authorization: accessToken,
        },
      });
      console.log(res);
      return { ...res.data, boardId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "board/updateBoard",
  async ({
    refreshToken,
    accessToken,
    boardId,
    title,
    backgroundURL,
  }: {
    refreshToken: string;
    accessToken: string;
    title: string;
    backgroundURL: string;
    boardId: string;
  }) => {
    try {
      console.log("hello");
      const res = await axios.put(
        `/api/board/${boardId}`,
        { title, backgroundURL },
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
    moveTheCard: (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload.id
          ? { ...list, cards: action.payload.cards }
          : list
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllListsByBoardId.pending, (state, action) => {
      state.status = "Loading";
      state.lists = [];
    });
    builder.addCase(getAllListsByBoardId.fulfilled, (state, action) => {
      state.status = "Success";
      state.title = action.payload.title;
      state.lists = action.payload.lists;
      state.backgroundURL = action.payload.backgroundURL;
      state._id = action.payload._id;
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
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload.list
          ? {
              ...list,
              cards: [
                ...list.cards,
                {
                  title: action.payload.title,
                  _id: action.payload._id,
                  listId: action.payload.list,
                },
              ],
            }
          : list
      );
    });
    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload?.listId
          ? {
              ...list,
              cards: list.cards.filter(
                (card) => card._id !== action.payload?.cardId
              ),
            }
          : list
      );
    });
    builder.addCase(updateCard.fulfilled, (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload.list
          ? {
              ...list,
              cards: list.cards.map((card) =>
                card._id !== action.payload?._id
                  ? card
                  : { ...card, title: action.payload.title }
              ),
            }
          : list
      );
    });
    builder.addCase(moveCard.fulfilled, (state, action) => {
      state.lists = state.lists.map((list) =>
        list._id === action.payload?.listId
          ? { ...list, cards: action.payload.newCards }
          : list
      );
    });
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.status = "";
      state.title = "";
      state.lists = [];
    });
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.title = action.payload.title;
      state.backgroundURL = action.payload.backgroundURL;
    });
  },
});
export const { moveTheList, moveTheCard } = boardSlice.actions;
export default boardSlice.reducer;
