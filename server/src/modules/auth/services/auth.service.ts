import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { config } from "../../../config/index.js";

async function getPool() {
  return mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

const poolPromise = getPool();

export interface AdminAuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export class AdminAuthService {
  /**
   * Register a new admin in MySQL database 'admins' table
   */
  public static async adminSignUp(name: string, email: string, pass: string, role = "Super Admin"): Promise<AdminAuthResponse> {
    const pool = await poolPromise;
    const cleanEmail = email.trim().toLowerCase();

    // Check existing admin
    const [rows]: any = await pool.query("SELECT id FROM admins WHERE email = ?", [cleanEmail]);
    if (rows && rows.length > 0) {
      throw new Error("An admin account with this email address already exists.");
    }

    const id = `admin-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = await bcrypt.hash(pass, 10);

    await pool.query(
      "INSERT INTO admins (id, name, email, password_hash, role, is_active) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name.trim(), cleanEmail, passwordHash, role, true]
    );

    const token = jwt.sign(
      { id, email: cleanEmail, role, type: "admin" },
      config.jwt.accessSecret,
      { expiresIn: "7d" }
    );

    return {
      user: { id, name: name.trim(), email: cleanEmail, role },
      token
    };
  }

  /**
   * Sign In admin using email and password against MySQL 'admins' table
   */
  public static async adminSignIn(email: string, pass: string): Promise<AdminAuthResponse> {
    const pool = await poolPromise;
    const cleanEmail = email.trim().toLowerCase();

    const [rows]: any = await pool.query(
      "SELECT id, name, email, password_hash, role, is_active FROM admins WHERE email = ?",
      [cleanEmail]
    );

    if (!rows || rows.length === 0) {
      throw new Error("Invalid admin email or password.");
    }

    const admin = rows[0];

    if (!admin.is_active) {
      throw new Error("Your admin account has been deactivated. Please contact system administrator.");
    }

    const isMatch = await bcrypt.compare(pass, admin.password_hash);
    if (!isMatch) {
      throw new Error("Invalid admin email or password.");
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role, type: "admin" },
      config.jwt.accessSecret,
      { expiresIn: "7d" }
    );

    return {
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      token
    };
  }

  /**
   * Get current authenticated admin profile from MySQL database
   */
  public static async getAdminProfile(id: string): Promise<{ id: string; name: string; email: string; role: string }> {
    const pool = await poolPromise;
    const [rows]: any = await pool.query(
      "SELECT id, name, email, role, is_active FROM admins WHERE id = ?",
      [id]
    );

    if (!rows || rows.length === 0) {
      throw new Error("Admin user not found.");
    }

    const admin = rows[0];
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    };
  }
}
