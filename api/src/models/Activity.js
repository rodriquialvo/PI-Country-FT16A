const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    /* id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }, */
    
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    difficulty: {
      type:DataTypes.ENUM("1", "2", "3", "4", "5")
      
    },
    duration : {
      type: DataTypes.STRING,
      validate: {
        min:0,
        max:120,
      },
      
    },
    season: {
      type: DataTypes.ENUM("verano", "invierno", "otoño", "primavera"),
    },
  },
  {
    timestamps:true,
    createdAt:false,
    updatedAt:false
  });
};
