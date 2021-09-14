import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {postActivity, getCountries} from "../action/index";
import { useDispatch, useSelector } from "react-redux";
import s from "./ActivityCreate.module.css";

const validate = (input) => {
  let errors = {};
  if(!input.name) errors.name = "Se requiere que ingrese un nombre";  
  if(!input.duration) errors.duration = "Se requiere que ingrese la duracion de la actividad";
  if(!input.difficulty) errors.difficulty = "Se requiere que seleccione una dificultad (1 como muy facil - 5 como muy dificil)";
  if(!input.season) errors.season = "Se requiere que elija la mejor tempporada para practicar esta actividad. (invierno, verano, otoño, primavera)";
  if(!input.countries.length) errors.countries = "Se requiere que elija uno o mas paises";

  return errors;
}



export const ActivityCreate = () => {
 const dispatch = useDispatch();
 const countries = useSelector(state => state.countries);
 const history = useHistory()
 const [input, setInput] = useState({
  "name":"",
  "duration": "",
  "difficulty":"", 
  "season":"", 
  "countries": [] 
 })
 const [errors, setErrors] = useState({});
 let duracion = [];
 let contador = 10;
 while(contador <= 120 ) {
   duracion.push(contador);
   contador += 10
 }

 useEffect(() => {
   dispatch(getCountries());
 }, [dispatch])
 useEffect(()=> {
   dispatch(postActivity())
 },[dispatch])

 const handleChange = (e) => {
   e.preventDefault();
   setInput({
     ...input,
     [e.target.name] : e.target.value     
   })
   setErrors(validate({
     ...input,
     [e.target.name]: e.target.value
   }))
   console.log(input)
 }

 const handleSelectCountries = (e) => {
   setInput( {
     ...input,
     countries: [...input.countries, e.target.value]
   })
 }

 const handleSumit = (e) => {
   e.preventDefault(e);
   console.log(input);
   dispatch(postActivity(input));
   alert("Actividad creada");
   setInput({
    "name":"",
    "duration": "",
    "difficulty":"", 
    "season":"", 
    "countries": [] 
   })
   history.push("/home");
 } 

 const quitarCountry = (e) => {
   
   setInput({
     ...input,
     countries: input.countries.filter(el => el !== e )
   })
 }
 
 
 return (
   <div>
     <h1 className = {s.titulo}>Creá una actividad!</h1>
     <div className = {s.volver}>

     <Link to = "/home"> <button >Volver</button></Link>
     </div>
     <form className = {s.form}>
       <div>
         <label>Nombre: </label>
           <input
          type = "text"
          value= {input.name}
          name="name"
          onChange = {e => handleChange(e)}
         />       
         {errors.name ?<p>{errors.name}</p> : null}  
       </div>
       <div>
         <label>Duracion:  </label>
          <select name ="duration" onChange = {e => handleChange(e)}>
            <option value="">Seleccionar...</option>
            {
              duracion.map((e,i) => (
                <option value={e} key={i}>{e} minutos</option>
              ))
            }
          </select>
          {errors.duration ?<p>{errors.duration}</p> : null} 
       </div>
       <div>
          <label>Dificultad: </label>
          <select name = "difficulty"  onChange = {e => handleChange(e)}>
            <option value="">Seleccionar...</option>
            <option  value = "1">1</option>
            <option  value = "2">2</option>
            <option  value = "3">3</option>
            <option  value = "4">4</option>
            <option  value = "5">5</option>          
          </select>  
          {errors.difficulty ?<p>{errors.difficulty}</p> : null}       
       </div>
       <div>
         <label>Temporada: </label>
          <select name = "season" onChange = {e => handleChange(e)}>
            <option value="">Seleccionar...</option>
            <option value = "verano">Verano</option>
            <option  value = "otoño">Otoño</option>
            <option  value="invierno">Invierno</option>
            <option  value = "primavera">Primavera</option>
          </select>
          {errors.season ?<p>{errors.season}</p> : null} 
       </div>
       <div>
         <label>Paises: </label>
         <select onChange={e => handleSelectCountries(e)}>
           <option value="">Seleccionar...</option>
           {
             countries.length && countries.map((e,i) => (
               <option key={i} value={e.name}>{e.name}</option>
             ))
           }
         </select>
         {errors.countries ?<p>{errors.countries}</p> : null} 
       </div>
       <ul><li>{input.countries.length && input.countries.map((e,i) => (
         <span key = {i}>
           <span>{e} </span>
           <button onClick ={() => quitarCountry(e)}>X</button>
         </span>
       ))}</li></ul>
       <button type="submit" disabled={!(input.name && input.difficulty && input.duration && input.season && input.countries.length)} onClick= {(e) => handleSumit(e)}>Crear actividad turistica</button>
     </form>
   </div>
 )
}