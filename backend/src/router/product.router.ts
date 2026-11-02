import { Router } from 'express';
import { ProductController } from '../controller/product.controller';

const router = Router();

// GET
router.get('/', ProductController.getAll);
router.get('/search', ProductController.searchByName);
router.get('/by-name/:name', ProductController.getByName);
router.get('/:id', ProductController.getById);

// POST, PUT, DELETE
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.deleteById);

export { router };
export default router;
