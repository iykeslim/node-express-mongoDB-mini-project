const mongoose = require('mongoose')


const TaskSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'the name field is required'],
        trim:true,
        maxlength: [20, 'the name field should not contain more than 20 xters']
    },
    completed:{
        type:Boolean,
        defaul:false,
    },
})


module.exports = mongoose.model('Task', TaskSchema)
// after seeting this up I can go to my controllers and start using my model
// first require it in the controller