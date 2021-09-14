import React from "react";
import {Link} from "react-router-dom";
import s from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className= {s.LandingPage}>
      <h1>Bienvenidos a mi pagina! </h1>
      <Link to ="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  )
}

export default LandingPage;