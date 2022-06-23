const { findOneAndDelete } = require('../models/Task');
const Task = require('../models/Task')
const asyncWrapper =require('../middleware/async');
const {createCustomError} = require('../errors/custom-error')

// we send our response from here for the controller functions or logic
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})

    res.status(200).json({tasks})
  
})

const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create(req.body)
  res.status(201).json({task})
})

const getTask = async (req, res) => {
  // I'll leave the try-catch here for referece but the rest of the funts are refactored
  try {
    const {id:taskID} = req.params
    const task = await Task.findOne({_id:taskID})
    if (!task) {
      // always remember to return here else js might not understand and go gaga
      // plus I will set up a custom error code here to use in all controllers
      // NB: It's the next 3lines of code
      //commenting out the next 4lines as well
      // const error = new Error('Not Found')
      // error.status = 404
      // return next(error)
      //return res.status(404).json({ msg: `No task with such Id : ${taskID}` });
      // the next line is coming from the errors folder and the file in it - the class
      return next(createCustomError(`No task with such Id : ${taskID}`, 404));
    }  
    res.status(200).json({task});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = asyncWrapper( async (req, res) => {
    const {id:taskID} = req.params

    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {new: true, runValidators:true})
    // For postman testing
    // res.status(200).json({id:taskID, data: req.body});
    if (!task) {
      return next(createCustomError(`No task with such Id : ${taskID}`, 404));
      // return res
      //   .status(404)
      //   .json({ msg: `No task with such Id as : ${taskID} id` });
    }
    res.status(200).json({task})
})

const deleteTask = asyncWrapper( async (req, res) => {
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
      return next(createCustomError(`No task with such Id : ${taskID}`, 404));
    }
    //because i 4got to add this line when i sent to postman it just kept loading
    //also could be a couple of ways bellow
    // res.status(200).send()
    // res.status(200).json({task: null, status: 'success'})
    res.status(200).json({task})
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}