import Sequelize from "sequelize";

const AccessHash = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "accesshash",
    {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  return table;
};

export default AccessHash;
