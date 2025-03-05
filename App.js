const express= require('express');
require('dotenv').config();
const app = express();
const port =process.env.PORT||5000 ;
const userRouter = require('./routes/userRoutes');
const taskRouter=require('./routes/taskRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/v1',userRouter);
app.use('/api/v1/tasks',taskRouter);
mongoose.connect(process.env.MONGO_URI, {})
.then(()=>console.log('Connected to database'))

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})