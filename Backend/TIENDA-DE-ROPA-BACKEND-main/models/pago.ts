import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Pago extends Model {
  public id!: number;
  public id_metodo_pago!: number;
  public monto_pago!: number;
  public estado_pago!: string;
}

Pago.init(
  {
    id_metodo_pago: {
      type: DataTypes.INTEGER
    },
    monto_pago: {
      type: DataTypes.DECIMAL(10, 2)
    },
    estado_pago: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: db,
    modelName: 'Pago',
    timestamps: false
  }
);

export default Pago;