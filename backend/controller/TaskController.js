const Task= require('../models/Task');
const User= require('../models/User');
const createTask = async (req, res) => {
    try {
        const {title, description}= req.body;
        const newTask = new Task({
            title,
            description,
            user:req.user.id
        });
        await newTask.save();
        res.status(201).json({message:"Task created successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTask = async (req, res) => {
    try {
        const {title, description}= req.body;
        const task = await Task.findOneAndUpdate({_id:req.params.id},{title,description});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task updated successfully"});
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }       
}
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({message:"Task deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};
const getTask=async(req,res)=>{
    try {
        const{title,description}=req.body;
        const task= await Task.find({title,description});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        return res.status(200).json({task});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports = {createTask, getTasks, updateTask, deleteTask,getTask};