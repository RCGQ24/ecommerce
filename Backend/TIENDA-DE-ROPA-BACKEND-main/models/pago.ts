import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Pago extends Model {
  public id!: number;
  public id_metodo_pago!: number;
  public monto_pago!: number;
  public estado_pago!: string;
  public email_usuario!: string;
  public fecha_pago!: Date;
  public productos!: string;
  public numero_factura!: string;
}

Pago.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_metodo_pago: {
      type: DataTypes.INTEGER
    },
    monto_pago: {
      type: DataTypes.DECIMAL(10, 2)
    },
    estado_pago: {
      type: DataTypes.STRING
    },
    email_usuario: {
      type: DataTypes.STRING
    },
    fecha_pago: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    productos: {
      type: DataTypes.TEXT
    },
    numero_factura: {
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