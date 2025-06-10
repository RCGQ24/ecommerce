import { Router } from 'express';
import rolesController from '../controllers/roles';

const router = Router();

router.get('/',       rolesController.getRoles.bind(rolesController));
router.get('/:id',    rolesController.getRol.bind(rolesController));
router.post('/',      rolesController.postRol.bind(rolesController));
router.put('/:id',    rolesController.putRol.bind(rolesController));
router.delete('/:id', rolesController.deleteRol.bind(rolesController));

export default router;