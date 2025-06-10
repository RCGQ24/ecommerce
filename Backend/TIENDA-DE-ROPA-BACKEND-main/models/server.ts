import express, { Application } from 'express';
import userRoutes from '../routes/usuario';
import productoRoutes from '../routes/producto';
import contactoRoutes from '../routes/rol';
import carritoRoutes from '../routes/carrito'; // <-- Nuevo
import detalleCarritoRoutes from '../routes/detalle_carrito'; // <-- Nuevo
import pagoRoutes from '../routes/pago'; // <-- Nuevo
import facturaRoutes from '../routes/factura'; // <-- Nuevo
import cors from 'cors'; 
 
import { db } from '../db/connection';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        productos: '/api/productos',
        carritos: '/api/carritos', // <-- Nuevo
        detalleCarritos: '/api/detalle_carritos', // <-- Nuevo
        pagos: '/api/pagos', // <-- Nuevo
        facturas: '/api/facturas', // <-- Nuevo
        root: '/'        
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes(); 
    }

    async dbConnection() {
        console.log('Conectando a base de datos......');

        try {
            await db.authenticate();
            console.log('\n Database online a traves de db.authenticate \n');
        } catch (error) {
            console.log("no se establecio comunicacion con la BD")
            throw "new Error(error )";
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );
       
    }


    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.productos, productoRoutes);
        this.app.use('/api/products', productoRoutes);

        // Nuevas rutas
        this.app.use(this.apiPaths.carritos, carritoRoutes);
        this.app.use(this.apiPaths.detalleCarritos, detalleCarritoRoutes);
        this.app.use(this.apiPaths.pagos, pagoRoutes);
        this.app.use(this.apiPaths.facturas, facturaRoutes);
         }


    listen() {
        this.app.listen( this.port, () => {
            console.log('\nServidor corriendo en puerto ' + this.port + '\n');
        })
    }

}

export default Server;