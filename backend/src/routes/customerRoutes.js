const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authMiddleware } = require('../middleware/auth');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

router.post('/', customerController.createCustomer);
router.get('/', customerController.listCustomers);
router.get('/:id', customerController.getCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
