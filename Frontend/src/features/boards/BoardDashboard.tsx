import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { getAllBoardsByUser, createBoard } from "./boardsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

const DashboardPage = () => {
  const [open, setOpen] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const boards = useSelector((state: RootState) => state.boards.boards);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo.accessToken && userInfo.refreshToken) {
      dispatch(
        getAllBoardsByUser({
          accessToken: userInfo.accessToken,
          refreshToken: userInfo.refreshToken,
        })
      );
    }
  }, [userInfo, dispatch]);

  const createBoardHandler = (title: string) => {
    dispatch(
      createBoard({
        accessToken: userInfo.accessToken,
        refreshToken: userInfo.refreshToken,
        title: title,
      })
    );
  };

  return (
    <>
      <div className="container mx-auto py-14">
        <h1 className="font-bold">Dashboard</h1>
        <div
          className="p-6 m-4 px-7 mx-2 cursor-pointer inline-block border-2 rounded border-black hover:bg-gray-100"
          onClick={() => setOpen(true)}
        >
          <i className="fas fa-plus"></i>
        </div>
        <div className="flex flex-col">
          {boards &&
            boards.map((board) => (
              <div
                key={board._id}
                className="m-2 p-6 cursor-pointer block w-max border-2 rounded border-black"
              >
                <h1>{board.title}</h1>
              </div>
            ))}
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} createBoard={createBoardHandler} />
    </>
  );
};

export default DashboardPage;
