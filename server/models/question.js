import Sequelize from "sequelize";

const QuestionTbl = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "questiontbl",
    {
      question: {
        type: Sequelize.TEXT,
      },  
      optionA: {
        type: Sequelize.STRING,
      },
      optionB: {
        type: Sequelize.STRING,
      },
      optionC: {
        type: Sequelize.STRING,
      },
      optionD: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },
      // solution: {
      //   type: Sequelize.TEXT,
      // },    
      subcategory_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "subcategory",
          key: "id",
        },
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

export default QuestionTbl;
