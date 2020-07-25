import Sequelize from "sequelize";

const PendingUser = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "pendinguser",
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

export default PendingUser;
