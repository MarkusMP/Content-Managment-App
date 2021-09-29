import React, { useState } from "react";
import ListDropDown from "../../components/ListDropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createCard, moveCard, moveTheCard } from "./boardSlice";
import Card from "./Card";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface CardObject {
  title: string;
  _id: string;
  listId: string;
}
interface Props {
  title: string;
  id: string;
  cards: CardObject[];
}
const List = ({ title, id, cards }: Props) => {
  const [open, setOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const userInfo = useSelector((state: RootState) => state.userInfo);

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setCardTitle("");
  };

  const createCardHandler = (e: React.FormEvent) => {
    console.log(id);
    e.preventDefault();
    dispatch(
      createCard({
        title: cardTitle,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        listId: id,
      })
    );
    setCardTitle("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const newCards = Array.from(cards);
    const [newOrder] = newCards.splice(source.index, 1);
    newCards.splice(destination.index, 0, newOrder);

    dispatch(moveTheCard({ id: id, cards: newCards }));

    dispatch(
      moveCard({
        newCards,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        listId: id,
        cardId: draggableId,
        toIndex: destination.index,
      })
    );
  };

  return (
    <div className="bg-white w-72  shadow-md rounded pt-2 px-3 pb-2 inline-block m-2 ">
      <div className="flex justify-between align-center">
        <h3 className="font-medium overflow-hidden">{title}</h3>
        <ListDropDown id={id} />
      </div>

      <div className="my-2">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {cards.map((card, index) => (
                  <Draggable
                    key={card._id}
                    draggableId={card._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card
                          key={card._id}
                          title={card.title}
                          listId={id}
                          id={card._id}
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
      </div>

      {open ? (
        <form className="mt-2" onSubmit={createCardHandler}>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="Enter a title for this card..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            >
              Add card
            </button>
            <button
              type="button"
              className="text-lg px-4 text-gray-400 hover:text-gray-900"
              onClick={handleClose}
            >
              X
            </button>
          </div>
        </form>
      ) : (
        <h2
          className="hover:bg-gray-100 p-1 cursor-pointer rounded"
          onClick={() => setOpen(true)}
        >
          + Add Card
        </h2>
      )}
    </div>
  );
};

export default List;
