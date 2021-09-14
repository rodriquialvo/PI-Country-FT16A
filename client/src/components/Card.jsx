import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

export const Card = ({name, flag, id, continente}) => {
  return (
    <li className =  {s.Card}>
      <Link to={`/home/${id}`} >
      <img className={s.imgCard} src={flag} alt={name}  />
      </Link>
      <div>{name}</div>
      <div>{continente}</div>
      <div>{id}</div>
    </li>
  )
}
      
