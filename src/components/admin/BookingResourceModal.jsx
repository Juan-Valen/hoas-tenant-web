import React, { useState, useEffect } from "react";

export default function BookingResourceModal({ show, onClose, onSubmit, resource }) {
    const [formData, setFormData] = useState({
        type: "",
        identifier: "",
        reserved_type: "sauna",
        location: "",
        description: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (resource) {
            setFormData(resource);
        } else {
            setFormData({
                identifier: "",
                type: "sauna",
                location: "",
                description: "",
            });
        }
        setError("");
    }, [resource, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.identifier || !formData.type || !formData.location || !formData.description) {
            setError("Please fill all required fields.");
            return;
        }
        if (formData.maxReservations <= 0) {
            setError("Max reservations must be at least 1.");
            return;
        }
        onSubmit(formData);
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{resource?.identifier ? "Edit Resource" : "Add New Resource"}</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="identifier"
                        placeholder="Name (machine number, room number)"
                        value={formData.identifier}
                        onChange={handleChange} />
                    <select name="type" disabled={resource?.identifier} value={formData.type} onChange={handleChange}>
                        <option value="sauna">Sauna</option>
                        <option value="washing machine">Washing Machine</option>
                        <option value="dryer">Dryer</option>
                        <option value="clubroom">Clubroom</option>
                    </select>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location (Staircase D first floor)"
                        value={formData.location}
                        onChange={handleChange} />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange} />
                    {error && <p className="error">{error}</p>}
                    <div className="modal-footer">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn">{resource?.identifier ? "Update" : "Add"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
