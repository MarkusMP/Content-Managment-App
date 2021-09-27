import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/users/usersSlice";
import boardsReducer from "../features/boards/boardsSlice";
import boardReducer from "../features/board/boardSlice";

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    boards: boardsReducer,
    board: boardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
