const Task = require("../model/Task");

exports.createTask = async (req, res) => {
    try {
        console.log(req.body);
        const task = await Task.create(req.body);
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getTasks = async (req, res) => {
    const { 
        page = 1,
        pageSize = 5
     } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const total = await Task.countDocuments()
    const completed = await Task.countDocuments({isCompleted: true})
    const tasks = await Task.find()
    .skip(skip)
    .limit(pageSize)

    res.json({
        total: total,
        page: Number(page),
        pageSize: parseInt(pageSize),
        completed: completed,
        tasks
    })
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task)
    } catch (error) {
        res.status(400).json({error: 'Invalid task id'})
    }

}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).json({error: 'Task not found'})
        res.json({message: 'Task Deleted'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}