import { useEffect, useState } from "react";
import BookingReservationModal from "../../components/admin/BookingResourceModal";
import Toast from "../../components/admin/Toast";
import TabSwitcher from "../../components/admin/TabSwitcher";
import "../../styles/AdminStyles.css";
import { useAuthContext } from "../../contexts/AuthContext";

export default function AdminBooking() {
    // Tabs: sauna, laundry, clubroom
    const [activeTab, setActiveTab] = useState("sauna");

    // List of resources
    const [reservations, setReservations] = useState([]);

    // Modal state
    const [modalReservation, setModalResource] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Toast state
    const [toast, setToast] = useState({ message: "", type: "" });

    // Open modal for add/edit
    const openModal = (resource = null) => {
        setModalResource(resource);
        setShowModal(true);
    };
    const closeModal = () => setShowModal(false);

    // Add or update resource
    const handleSubmit = (formData) => {
        if (modalReservation) {
            handleNewReservation(formData);
            setToast({ message: "Reservation updated successfully!", type: "success" });
        } else {
            handleUpdateReservation(formData);
            setToast({ message: "Reservation added successfully!", type: "success" });
        }
        closeModal();
    };

    // Delete resource
    const handleDelete = (id) => {
        handleDeleteReservation(id);
        setToast({ message: "Reservation deleted!", type: "success" });
    };
    useEffect(() => {
        handleReservations();
    }, [activeTab])

    // Filter resources by active tab
    const { isAuthenticated } = useAuthContext();
    const handleReservations = async () => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(`http://localhost:4000/api/reservations/reservables`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: activeTab,
            }),
        });
        var resJson = await response.json();
        setReservations(resJson);
    }
    useEffect(() => {
        handleReservations();
    }, [])

    const handleNewReservation = async (formData) => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var url;
        if (formData.type == "sauna" || formData.type == "clubroom") {
            url = `http://localhost:4000/api/spaces`;
        } else if (formData.type == "dryer" || formData.type == "washing machine") {
            url = `http://localhost:4000/api/items`;
        }
        await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identifier: formData.identifier,
                type: formData.type,
                location: formData.location,
                maintenance: 0,
                reservable: true,
                description: formData.description,
                created_by: isAuthenticated.id
            }),
        });
        handleReservations();
    }
    const handleUpdateReservation = async (formData) => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var url;
        if (formData.type == "sauna" || formData.type == "clubroom") {
            url = `http://localhost:4000/api/spaces/`;
        } else if (formData.type == "dryer" || formData.type == "washing machine") {
            url = `http://localhost:4000/api/items/`;
        }
        var response = await fetch(`${url}${formData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                identifier: formData.identifier,
                type: formData.type,
                maintenance: formData.maintenance,
                reservable: true,
                description: formData.description,
                created_by: isAuthenticated.id
            }),
        });
        if (response.ok) {
            console.log("successful");
        } else {
            console.error("Update reservation Unsuccessful");
        }
    }
    const handleDeleteReservation = async (id) => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var url;
        if (activeTab == "sauna" || activeTab == "clubroom") {
            url = `http://localhost:4000/api/spaces/`;
        } else if (activeTab == "dryer" || activeTab == "washing machine") {
            url = `http://localhost:4000/api/items/`;
        }
        var response = await fetch(`${url}${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            handleReservations();
            console.log("successful");
        } else {
            console.error("Delete reservation Unsuccessful");
        }
    }

    return (
        <div className="admin-booking-page">
            <h2>Manage Booking Reservations</h2>

            {/* Tab navigation */}
            <TabSwitcher tabs={["washing machine", "dryer", "sauna", "clubroom"]} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Controls */}
            <div className="admin-controls">
                <button className="btn" onClick={() => openModal({ type: activeTab })}>
                    Add New Reservation
                </button>
            </div>

            {/* Reservation Table */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.length > 0 ? (
                        reservations.map((res) => (
                            <tr key={res._id}>
                                <td>{activeTab + " " + res.identifier}</td>
                                <td>{res.location}</td>
                                <td>{res.description}</td>
                                <td>
                                    <button onClick={() => openModal({ ...res, type: activeTab })}>Edit</button>
                                    <button onClick={() => handleDelete(res._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No resources found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Add/Edit */}
            <BookingReservationModal
                show={showModal}
                onClose={closeModal}
                onSubmit={handleSubmit}
                resource={modalReservation}
            />

            {/* Toast Notifications */}
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ message: "", type: "" })}
            />

            {/* Preview of current bookings
            <div className="booking-preview">
                <h3>Preview of Current Bookings (Simulated)</h3>
                <ul>
                    {reservations.map((r) => (
                        <li key={r._id}>
                            {r.reserved_type}: {r.maxReservations} max reservations, {r.openingHours}
                        </li>
                    ))}
                </ul>
            </div>
            */}
        </div>
    );
}
