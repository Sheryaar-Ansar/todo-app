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
    const tasks = await Task.find()
    const completed = await Task.countDocuments({isCompleted: true})
    res.json({
        total: tasks.length,
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