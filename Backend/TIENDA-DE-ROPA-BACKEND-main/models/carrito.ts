import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Carrito extends Model {
  public id!: number;
  public id_usuario!: string;
}

Carrito.init(
  {
    id_usuario: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Carrito',
    timestamps: false
  }
);

export default Carrito;