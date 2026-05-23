import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://13.233.101.36:5000/users"
      );

      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://13.233.101.36:5000/delete-user/${id}`
      );

      alert("User Deleted");

      fetchUsers();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Panel</h1>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid white",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>

          <button
            onClick={() => deleteUser(user._id)}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
