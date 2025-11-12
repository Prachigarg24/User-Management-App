import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, onDelete }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-gray-100">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2 text-center">
                <Link
                  to={`/users/${u.id}`}
                  className="text-blue-600 hover:underline mx-1"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${u.id}`}
                  className="text-yellow-600 hover:underline mx-1"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(u.id)}
                  className="text-red-600 hover:underline mx-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add User
        </Link>
      </div>
    </div>
  );
};

export default UserList;
