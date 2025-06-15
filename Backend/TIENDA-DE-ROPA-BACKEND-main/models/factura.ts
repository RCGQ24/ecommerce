import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Factura extends Model {
  public id!: number;
  public id_pago!: number;
  public numero_factura!: string;
  public fecha_factura!: Date;
  public monto_total!: number;
  public email!: string;
}

Factura.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_pago: {
      type: DataTypes.INTEGER
    },
    numero_factura: {
      type: DataTypes.STRING(50)
    },
    fecha_factura: {
      type: DataTypes.DATE
    },
    monto_total: {
      type: DataTypes.DECIMAL(7, 2)
    },
    email: {
      type: DataTypes.STRING(100)
    }
  },
  {
    sequelize: db,
    modelName: 'Factura',
    tableName: 'facturas',
    timestamps: false
  }
);

export default Factura;