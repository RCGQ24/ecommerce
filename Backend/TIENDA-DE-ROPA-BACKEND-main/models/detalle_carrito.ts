import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';
import Carrito from './carrito';
import Producto from './producto';

export class DetalleCarrito extends Model {
  public id!: number;
  public id_carrito!: number;
  public id_producto!: number;
  public cantidad!: number;
  public precio!: number;
  public email?: string;
}

DetalleCarrito.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_carrito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Carrito,
        key: 'id'
      }
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize: db,
    modelName: 'DetalleCarrito',
    tableName: 'detalle_carritos',
    timestamps: false
  }
);

// Definir relaciones
DetalleCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito' });
DetalleCarrito.belongsTo(Producto, { foreignKey: 'id_producto' });

export default DetalleCarrito;