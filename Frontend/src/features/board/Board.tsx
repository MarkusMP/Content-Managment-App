import React, { useEffect, useState } from "react";
import List from "./List";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllListsByBoardId,
  createList,
  moveList,
  moveTheList,
} from "./boardSlice";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { RootState } from "../../app/store";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import BoardHeader from "../../components/BoardHeader";

type Props = {
  boardId: string;
};
const Board = ({ match }: RouteComponentProps<Props>) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const board = useSelector((state: RootState) => state.board);
  const [open, setOpen] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!userInfo.accessToken) {
      history.push("/");
    } else {
      dispatch(
        getAllListsByBoardId({
          boardId: match.params.boardId,
          refreshToken: userInfo.refreshToken,
          accessToken: userInfo.accessToken,
        })
      );
    }
  }, [dispatch, match.params, userInfo, match.params.boardId, history]);

  const handleClose = () => {
    setOpen(false);
    setListTitle("");
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (listTitle) {
      console.log(board._id, match.params.boardId);
      dispatch(
        createList({
          boardId: board._id,
          refreshToken: userInfo.refreshToken,
          accessToken: userInfo.accessToken,
          title: listTitle,
        })
      );
    }
    setOpen(false);
    setListTitle("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const list = Array.from(board.lists);
    const [newOrder] = list.splice(source.index, 1);
    list.splice(destination.index, 0, newOrder);

    dispatch(moveTheList(list));

    dispatch(
      moveList({
        boardId: match.params.boardId,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        toIndex: destination.index,
        listId: draggableId,
        list: list,
      })
    );
  };

  return (
    <div
      className="h-screen pt-12 "
      style={{
        backgroundImage: `url(${board.backgroundURL})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <BoardHeader title={board.title} _id={board._id} />
      <div
        className="flex overflow-auto w-full relative "
        style={{ height: "91vh" }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex"
              >
                {board.lists &&
                  board.lists.map((list, index) => (
                    <Draggable
                      key={list._id}
                      draggableId={list._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="h-2"
                        >
                          <List
                            id={list._id}
                            title={list.title}
                            cards={list.cards}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="flex-none">
          <div className="bg-white w-72  shadow-md rounded pt-2 px-3 pb-2 inline-block m-2">
            <form className="mt-2 " onSubmit={submitHandler}>
              {open ? (
                <>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    placeholder="Enter a title for this list..."
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                  />
                  <div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    >
                      Add List
                    </button>
                    <button
                      type="button"
                      className="text-lg px-4 text-gray-400 hover:text-gray-900"
                      onClick={handleClose}
                    >
                      X
                    </button>
                  </div>
                </>
              ) : (
                <h2
                  className="hover:bg-gray-100 p-1 cursor-pointer rounded"
                  onClick={() => setOpen(true)}
                >
                  + Add List
                </h2>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
