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
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return table;
};

export default User;
