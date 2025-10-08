import { format, setHours } from "date-fns";
import { useReservationContext } from "../../contexts/ReservationContext";

function TimeSlots({ start, end, cycles, _id, type }) {

    const slots = Array((end - start) / cycles).fill();
    const { selectedReservations, cancelReservation, makeReservation, myReservations, selectedDate } = useReservationContext();
    const handleClick = async (status, start, end, res_id) => {

        if (status == "reserved") {
            return
        }
        if (status == "cancel") {
            await cancelReservation(res_id);
        } else if (status == "vacant") {
            await makeReservation(_id,type, start, end);
        }
    }
    return (
        <>
            {slots &&
                slots.map((_, i) => {
                    const first = i * cycles + start;
                    const second = (i + 1) * cycles + start;
                    const myReservationIndex = myReservations && myReservations.findIndex((r) => {
                        const st = new Date(r.start)
                        const en = new Date(r.end)
                        var st_t = setHours(new Date(selectedDate), first)
                        var en_t = setHours(new Date(selectedDate), second)
                        const fmt = "yyyy-MM-dd kk";

                        return format(st, fmt) == format(st_t, fmt) && format(en, fmt) == format(en_t, fmt) && r.reserved_id._id == _id;
                    });
                    const reservationIndex = selectedReservations && selectedReservations.findIndex((r) => {
                        const st = new Date(r.start)
                        const en = new Date(r.end)
                        var st_t = setHours(new Date(selectedDate), first)
                        var en_t = setHours(new Date(selectedDate), second)
                        const fmt = "yyyy-MM-dd kk";

                        return format(st, fmt) == format(st_t, fmt) && format(en, fmt) == format(en_t, fmt) && r._id == _id;
                    })
                    return <li key={i}>
                        <span>
                            {first + " - " + second}
                        </span>
                        {
                            myReservationIndex != -1 ?
                                <button
                                    onClick={() => handleClick(
                                        "cancel",
                                        null,
                                        null,
                                        myReservations[myReservationIndex]._id)}>
                                    Cancel
                                </button> :
                                reservationIndex != -1 ?
                                    <p>RESERVED</p> :
                                    <button onClick={() => handleClick(
                                        "vacant",
                                        setHours(new Date(selectedDate), first),
                                        setHours(new Date(selectedDate), second))}>
                                        Vacant
                                    </button>
                        }
                    </li >
                })
            }
        </>
    )

}

export default TimeSlots;
