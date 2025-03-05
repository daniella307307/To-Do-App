const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        default:"pending"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    timestamp:{
        type:Date,
        default:Date.now()
    }
})
const Task = mongoose.model('Task', TaskSchema);
module.exports=Task;