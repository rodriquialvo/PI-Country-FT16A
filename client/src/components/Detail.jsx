import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../action";
import { useEffect } from "react";
import s from "./Detail.module.css";

export  const Details = (props) => {
  console.log("*********************",props)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  },[dispatch])

  const myCountry = useSelector(state => state.details);

  return (
    <div>
      {
        myCountry !== {} ? (
          <div className = {s.DetailsContainer}>            
            <img className = {s.col} alt = {myCountry.name}src={myCountry.name === "Argentina" ? "https://e00-ar-marca.uecdn.es/claro/assets/multimedia/imagenes/2020/06/20/15926710613570.jpg" : myCountry.flag}/>

            <div className = {s.col}>
              <h1>{myCountry.name}</h1>
              <h4>Codigo del pais: {myCountry.id}</h4>
              <h4>Capital: {myCountry.capital}</h4>
              <h4>Continente: {myCountry.id}</h4>
              <h4>Subregion: {myCountry.subRegion}</h4>
              <h4>Area: {myCountry.area / 1000000} millones de Km2</h4>
              <h4>Poblacion: {myCountry.population / 1000000} millones de habitantes</h4>
              <Link to = "/home"> <button>Volver</button></Link>
            
          </div>
          <div className = {s.col}>

            <h3>Actividades Turisticas: </h3>
              {
                !(myCountry.activities && myCountry.activities.length > 0)  ? 
                  <p>No se encontraron Actividades Turisticas en las base de datos</p>              
                :
                myCountry.activities.map((e,i) => (
                  <div key = {i}>
                    <h4>Nombre: {e.name}</h4>
                    <h4>Dificultad: {e.difficulty}</h4>
                    <h4>Duracion: {e.duration}</h4>
                    <h4>Mejor Temporada para practicarla: {e.season}</h4>
                    <br/>
                  </div>  
                ))
              }
          </div>
            </div>
        ):null
      }
      
    </div>
  )
}

            
