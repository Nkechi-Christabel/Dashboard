import { useDispatch } from "react-redux";
import { deletedUser } from "../redux/actions/userActions";

const Modal = ({ showModal, setShowModal, id }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // DISPATCH DELETE USER
    dispatch(deletedUser(id));
  };
  return (
    <>
      {/* Modal for Restore Button */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative w-full flex flex-col bg-white outline-none focus:outline-none py-10">
                {/*header*/}
                <div className="text-center sm:text-left px-5  pb-3">
                  <h3 className="text-2xl text-text-grey font-semibold">
                    Delete
                  </h3>
                </div>
                <hr />
                {/*body*/}
                <div className="relative py-6 px-5">
                  <p className="mt-3 mb-4 text-text-grey text-lg text-center sm:text-left">
                    Are you sure you want to delete this user permanently?
                  </p>
                </div>
                {/*footer*/}
                <hr />
                <div className="flex items-center justify-center sm:justify-end px-3 mt-3">
                  <button
                    className="rounded-sm bg-gray-500 text-white hover:bg-gray-600 font-semibold px-6 py-3 text-sm outline-none focus:outline-none mr-5 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-500 text-white hover:bg-red-600 font-semibold text-sm px-6 py-3 rounded-sm shadow hover:shadow-xlg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      handleDelete(id);
                      setShowModal(false);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
