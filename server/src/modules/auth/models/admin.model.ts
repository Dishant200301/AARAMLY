import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../database/index.js";

export interface AdminAttributes {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: boolean;
  created_at?: Date;
}

export type AdminCreationAttributes = Optional<AdminAttributes, "id" | "role" | "is_active" | "created_at">;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: string;
  public is_active!: boolean;
  public readonly created_at!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      defaultValue: "Super Admin",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "admins",
    timestamps: false,
  }
);
