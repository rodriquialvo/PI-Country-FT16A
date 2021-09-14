const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Country, Activity } = require("../../db");
const axios = require("axios");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiInfo = async () => {
  let api = await axios.get("https://restcountries.eu/rest/v2/all");

  return api.data.map(e => {
    return {
      id: e.alpha3Code,
      name: e.name,
      flag: e.flag,
      region: e.region,
      capital: e.capital,
      subRegion: e.subregion,
      area: e.area,
      population: e.population
    }
  });  
}

router.get("/", async (req, res) => {
  let info = await apiInfo();
  let {name} = req.query;  
  let inDb = await Country.findAll();  

  if(!inDb.length) {
    Country.bulkCreate(info, {updateOnDuplicate: ["id"]});
    inDb = await Country.findAll();       
  }
  
  if(name) {
    let nameCountry = inDb.filter((e => e.name.toLowerCase().includes(name.toLowerCase())));
    nameCountry ? res.send(nameCountry) : res.status(404).send("No se encuentra el pais");
  }
  return res.send(inDb);
});

router.get("/:idPais", async (req, res) => {
  const {idPais} = req.params;

  if(idPais && idPais.length === 3) {    
    
    let db = await Country.findAll();

    let filtrado = db.find(e => idPais.toUpperCase() === e.id );

    if(filtrado){
      let countryDetail = await Country.findOne({
      where: {
        id: idPais.toUpperCase()
      },
      attributes: ["id", "name", "flag", "region", "capital", "subRegion","area", "population"],
      include: Activity
      });
      
      return res.send(countryDetail);
    }else{
      return res.status(404).send("No existe el pais");
    }   
  }
  return res.status(404).send("No existe el pais");
});



module.exports = router;