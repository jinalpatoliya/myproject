import Sequelize from "sequelize";

const User = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "user",
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,

        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      resetlink:{
        type:Sequelize.TEXT,        
      },
      role:{
        type: Sequelize.STRING,
        defaultValue: 'student'
      },
      pendingstatus: { 
        type: Sequelize.INTEGER,        
        allowNull:false,
        defaultValue:0
        },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return table;
};

export default User;
