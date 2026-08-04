import { Sequelize } from "sequelize";
import { config } from "../config/index.js";

// MySQL Sequelize Instance
export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Database connected successfully.");
  } catch (error) {
    console.warn("⚠️ MySQL Database connection skipped (using active dynamic store):", (error as Error).message);
  }
};
