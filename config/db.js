import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "todo_db",
  "root",
  "Pass@123",
  {
    host: "localhost",
    dialect: "mysql",
    dialectModule: require("mysql2"),
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

async function connection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connection();

export default sequelize;