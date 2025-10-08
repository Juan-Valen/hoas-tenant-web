import { createContext, useContext, useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { useAuthContext } from "./AuthContext";

export const ReservationContext = createContext(null);
export default function ReservationContextProvider(props) {
    const { isAuthenticated } = useAuthContext();

    const [selectedReservations, setSelectedReservations] = useState([]);
    const [myReservations, setMyReservations] = useState([]);
    const [activeTab, setActiveTab] = useState("sauna");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const url = "http://localhost:4000";
    const cancelReservation = async (id) => {
        const response = await fetch(url + `/api/reservations/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            handleMyReservations()
            handleFullslots();
        }

    }
    const makeReservation = async (id, type, start, end) => {
        const response = await fetch(url + `/api/reservations`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reserved_id: id,
                reserved_by: isAuthenticated.id,
                reserved_type: type,
                start: start.toUTCString(),
                end: end.toUTCString()
            })
        });
        if (response.ok) {
            handleMyReservations()
        }
    }
    const handleMyReservations = async () => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(url + `/api/reservations/users/${isAuthenticated.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        var resJson = await response.json();
        setMyReservations(resJson);
        response = await fetch(url + `/api/reservations/fullslots`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ start: format(selectedDate, "yyyy-MM-dd"), end: format(addDays(selectedDate, 1), "yyyy-MM-dd") })
        });
        resJson = await response.json();
        setSelectedReservations(resJson);
    }
    useEffect(() => {
        handleMyReservations();
    }, [isAuthenticated])

    const handleFullslots = async () => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(url + `/api/reservations/fullslots`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ start: format(selectedDate, "yyyy-MM-dd"), end: format(addDays(selectedDate, 1), "yyyy-MM-dd") })
        });
        var resJson = await response.json();
        setSelectedReservations(resJson);
    }
    useEffect(() => {
        handleFullslots();
    }, [isAuthenticated, selectedDate])
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedDate(new Date()); // Reset calendar to today
        //  CALL selected reservatiosn reservations
    };

    const handleReserve = (id, start, end) => {
        //  POST RESERVATION
        //  CALL MY RESERVATIONS
    };

    const handleCancel = (id) => {
        //  DELETE RESERVATIONS
        //  CALL MY RESERVATIONS
        //  CALL selected reservatiosn reservations
    };
    const reservations = {
        selectedReservations,
        setSelectedReservations,
        myReservations,
        handleMyReservations,
        handleFullslots,
        makeReservation,
        cancelReservation,
        activeTab,
        selectedDate,
        setSelectedDate,
        handleTabChange,
        handleReserve,
        handleCancel
    };
    return (<ReservationContext.Provider value={reservations}>{props.children}</ReservationContext.Provider>);
}

export function useReservationContext() {
    const context = useContext(ReservationContext);
    if (!context) {
        throw new Error("useReservationContext must be used within a ReservationContextProvider");
    }
    return context;
}
