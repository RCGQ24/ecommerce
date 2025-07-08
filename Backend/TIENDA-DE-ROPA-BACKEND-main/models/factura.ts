import { DataTypes, Model } from 'sequelize';
import { db } from '../db/connection';

export class Factura extends Model {
  public id!: number;
  public id_pago!: number;
  public numero_factura!: string;
  public fecha_factura!: Date;
  public monto_total!: number;
  public email!: string;
  public items_detalle?: string;
}

Factura.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_pago: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numero_factura: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    fecha_factura: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    monto_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    items_detalle: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: 'Factura',
    tableName: 'facturas',
    timestamps: false
  }
);

// Sincronizar el modelo con la base de datos
(async () => {
  try {
    await Factura.sync({ alter: true });
    console.log('Tabla de facturas sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la tabla de facturas:', error);
  }
})();

export default Factura;