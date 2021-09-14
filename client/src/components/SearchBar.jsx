import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../action/index";
import s from "./SearchBar.module.css";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameCountries(name));
    setName("");
  }

  return (
    <div className = {s.searchBar}>
      <input type = "text" placeholder = "Buscar pais por nombre" onChange = {e => handleInputChange(e)}></input>
      <button type = "submit" onClick ={e => handleSubmit(e)} >Buscar</button>
    </div>
  )
}

