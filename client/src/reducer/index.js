const initialState = {
  countries: [],
  allCountries: [],
  activities: [],
  allActivities: [],
  details: {}

}

function rootReducer(state = initialState, action) {
  console.log("ACTION***************************",action.payload)
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload
      }
   
    case "GET_ACTYVITIES":
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload
      }
    
    case "GET_NAME_COUNTRIES" :
      return {
        ...state,
        countries: action.payload
      }

      case "GET_DETAILS":
        return {
          ...state,
          details: action.payload
          
        }
    
    case "POST_ACTIVITY":
      return {
        ...state
      }  

    case "FILTRADO_POR_CONTINENTE":
      const allCountries = state.allCountries
      const countryFiltrado = action.payload === "todos" ? allCountries : allCountries.filter(e => e.region === action.payload)
      return {
        ...state,
        countries: countryFiltrado
      }
    case "FILTRADO_POR_ACTIVIDAD":
      const allCountries2 = state.allCountries;
      const allActivities = state.allActivities;
      let filtradoPorActividad = allActivities.find(e => e.name === action.payload);
      let countryFiltrado2 = [];

      if(filtradoPorActividad){
        let arrDeNombres = filtradoPorActividad.countries.map(e => e.name);
        for(let i = 0; i < allCountries2.length; i++) {
          for(let j = 0; j < arrDeNombres.length; j++) {
            if(allCountries2[i].name.toUpperCase() === arrDeNombres[j].toUpperCase()) {
              countryFiltrado2.push(allCountries2[i])
            }
          }
        }
      }else countryFiltrado2 = state.allCountries
      
      return {
        ...state,
        countries: countryFiltrado2
      }
    case "ORDEN_ALFABETICO":    
            
      let coutriesSort = action.payload === "asc" ? 
        state.countries.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else {
            return 0;
          }
        })
      : 
      action.payload === "desc" ?
        state.countries.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          } else if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        }) 
      : 
      state.countries;              
        
      return {
        ...state,
        countries: coutriesSort
      }
    case "ORDEN_POBLACION":
      let ordenPoblacion

      if(action.payload === "asc") {
        ordenPoblacion =  state.countries.sort((a,b) => {
          return a.population - b.population
        })
      }else {
          ordenPoblacion= state.countries.sort((a,b) => {
            return b.population - a.population
          })
        }

      return {
        ...state,
        countries: ordenPoblacion
      }
    default:
     return state;
  }
}
  export default rootReducer;
      