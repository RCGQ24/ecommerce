"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const producto_1 = __importDefault(require("../routes/producto"));
const carrito_1 = __importDefault(require("../routes/carrito")); // <-- Nuevo
const detalle_carrito_1 = __importDefault(require("../routes/detalle_carrito")); // <-- Nuevo
const pago_1 = __importDefault(require("../routes/pago")); // <-- Nuevo
const factura_1 = __importDefault(require("../routes/factura")); // <-- Nuevo
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("../db/connection");
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            carritos: '/api/carritos',
            detalleCarritos: '/api/detalle_carritos',
            pagos: '/api/pagos',
            facturas: '/api/facturas',
            root: '/'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Conectando a base de datos......');
            try {
                yield connection_1.db.authenticate();
                console.log('\n Database online a traves de db.authenticate \n');
            }
            catch (error) {
                console.log("no se establecio comunicacion con la BD");
                throw "new Error(error )";
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
        this.app.use(this.apiPaths.productos, producto_1.default);
        this.app.use('/api/products', producto_1.default);
        // Nuevas rutas
        this.app.use(this.apiPaths.carritos, carrito_1.default);
        this.app.use(this.apiPaths.detalleCarritos, detalle_carrito_1.default);
        this.app.use(this.apiPaths.pagos, pago_1.default);
        this.app.use(this.apiPaths.facturas, factura_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('\nServidor corriendo en puerto ' + this.port + '\n');
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map