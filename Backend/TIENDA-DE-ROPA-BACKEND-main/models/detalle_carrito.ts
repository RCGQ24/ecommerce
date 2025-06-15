import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class DetalleCarrito extends Model {
  public id!: number;
  public id_carrito!: number;
  public id_producto!: number;
  public cantidad!: number;
  public precio!: number;
}

DetalleCarrito.init(
  {
    id_carrito: {
      type: DataTypes.INTEGER
    },
    id_producto: {
      type: DataTypes.INTEGER
    },
    cantidad: {
      type: DataTypes.INTEGER
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2)
    }
  },
  {
    sequelize: db,
    modelName: 'DetalleCarrito',
    tableName: 'detalle_carritos',
    timestamps: false
  }
);

export default DetalleCarrito;