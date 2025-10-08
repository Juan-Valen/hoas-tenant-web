import "./BookingInstructions.css";
import { useReservationContext } from "../../contexts/ReservationContext";

export default function BookingInstructions() {
    const { activeTab } = useReservationContext();
    const instructions = {
        sauna: {
            title: "Making a Reservation for Sauna",
            rules: [
                "Reservations can be made for one hour at a time.",
                "You may make up to five reservations per month.",
                "Sauna reservations are free of charge.",
                "Please cancel your reservation if you do not intend to use it.",
            ],
        },
        ["washing machine"]: {
            title: "Laundry Booking Guidelines",
            rules: [
                "Book one slot per day to ensure fair access.",
                "Bring your own detergent and follow posted instructions.",
                "Cancel if you can't make it so others can use the time.",
            ],
        },
        dryer: {
            title: "Laundry Booking Guidelines",
            rules: [
                "Book one slot per day to ensure fair access.",
                "Bring your own detergent and follow posted instructions.",
                "Cancel if you can't make it so others can use the time.",
            ],
        },
        clubroom: {
            title: "Clubroom Booking Info",
            rules: [
                "Clubroom can be reserved for events or gatherings.",
                "Clean up after use and respect quiet hours.",
                "Reservations are limited to one per week per user.",
            ],
        },
    };

    const content = instructions[activeTab];

    return (
        <div className="booking-instructions">
            <h3>{content.title}</h3>
            <ul>
                {content.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                ))}
            </ul>
        </div>
    );
}
