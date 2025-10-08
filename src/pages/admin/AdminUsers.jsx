import React, { useEffect, useState } from "react";
import UserModal from "../../components/admin/UserModal";
import Toast from "../../components/admin/Toast";
import "../../styles/AdminStyles.css";
import { useAuthContext } from "../../contexts/AuthContext";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
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
            handleUpdateUser(formData);
            handleUsers()
            setToast({ message: "User updated successfully!", type: "success" });
        } else {
            handleNewUser(formData);
            handleUsers();
            setToast({ message: "User added successfully!", type: "success" });
        }
        closeModal();
    };

    const handleDelete = (id) => {
        handleDeleteUser(id);
        setToast({ message: "User deleted!", type: "success" });
    };

    const filteredUsers = users.length > 0 && users && users.filter((user) =>
        search === "" ? true : user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)
    );





    const { isAuthenticated } = useAuthContext();
    const handleUsers = async () => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(`http://localhost:4000/api/users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        var resJson = await response.json();
        setUsers(resJson);
    }
    useEffect(() => {
        handleUsers();
    }, [])

    const handleNewUser = async (formData) => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        await fetch(`http://localhost:4000/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                status: Number(formData.role),
            }),
        });
        handleUsers();
    }
    const handleUpdateUser = async (formData) => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(`http://localhost:4000/api/users/${formData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                status: Number(formData.role),
            }),
        });
        if (response.ok) {
            console.log("successful");
        } else {
            console.error("Update user Unsuccessful");
        }
    }
    const handleDeleteUser = async (id) => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(`http://localhost:4000/api/users/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            handleUsers();
            console.log("successful");
        } else {
            console.error("Update user Unsuccessful");
        }
    }





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
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.status == 2 ? "Admin" : "User"}</td>
                                <td>
                                    <button onClick={() => openModal(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user._id)}>Delete</button>
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
