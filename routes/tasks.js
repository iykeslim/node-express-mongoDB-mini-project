const express = require('express')
const router = express.Router()

const {getAllTasks, createTask, getTask, updateTask, deleteTask} = require('../controllers/tasks')


// this route path matches whatever is passed inside app.use('/..') in the "app.js" file
// what is being passed into the get function is the controller
// so the req, res will be removed and assessed from the controllers where the e.g getAllTasks funct was created

// thes routes are chained as regards same params e.g ones with id and ones without ids and they are coming from the controller files
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router 