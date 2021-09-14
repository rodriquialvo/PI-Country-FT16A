import React  from "react";
import s from "./Paginado.module.css";

export const Paginado = ({countriesPerPage, Countries, paginado}) => {
  const pageNumber = [];

  for(let i = 1; i <= Math.ceil(Countries/countriesPerPage); i++) {
    pageNumber.push(i)
  }
  return (
    <nav>
      <ul>
        {pageNumber && pageNumber.map(e => (
          <li key ={e} className = {s.Paginado}>
            <button className = {s.button} onClick={() => paginado(e)}>{e}</button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

    
