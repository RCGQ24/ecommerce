import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Factura extends Model {
  public id!: number;
  public id_pago!: number;
  public numero_factura!: string;
  public monto_total!: number;
}

Factura.init(
  {
    id_pago: {
      type: DataTypes.INTEGER
    },
    numero_factura: {
      type: DataTypes.STRING
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2)
    }
  },
  {
    sequelize: db,
    modelName: 'Factura',
    timestamps: false
  }
);

export default Factura;