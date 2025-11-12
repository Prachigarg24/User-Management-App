import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserForm = ({ users = [], onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editingUser = id ? users.find((u) => u.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
  }, [editingUser]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = id
      ? { ...formData, id: parseInt(id) }
      : { ...formData };
    onSubmit(dataToSubmit);
    navigate("/");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit User" : "Add New User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
