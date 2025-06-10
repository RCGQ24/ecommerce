import { Router } from 'express';
import detalleCarritosController from '../controllers/detalle_carritos';

const router = Router();

router.get('/',       detalleCarritosController.getDetalleCarritos.bind(detalleCarritosController));
router.get('/:id',    detalleCarritosController.getDetalleCarrito.bind(detalleCarritosController));
router.post('/',      detalleCarritosController.postDetalleCarrito.bind(detalleCarritosController));
router.put('/:id',    detalleCarritosController.putDetalleCarrito.bind(detalleCarritosController));
router.delete('/:id', detalleCarritosController.deleteDetalleCarrito.bind(detalleCarritosController));

export default router;