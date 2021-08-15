const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('Traklab', 'postgres', 'Abc!23Zyx', {
    host: 'localhost',
    dialect: 'postgres'
  });
module.exports= sequelize.define('Dept', {
  // Model attributes are defined here
  DeptId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  DeptName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "Department",
  schema: "Traklab",
  timestamps: false
});

// `sequelize.define` also returns the model
//console.log(User === sequelize.models.User); // true