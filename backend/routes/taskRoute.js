const { createTask, getTasks, updateTask, deleteTask } = require('../controller/taskController')
const express = require('express')
const router = express.Router()

router.post('/', createTask);
router.get('/', getTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask)

module.exports = router