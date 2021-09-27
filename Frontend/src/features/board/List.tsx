import React, { useState } from "react";
import ListDropDown from "../../components/ListDropDown";

interface Props {
  title: string;
  id: string;
}
const List = ({ title, id }: Props) => {
  const [open, setOpen] = useState(false);
  const [cardTitle, setCardTitle] = useState("");

  const handleClose = () => {
    setOpen(false);
    setCardTitle("");
  };

  return (
    <div className="bg-white w-72  shadow-md rounded pt-2 px-3 pb-2 inline-block m-2 ">
      <div className="flex justify-between align-center">
        <h3 className="font-medium overflow-hidden">{title}</h3>
        <ListDropDown id={id} />
      </div>

      <div></div>
      <form className="mt-2">
        {open ? (
          <>
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
          </>
        ) : (
          <h2
            className="hover:bg-gray-100 p-1 cursor-pointer rounded"
            onClick={() => setOpen(true)}
          >
            + Add Card
          </h2>
        )}
      </form>
    </div>
  );
};

export default List;
