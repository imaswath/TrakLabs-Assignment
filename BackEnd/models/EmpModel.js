const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('Traklab', 'postgres', 'Abc!23Zyx', {
    host: 'localhost',
    dialect: 'postgres'
  });

module.exports= sequelize.define('Emp', {
  // Model attributes are defined here
  EmpId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  EmpName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  EmpAge:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  DeptId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      
  }
}, { 
    sequelize,
    tableName: "Employee",
    schema:"Traklab",
    timestamps: false
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true