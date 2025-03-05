const express= require('express');
const router= express.Router();
const taskController= require('../controller/TaskController');
const {verifyToken}= require('../middleware/verification');

router.post('/add',verifyToken,taskController.createTask);
router.get('/all',verifyToken,taskController.getTasks);
router.get('/single/:id',verifyToken,taskController.getTask);
router.put('/update-task/:id',verifyToken,taskController.updateTask);
router.delete('/delete-task/:id',verifyToken,taskController.deleteTask);

module.exports=router;