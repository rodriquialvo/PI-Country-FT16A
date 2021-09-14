import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { filtradoPorActividad, getActivities, getCountries, ordenAlfabetico, ordenPoblacion } from "../action";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Paginado } from "./Paginado";
import { filtradoPorContinente } from "../action";
import { SearchBar } from "./SearchBar";
import s from "./Controles.module.css";
import s2 from "./Grid.module.css"

export const Home = () => {  
  const dispatch = useDispatch();
  const Countries = useSelector(state => state.countries);
  const Activities = useSelector(state => state.activities);
  const [currentPage,setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);
  const [orden, setOrden] = useState("");
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
  const currentCountries = Countries.slice(indexOfFirstCountry, indexOfLastCountry);
  
  console.log(currentCountries)
  
  
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }   
  useEffect(() => {
    dispatch(getActivities());
  },[dispatch]);

  useEffect(() => {
    dispatch(getCountries());
  },[dispatch]);

  const handleClick = e => {
    e.preventDefault();
    dispatch(getCountries()); 
  }

  const handleFiltradoPorContinente = (e) => {
    e.preventDefault();
    dispatch(filtradoPorContinente(e.target.value));
  }

  const handleOrdenPorActividad = (e) => {
    e.preventDefault();
    if(e.target.value === "Ninguna") {
      dispatch(getCountries());
    }else{
      dispatch(filtradoPorActividad(e.target.value));
    }
  }

  const handleOrdenAlfabetico = (e) => {
    e.preventDefault();
    dispatch(ordenAlfabetico(e.target.value));
    setCurrentPage(1);
    setOrden("Ordenado" + e.target.value);
  } 

  const handleOrdenamientoPoblacion = (e) => {
    e.preventDefault();
    dispatch(ordenPoblacion(e.target.value));
    setCurrentPage(1);
    setOrden("Ordenado" + e.target.value);
  }
  // console.log(countriesPerPage)
  return (
    <div>
      <Link to = "/home">
        <div className = {s.titulo}>
      <h1>Henry Countries</h1>      

        </div>
      </Link>
      <SearchBar/>
      <div className = {s.controles}>
      <div className = {s.botones}>
        <button onClick= {e => handleClick(e)}>VOLVER A CARGAR TODOS LOS PAISES</button>
        <Link to= "/crear"><button>Crear Actividad</button></Link>
      </div>
      <div>
        
        <select onChange={e => handleOrdenAlfabetico(e)}>
          <option>Filtrado por orden alfabetico:</option>
          <option value ="asc">A - Z</option>
          <option value ="desc">Z - A</option>
        </select>
        
        <select onChange={e => handleFiltradoPorContinente(e)}>
          <option>Filtrado por Continente:</option>
          <option value="todos">Todos</option>
          <option value="Americas">America</option>
          <option value="Europe">Europa</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>
        
        <select onChange={ e => handleOrdenPorActividad(e)}>
          <option value= "Default" >Filtrado por Actividades: </option>
          <option value= "Ninguna"> Ninguna </option>
          <option value='DEFAULT'  hidden>Select...</option>
          {Activities.length > 0 ? Activities.map((e,i) => (
            <option  value ={e.name} key={i}>{e.name}</option>
          )): null}
        </select>
        
        <select onChange={e => handleOrdenamientoPoblacion(e)}>
        <option >Filtrado por Cantidad de Poblacion: </option>
        <option value = "asc">Ascendente:</option>
        <option value = "desc">Descendiente:</option>
        </select>    

      </div>
       
        
        
        <div>
          <ul className = {s2.Grid}>
            {
            currentCountries.length ? currentCountries.map((e, index) => (          
              <Card
              key={index}
              name= {e.name} 
              flag = {e.flag} 
              continente={e.region} 
              id={e.id} />              
            )):null}
          </ul>
        </div>
        <div>
          <Paginado
            countriesPerPage= {countriesPerPage}
            Countries = {Countries.length} 
            paginado={paginado}
          />

        </div>
      </div>
    </div>
  )
}
       
                


