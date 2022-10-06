import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.js";
import "../styles/Home.css";

function Home() {
  // Coleta o nome do usuário logado
  const name = JSON.parse(sessionStorage.getItem("user")).librarian_name.split(
    " "
  )[0];
  const [message, setMessage] = useState("");

  function getMessage() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setMessage("Bom dia");
    } else if (hour >= 12 && hour < 18) {
      setMessage("Boa tarde");
    } else {
      setMessage("Boa noite");
    }
  }

  useEffect(() => {
    getMessage();
  });

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-text">
          <span className="home-title">
            {message}, {name}!
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
