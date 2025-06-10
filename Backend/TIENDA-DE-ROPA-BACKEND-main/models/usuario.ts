import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Usuario extends Model {
  public id!: number;
  public nombre_usuario!: string;
  public email!: string;
  public contrasena!: string;
  public id_rol!: number;
}

Usuario.init(
  {
    nombre_usuario: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    contrasena: {
      type: DataTypes.STRING
    },
    id_rol: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Usuario',
    timestamps: false
  }
);

export default Usuario;