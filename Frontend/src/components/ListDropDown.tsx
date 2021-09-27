import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import DeleteModal from "../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteList, updateList } from "../features/board/boardSlice";
import { RootState } from "../app/store";
import Modal from "../components/Modal";

interface props {
  id: string;
}

export default function Example(props: props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();

  const deleteListHandler = () => {
    dispatch(
      deleteList({
        listId: props.id,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
      })
    );
  };

  const updateListHandler = (title: string) => {
    dispatch(
      updateList({
        listId: props.id,
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        title: title,
      })
    );
  };

  return (
    <>
      <Modal
        open={openEdit}
        setOpen={setOpenEdit}
        create={updateListHandler}
        inputPlaceholder="Enter List Title"
        title="Edit list title"
        btnText="Update"
      />
      <DeleteModal
        id="id"
        delete={deleteListHandler}
        open={open}
        setOpen={setOpen}
        title="Do you want to delete this list?"
      />
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md ">
            <h1 className="font-medium px-2">...</h1>
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
          <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    Edit List
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
                    Delete List
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
