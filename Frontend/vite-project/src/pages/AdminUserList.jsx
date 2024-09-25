import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth(); //

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users. Please try again.");
      }
    };

    if (user && user.role === "admin") {
      fetchUsers();
    } else {
      setError("You do not have permission to view this page.");
    }
  }, [user]);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user. Please try again.");
      }
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hantera användare</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Användarnamn</th>
            <th>Email</th>
            <th>åtgärder</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`/admin/users/edit/${user._id}`}
                  className="text-blue-500 mr-2"
                >
                  Uppdatera
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="text-red-500"
                >
                  Radera
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
