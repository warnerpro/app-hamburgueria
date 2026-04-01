const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Listar e obter produtos (público)
router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

// Criar, atualizar e deletar (apenas admin)
router.post('/', authMiddleware, roleMiddleware(['admin']), productController.createProduct);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), productController.updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
