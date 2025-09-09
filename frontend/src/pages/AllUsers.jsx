import React, { useEffect, useState } from "react";
import { SummaryAPI } from "../commonFile/Summary";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import moment from "moment";
import ChangeUserRole from "../component/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setallUser] = useState([]);
  const [updateRole, setupdateRole] = useState(false);
  const [upadteUserDataRole, setupdateUserDataRole] = useState({
    email: "",
    name: "",
    role: "",
    userId: "",
  });

  const findAllUsers = async () => {
    const findUsers = await fetch(SummaryAPI.allUserShow.url, {
      method: SummaryAPI.allUserShow.method,
      credentials: "include",
    });

    const dataAPI = await findUsers.json();
    if (dataAPI.success) {
      setallUser(dataAPI.data);
    }

    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }
  };

  useEffect(() => {
    findAllUsers();
  }, []);

  return (
    <>
      <div className=" p-4">
        <table className="w-full userTable">
          <thead className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </thead>
          <tbody>
            {allUser.map((users, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1} </td>
                  <td>{users.name} </td>
                  <td>{users.email} </td>
                  <td>{users.role} </td>
                  <td>{moment(users.createdAt).format("ll")} </td>
                  <td>
                    <button
                      className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white"
                      onClick={() => {
                        setupdateUserDataRole(users);
                        setupdateRole(true);
                      }}
                    >
                      <CiEdit />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-10">
          {updateRole && (
            <ChangeUserRole
              onClose={() => setupdateRole(false)}
              name={upadteUserDataRole.name}
              email={upadteUserDataRole.email}
              role={upadteUserDataRole.role}
              userId={upadteUserDataRole._id}
              callFun={findAllUsers}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
