const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sarpalkunal7:kunal1234@cluster1.pc6dcst.mongodb.net/todo_application');

const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed: {
        type:Boolean,
        default:false
    },
    ref:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userSchema'

    }
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,

    },
    password:String
})


const todo = mongoose.model("todos",todoSchema); 
const user = mongoose.model("user",userSchema); 

module.exports = {
    todo
    user
}