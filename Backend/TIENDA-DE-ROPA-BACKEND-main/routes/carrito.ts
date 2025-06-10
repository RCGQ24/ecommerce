import { Router } from 'express';
import carritosController from '../controllers/carritos';

const router = Router();

router.get('/',       carritosController.getCarritos.bind(carritosController));
router.get('/:id',    carritosController.getCarrito.bind(carritosController));
router.post('/',      carritosController.postCarrito.bind(carritosController));
router.put('/:id',    carritosController.putCarrito.bind(carritosController));
router.delete('/:id', carritosController.deleteCarrito.bind(carritosController));

export default router;