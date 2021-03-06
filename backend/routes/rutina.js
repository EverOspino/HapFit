const router = require('express').Router();
const rutinaController = require('../controllers/rutinas.js');
const validarTodo = require('../middlewares/validate-all');

router.post('/add', validarTodo, rutinaController.add);
router.get('/get', validarTodo, rutinaController.get);
router.delete('/delete', validarTodo, rutinaController.deleteRutinas);

module.exports = router;
