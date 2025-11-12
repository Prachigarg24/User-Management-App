import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4 flex justify-between">
    <Link to="/" className="font-bold text-lg">
      User Management
    </Link>
    <Link
      to="/create"
      className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
    >
      + Add User
    </Link>
  </nav>
);

export default Navbar;
