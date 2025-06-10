import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Rol extends Model {
  public id!: number;
  public nombre_rol!: string;
}

Rol.init(
  {
    nombre_rol: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Rol',
    timestamps: false
  }
);

export default Rol;