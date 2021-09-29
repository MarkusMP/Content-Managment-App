import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import DeleteModal from "../components/DeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoard, updateBoard } from "../features/board/boardSlice";
import { RootState } from "../app/store";
import UpdateBoardModal from "../components/UpdateBoardModal";
import { useHistory } from "react-router-dom";
import { deleteTheBoard } from "../features/boards/boardsSlice";

interface props {
  boardId: string;
}

export default function Example(props: props) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteBoardHandler = () => {
    dispatch(
      deleteBoard({
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        boardId: props.boardId,
      })
    );
    dispatch(deleteTheBoard({ boardId: props.boardId }));
    history.push("/dashboard");
  };

  const updateBoardHandler = (title: string, backgroundURl: string) => {
    console.log(title);
    dispatch(
      updateBoard({
        refreshToken: userInfo.refreshToken,
        accessToken: userInfo.accessToken,
        boardId: props.boardId,
        backgroundURL: backgroundURl,
        title: title,
      })
    );
  };

  return (
    <>
      <UpdateBoardModal
        open={openEdit}
        setOpen={setOpenEdit}
        create={updateBoardHandler}
        inputPlaceholder="Enter Board Title"
        title="Edit Board title"
        btnText="Update"
      />
      <DeleteModal
        id="id"
        delete={deleteBoardHandler}
        open={open}
        setOpen={setOpen}
        title="Do you want to delete this Board?"
      />
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-md ">
            <h1 className="font-medium px-2" style={{ zIndex: 1 }}>
              <i className="fas fa-cog"></i>
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
                    Edit Board
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
                    Delete Board
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
