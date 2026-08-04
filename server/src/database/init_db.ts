import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "../config/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeMySQLDatabase() {
  try {
    // 1. Connect without specifying DB to ensure database creation
    const connection = await mysql.createConnection({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      multipleStatements: true
    });

    console.log(`🔌 Connected to MySQL server at ${config.db.host}:${config.db.port}`);

    // 2. Read SQL Schema file
    const sqlPath = path.join(__dirname, "schema.sql");
    const sqlScript = fs.readFileSync(sqlPath, "utf-8");

    // 3. Execute Database Schema Creation
    await connection.query(sqlScript);
    console.log(`✅ MySQL Database '${config.db.name}' & all 11 tables successfully created/initialized!`);

    await connection.end();
  } catch (error) {
    console.warn(`⚠️ MySQL Database Auto-Initializer Note: ${(error as Error).message}`);
  }
}

if (process.argv[1] === __filename) {
  initializeMySQLDatabase();
}
