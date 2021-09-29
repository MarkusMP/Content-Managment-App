import React from "react";
import CardDropDown from "../../components/CardDropDown";

interface props {
  listId: string;
  title: string;
  id: string;
}

const Card = ({ listId, title, id }: props) => {
  return (
    <>
      <div
        style={{ zIndex: 4 }}
        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-2 flex justify-between"
      >
        <h1>{title}</h1>
        <CardDropDown cardId={id} listId={listId} />
      </div>
    </>
  );
};

export default Card;
