import express from 'express';
import auth from './auth';
import products from './products';

const router = express.Router();

router.use('/', auth);
router.use('/', products);

export default router;