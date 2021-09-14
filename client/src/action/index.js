import axios from "axios";



export const  getCountries = () => {
  return async (dispatch) => {
    let json =await axios.get("http://localhost:3001/countries",);
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data
    })
  }
}
export const getNameCountries = (payload) => {
  return async (dispatch) => {
    try {
      let json =await axios.get(`http://localhost:3001/countries?name=${payload}`);
      return dispatch({
        type:"GET_NAME_COUNTRIES",
        payload: json.data
      })
    }catch(error){
      console.log(error);
    }
  }
}

export const  getActivities = () => {
  return async (dispatch) => {
    let json =await axios.get("http://localhost:3001/activity",);
    if(!json.data.length) return dispatch({
      type: "GET_ACTYVITIES",
      payload: [] 
    })
    return dispatch({
      type: "GET_ACTYVITIES",
      payload: json.data 
    })
  }    
}

export const getDetails = (payload) => {
  return async (dispatch) => {
    try {
      let json = await axios.get(`http://localhost:3001/countries/${payload}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    }catch(error) {
      console.log(error);
    }
  }
}

export const  postActivity = (payload) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/activity", payload);
    console.log(response)
    return dispatch({
      type: "POST_ACTIVITY"
    })
  }
}

export const filtradoPorContinente = (payload) => {
  console.log(payload)
  return {
    type: "FILTRADO_POR_CONTINENTE",
    payload
  }
}

export const filtradoPorActividad = (payload) => {
  return {
    type: "FILTRADO_POR_ACTIVIDAD",
    payload
  }  
}

export const ordenAlfabetico = (payload) => {
  return {
    type: "ORDEN_ALFABETICO",
    payload
  }
} 

export const ordenPoblacion = (payload) => {
  return {
    type: "ORDEN_POBLACION",
    payload
  }
}
    