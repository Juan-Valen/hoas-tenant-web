import React from "react";
import { Link } from "react-router-dom"; 

function Home() {
  const cards = [
    { id: 1, title: "Announcements", text: "Latest updates and important information.", link: "#announcements" },
    { id: 2, title: "Messages", text: "Check your messages and stay connected.", link: "#messages" },
    { id: 3, title: "Forms", text: "Access and submit necessary forms.", link: "#forms" },
    { id: 4, title: "Booking", text: "Reserve common rooms or services.", link: "#booking" },
    { id: 5, title: "Second-Hand Marketplace", text: "Buy and sell pre-loved items easily.", link: "/marketplace" }, 
  ];

  return (
    <main className="home">
      <section className="cards">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            {card.link.startsWith("/") ? (
              <Link to={card.link} className="btn">Open</Link> // use React Router for internal routes
            ) : (
              <a href={card.link} className="btn">Open</a>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
