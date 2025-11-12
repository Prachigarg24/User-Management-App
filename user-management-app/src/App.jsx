import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetails from "./components/UserDetails";
import Spinner from "./components/Spinner";
import { fetchUsers, createUser, updateUser, deleteUser } from "./api";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load users on mount (check localStorage first)
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const savedUsers = localStorage.getItem("usersData");
        if (savedUsers) {
          setUsers(JSON.parse(savedUsers));
        } else {
          const data = await fetchUsers();
          setUsers(data);
          localStorage.setItem("usersData", JSON.stringify(data));
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // ✅ Helper to sync with localStorage
  const syncLocalStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
  };

  // ➕ Add new user
  const handleAddUser = async (newUser) => {
    try {
      const created = await createUser(newUser);
      const fakeId = users.length + 1;
      const updated = [...users, { ...created, id: fakeId }];
      syncLocalStorage(updated);
      alert("✅ User added successfully (saved locally).");
    } catch (err) {
      alert(err.message);
    }
  };

  // ✏️ Update user
 const handleUpdateUser = async (updatedUser) => {
  try {
    if (updatedUser.id <= 10) {
      // ✅ For API users (1-10)
      await updateUser(updatedUser.id, updatedUser);
    }

    // ✅ For both local and API users
    const updated = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    syncLocalStorage(updated);
    alert("✅ User updated successfully (saved locally).");
  } catch (err) {
    alert("❌ Failed to update: " + err.message);
  }
};


  // ❌ Delete user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      const updated = users.filter((u) => u.id !== id);
      syncLocalStorage(updated);
      alert("🗑️ User deleted successfully (saved locally).");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<UserList users={users} onDelete={handleDeleteUser} />}
        />
        <Route
          path="/create"
          element={<UserForm onSubmit={handleAddUser} />}
        />
        <Route
          path="/edit/:id"
          element={<UserForm users={users} onSubmit={handleUpdateUser} />}
        />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
