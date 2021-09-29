import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import DeleteModal from "../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, updateCard } from "../features/board/boardSlice";
import { RootState } from "../app/store";
import Modal from "../components/Modal";

interface props {
  cardId: string;
  listId: string;
}

export default function Example(props: props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();

  const deleteCardHandler = () => {
    dispatch(
      deleteCard({
        cardId: props.cardId,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        listId: props.listId,
      })
    );
  };

  const updateCardHandler = (title: string) => {
    dispatch(
      updateCard({
        cardId: props.cardId,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        title,
      })
    );
  };

  return (
    <>
      <Modal
        open={openEdit}
        setOpen={setOpenEdit}
        create={updateCardHandler}
        inputPlaceholder="Enter Card Title"
        title="Edit card title"
        btnText="Update"
      />
      <DeleteModal
        id="id"
        delete={deleteCardHandler}
        open={open}
        setOpen={setOpen}
        title="Do you want to delete this card?"
      />
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md ">
            <h1 className="font-medium px-2" style={{ zIndex: 1 }}>
              ...
            </h1>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            style={{ zIndex: 2 }}
            className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={
                      active
                        ? "bg-gray-100 text-gray-900 block px-4 py-2 text-sm w-full"
                        : "text-gray-700 block px-4 py-2 text-sm w-full"
                    }
                    onClick={() => setOpenEdit(true)}
                  >
                    Edit Card
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={
                      active
                        ? "bg-gray-100 text-gray-900 block px-4 py-2 text-sm w-full"
                        : "text-gray-700 block px-4 py-2 text-sm w-full"
                    }
                    onClick={() => setOpen(true)}
                  >
                    Delete Card
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
