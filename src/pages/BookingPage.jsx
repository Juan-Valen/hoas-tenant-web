import BookingTabs from "../components/booking/BookingTabs";
import UserReservations from "../components/booking/UserReservations";
import BookingInstructions from "../components/booking/BookingInstructions";
import BookingCalendar from "../components/booking/BookingSchedule";
import CalendarHeader from "../components/booking/CalendarHeader";
import "./BookingPage.css";
import ReservationContextProvider from "../contexts/ReservationContext";

export default function BookingPage() {
    return (
        <ReservationContextProvider >
            <main>
                <div className="booking-page">
                    <BookingTabs />
                    <div className="booking-layout">
                        <aside className="booking-sidebar">
                            <UserReservations />
                            <BookingInstructions />
                        </aside>
                        <main className="booking-main">
                            <CalendarHeader />
                            <BookingCalendar />
                        </main>
                    </div>
                </div>
            </main>
        </ReservationContextProvider >
    );
}
