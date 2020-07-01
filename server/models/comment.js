import Sequelize from "sequelize";

const Comment = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "comment",
    {
      comment: {
        type: Sequelize.TEXT,
      },  
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      }, 
      date:
      {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
      },             
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "question",
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

export default Comment;
