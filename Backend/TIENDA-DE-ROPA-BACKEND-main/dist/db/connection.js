"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = new sequelize_1.Sequelize('ecommerce', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
/*import Sequelize, { Connection, ConnectionOptions } from 'sequelize';

// Configuración de la conexión
// ¡IMPORTANTE! No guardes contraseñas directamente en el código en producción.
// Usa variables de entorno.
const dbConfig: ConnectionOptions = {
  host: 'localhost',
  user: 'root',
  password: '', // <-- REEMPLAZA ESTO CON TU CONTRASEÑA REAL
  port: 3306,
  database: 'ecommerce' // Opcional: especifica la BD a usar por defecto
                                         // Si no la pones, tendrás que seleccionarla después
                                         // con `USE NOMBRE_DE_TU_BASE_DE_DATOS;`
};
*/
/* const db = new Sequelize('jonapisc_plataforma', 'jonapisc_plata', 'jon102003123', {
    host: 'jonapiscope.com',
    dialect: 'mysql',
    port: 3306
});
 */
/* esto si no existe la crea */
/* (async () => {
    await db.sync({ force: true }); // Sincronizar modelo con la base de datos
    const existe = await db.query(`SELECT * FROM usuarios ;`);
    console.log("\n la consulta es esta:" , existe[0])
    if (existe[0].length > 0) {
      console.log('\n La tabla "Usuarios" existe\n');
    } else {
      console.log(' La tabla "Usuarios" no existe');
    }
  })(); */
/* (async () => {
  await db.sync({ force: true }); // Sincronizar modelo con la base de datos
  const existe = await db.query(`SELECT * FROM jonapisc_plataforma.usuarios ;`);
  console.log("la consulta es esta:" , existe)
  if (existe[0].length > 0) {
    console.log('La tabla "Usuarios" existe');
  } else {
    console.log('La tabla "Usuarios" no existe');
  }
})(); */
/*export default db;*/
//# sourceMappingURL=connection.js.map