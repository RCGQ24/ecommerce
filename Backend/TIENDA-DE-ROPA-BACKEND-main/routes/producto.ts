import { Router } from 'express';
import productosController from '../controllers/productos';

const router = Router();

router.get('/', productosController.getProductos.bind(productosController));
router.get('/:id', productosController.getProducto.bind(productosController));
router.post('/', productosController.postProducto.bind(productosController));
router.put('/:id', productosController.putProducto.bind(productosController));
router.delete('/:id', productosController.deleteProducto.bind(productosController));

export default router;