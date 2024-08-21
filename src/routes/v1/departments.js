var express = require('express');
var router = express.Router();
const {departmentsController} = require("../../controllers/departments");

/* create new record. */
router.post('/create', departmentsController.create);

/* GET all department. */
router.get('/', departmentsController.getAll);

/* GET each department by Id. */
router.get('/:id',  departmentsController.getById);

/* Update department record by id. */
router.put('/update/:id',  departmentsController.update);

/* Delete user by id. */
router.delete('/delete/:id', departmentsController.delete);

module.exports = router;