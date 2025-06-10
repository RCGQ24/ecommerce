import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Producto extends Model {
  public id!: number;
  public nombre_producto!: string;
  public id_categoria!: number;
  public precio!: number;
  public url_imagen!: string;
  public talla!: string;
  public stock!: number;
}

Producto.init(
  {
    nombre_producto: {
      type: DataTypes.STRING
    },
    id_categoria: {
      type: DataTypes.STRING
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2)
    },
    url_imagen: {
      type: DataTypes.STRING
    },
    talla: {
      type: DataTypes.CHAR
    },
    stock: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize: db,
    modelName: 'Producto',
    timestamps: false
  }
);

export default Producto;