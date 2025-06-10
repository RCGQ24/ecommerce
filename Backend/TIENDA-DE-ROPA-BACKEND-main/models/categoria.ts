import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Categoria extends Model {
  public id!: number;
  public nombre_categoria!: string;
}

Categoria.init(
  {
    nombre_categoria: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Categoria',
    timestamps: false
  }
);

export default Categoria;