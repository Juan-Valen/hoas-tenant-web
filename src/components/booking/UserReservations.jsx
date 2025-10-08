import "./UserReservations.css";
import { useReservationContext } from "../../contexts/ReservationContext";
import { format } from "date-fns";

export default function UserReservations() {
    const { myReservations, cancelReservation } = useReservationContext();
    return (
        <div className="user-reservations">
            <h2>Your Reservations</h2>
            {myReservations.length === 0 ? (
                <p>No reservations yet.</p>
            ) : (
                <ul>
                    {Array.isArray(myReservations) && myReservations && myReservations.map((res) => {
                        const start = new Date(res.start);
                        const end = new Date(res.end);
                        const location = res.reserved_id?.location;
                        const description = res.reserved_id?.description;

                        return (
                            <li key={res._id}>
                                <div className="reservation-details">
                                    <div className="reservation-info">
                                        <p>{format(start, "MMM yyyy")}</p>
                                        <strong>{format(start, "EE")}</strong> {format(start, "kk:00") + " - " + format(end, "kk:00")}
                                        <br />
                                        <span className="reservation-location">  {res.reserved_id.type + " " + res.reserved_id.identifier + ", " + (location??"")}</span>
                                        <br />
                                        <span className="reservation-description">{description}</span>
                                    </div>
                                    <button onClick={() => cancelReservation(res._id)}>Cancel</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
}
