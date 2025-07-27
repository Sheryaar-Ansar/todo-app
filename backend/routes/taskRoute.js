const { createTask, getTasks, updateTask, deleteTask } = require('../controller/taskController')
const express = require('express');
const { taskValidation } = require('../validation/taskValidation');
const validate = require('../middlewares/validate');
const router = express.Router()


router.post('/', validate(taskValidation), createTask);
router.get('/', getTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask)

module.exports = router