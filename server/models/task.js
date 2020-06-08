import Sequelize from "sequelize";

const Task = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "task",
    {
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
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

export default Task;
