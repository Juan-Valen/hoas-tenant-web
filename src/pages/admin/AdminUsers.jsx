import React, { useState } from "react";
import UserModal from "../../components/admin/UserModal";
import Toast from "../../components/admin/Toast";
import "../../styles/AdminStyles.css";

function AdminUsers() {
  const initialUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [searchId, setSearchId] = useState("");
  const [modalUser, setModalUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  const openModal = (user = null) => {
    setModalUser(user);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = (formData) => {
    if (modalUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === modalUser.id ? { ...u, ...formData } : u))
      );
      setToast({ message: "User updated successfully!", type: "success" });
    } else {
      const newUser = {
        id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        ...formData,
      };
      setUsers((prev) => [...prev, newUser]);
      setToast({ message: "User added successfully!", type: "success" });
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setToast({ message: "User deleted!", type: "success" });
  };

  const filteredUsers = users.filter((user) =>
    searchId === "" ? true : user.id.toString().includes(searchId)
  );

  return (
    <div>
      <h2>Manage Users</h2>

      <div className="admin-controls">
        <button className="btn" onClick={() => openModal()}>
          New User
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => openModal(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <UserModal
        show={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        user={modalUser}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
}

export default AdminUsers;
