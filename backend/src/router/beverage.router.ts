import { Router } from 'express';
import { BeverageController } from '../controller/beverage.controller';

const router = Router();

// GET
router.get('/', BeverageController.getAll);
router.get('/search', BeverageController.searchByName);
router.get('/by-name/:name', BeverageController.getByName);
router.get('/:id', BeverageController.getById);

// POST, PUT, DELETE
router.post('/', BeverageController.create);
router.put('/:id', BeverageController.update);
router.delete('/:id', BeverageController.deleteById);

export { router };
export default router;
