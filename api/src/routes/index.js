const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getCountry = require("./controllers/getCountry");
const postActivity = require("./controllers/postActivity");
const getActivity = require("./controllers/getActivity")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/countries", getCountry);
router.use("/activity", postActivity);
router.use("/activity",getActivity);




module.exports = router;
