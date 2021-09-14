const { Router } = require('express');
const { Country, Activity } = require("../../db");
const router = Router();

router.post("/", async (req, res,) => {
  let {
    name,
    difficulty,
    duration,
    season,
    countries
  } = req.body;  
  name = name.toUpperCase();
  let [activityCreated, created] = await Activity.findOrCreate({
    where: {name}, defaults : {
      difficulty,
      duration,
      season
    }
    
  });

  try {
    let country = await Country.findAll({
        where: {
          name: countries
        }
      });
    //  console.log("COUNTRYYYYYYYYYYY: ",country);
      await activityCreated.addCountries(country);  
     return  res.send("Actividad creada");
  }catch(error) {
    console.log(error);
  }  
  
});


module.exports = router;