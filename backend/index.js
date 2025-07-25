const mongoose = require('mongoose')
const MONGO_URI = 'mongodb://localhost:27017/todo-app';

const taskRoute = require('./routes/taskRoute')

const express = require('express');
const app = express();
const cors = require('cors')

mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB connected successfully'))
.catch(error=>console.error(error));

app.use(express.json())
app.use(cors())

app.use('/tasks', taskRoute)

app.listen(3000, ()=> console.log('Server running on port 3000'))