import React from "react";
import { useParams, Link } from "react-router-dom";

const UserDetails = ({ users }) => {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return <p>User not found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <Link
        to="/"
        className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to List
      </Link>
    </div>
  );
};

export default UserDetails;
