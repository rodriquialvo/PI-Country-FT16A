const { Router } = require('express');


const { Country, Activity } = require("../../db");

const router = Router();


router.get("/", async (req, res) => {
  try {
    const allActivities = await Activity.findAll({
      include: [{
        model: Country,
        attributes: ['name', 'flag', 'region']
      }]
    });
    //esto es para el caso inicial en donde no hay activs creadas
    if (!allActivities.length) {
      return res.send("NO SE ENCONTRARON ACTIVIDADES CREADAS");
    }
    return res.json(allActivities)
  }catch(error) {
    console.log(error);
  }
});

module.exports = router;

