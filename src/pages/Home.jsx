import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { format } from "date-fns";


function Home() {
    const { isAuthenticated } = useAuthContext();
    const [myReservations, setMyReservations] = useState([]);
    const handleMyReservations = async () => {
        if (!isAuthenticated || isAuthenticated == undefined) {
            return
        }
        var response = await fetch(`http://localhost:4000/api/reservations/users/${isAuthenticated.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        var resJson = await response.json();
        setMyReservations(resJson);
    }
    useEffect(() => {
        handleMyReservations();
    }, [])
    const cards = [
        { id: 1, title: "Announcements", text: "Latest updates and important information.", link: "#announcements" },
        { id: 2, title: "Messages", text: "Check your messages and stay connected.", link: "#messages" },
        { id: 3, title: "Forms", text: "Access and submit necessary forms.", link: "#forms" },
        { id: 4, title: "Booking", text: "Reserve common rooms or services.", link: '/booking' },
        { id: 5, title: "Second-Hand", text: "Buy and sell pre-loved items easily.", link: "/marketplace" },
    ];
    const cardsAdmin = [
        { id: 6, title: "Admin Panel", text: "Access the admin dashboard.", link: "/admin" }
    ];

    return (
        <main className="home">
            <section className="cards">
                {cards.map((card) => (
                    <div className="card" key={card.id}>
                        <h2>{card.title}</h2>
                        <p>{card.text}</p>
                        <div className="items">
                            {card.title == "Booking" &&
                                myReservations &&
                                myReservations.slice(0, 3).map((res) => {
                                    const start = new Date(res.start);
                                    const end = new Date(res.end);
                                    const location = res.reserved_id?.location;
                                    const description = res.reserved_id?.description;

                                    return (
                                        <>
                                            <p key={res._id}>
                                                <div className="reservation-details">
                                                    <div className="reservation-info">
                                                        <p>{format(start, "MMM yyyy")}</p>
                                                        <strong>{format(start, "EE")}</strong> {format(start, "kk:00") + " - " + format(end, "kk:00")}
                                                        <br />
                                                        <span className="reservation-location">  {res.reserved_id.type + " " + res.reserved_id.identifier + ", " + (location ?? "")}</span>
                                                        <br />
                                                        <span className="reservation-description">{description}</span>
                                                    </div>
                                                </div>

                                            </p>
                                            <hr />
                                        </>
                                    )
                                })}

                        </div>
                        {card.link.startsWith("/") ? (
                            <Link to={card.link} className="btn">Open</Link> // use React Router for internal routes
                        ) : (
                            <a href={card.link} className="btn">Open</a>
                        )}
                    </div>
                ))}
                {
                    (isAuthenticated.status == 2) && cardsAdmin.map((card) => (
                        <div className="card" key={card.id}>
                            <h2>{card.title}</h2>
                            <p>{card.text}</p>
                            <div className="items"></div>
                            {card.link.startsWith("/") ? (
                                <Link to={card.link} className="btn">Open</Link> // use React Router for internal routes
                            ) : (
                                <a href={card.link} className="btn">Open</a>
                            )}
                        </div>
                    ))
                }
            </section>
        </main>
    );
}

export default Home;
