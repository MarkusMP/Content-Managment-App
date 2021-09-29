import React from "react";
import BoardDropDown from "./BoardDropDown";

interface props {
  title: string;
  _id: string;
}

const BoardHeader = (props: props) => {
  return (
    <div className="flex justify-around text-lg py-1 bg-gray-100 items-center">
      <h1>{props.title}</h1>

      <BoardDropDown boardId={props._id} />
    </div>
  );
};

export default BoardHeader;
