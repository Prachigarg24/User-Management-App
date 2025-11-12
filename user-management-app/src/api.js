// api.js
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// 🧠 Fetch all users
export const fetchUsers = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
};

// ➕ Create new user
export const createUser = async (user) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to create user");
  return await res.json();
};

// ✏️ Update user
export const updateUser = async (id, user) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
};

// ❌ Delete user
export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete user");
  return true;
};
