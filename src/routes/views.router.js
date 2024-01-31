import express from 'express';
import { Router } from 'express';
const router = express.Router();
import {productManager} from '../public/js/products.js';

router.get('/', async (req, res) => {
  let products = await productManager.getProducts();
  res.render('index', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  let products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

export default router;
