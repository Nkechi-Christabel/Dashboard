import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../redux/actions/userActions";
import Modal from "./Modal";

const DashBoard = () => {
  const users = useSelector((state) => state.allUsers.users);
  const { loading, error } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(null);
  const [sort, setSort] = useState(true);

  //sort alphabetcally

  const handleSort = () => {
    if (!error && !loading) {
      if (sort) {
        users.sort((a, b) => {
          a = a.username.toLowerCase();
          b = b.username.toLowerCase();
          if (a < b) {
            return -1;
          }
          if (a > b) {
            return 1;
          }
          return 0;
        });
      } else {
        users.reverse();
      }
    }
    setSort(!sort);
  };

  //invokes and dispatch the fetch request
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersDisplay = () => {
    return (
      <table className="table-auto w-full border-separate borderSpace xl:ml-6">
        <thead>
          <tr className="text-left">
            <th className="hide__mobile">Id</th>
            <th>Name</th>
            <th className="hide">Username</th>
            <th className="hide__mobile">Email</th>
            <th className="hide">City</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="hide__mobile">{user.id}</td>
              <td>{user.name}</td>
              <td className="hide">{user.username}</td>
              <td className="hide__mobile">{user.email}</td>
              <td className="hide">{user.address.city}</td>
              <td>
                <Link
                  className="py-2 px-6 rounded text-white bg-amber-500 hover:bg-amber-600  cursor-pointer"
                  to={`/EditUser/${user.id}`}
                >
                  edit
                </Link>
              </td>
              <td>
                <button
                  className="py-2 md:px-6 px-4 rounded text-white bg-red-600 hover:bg-red-700 cursor-pointer"
                  onClick={() => {
                    setId(user.id);
                    setShowModal(true);
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div>
        {loading ? (
          <div className="h-96 pt-52 flex justify-center items-center text-xl text-red-400 animate-pulse">
            Loading...
          </div>
        ) : error !== null ? (
          <div className="h-96 pt-52 flex justify-center items-center text-xl text-red-500 font-mono">
            {error}
          </div>
        ) : (
          <div className="shadow-md shadow-slate-400 rounded-md my-5 w-full">
            <div className="flex justify-between items-center flex-wrap p-3 mt-8 form__header">
              <p className="font-semibold mt-2 mr-2 text-lg">User List</p>
              <p
                onClick={handleSort}
                className="cursor-pointer font-bold mr-2 mt-2 hover:text-red-500 active:text-slate-500"
              >
                Sort by username
              </p>
              <Link to="/AddNewUser">
                <button className="rounded py-2 px-6 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer mt-2 ">
                  Add new
                </button>
              </Link>
            </div>
            <hr />
            {users.length === 0 ? (
              <div className="font-bold text-lg flex justify-center items-center h-96 text-red-600 font-mono">
                User list is currently empty!
              </div>
            ) : (
              usersDisplay()
            )}
          </div>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} id={id} />
    </>
  );
};

export default DashBoard;
