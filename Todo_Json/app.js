const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

// Task 2: 
const todoFilePath = path.join(__dirname, 'todo.json');

if (!fs.existsSync(todoFilePath)) {
    const initialData = [
        { taskid: 1, name: 'Task One', status: 'pending' },
        { taskid: 2, name: 'Task Two', status: 'completed' }
    ];
    fs.writeFileSync(todoFilePath, JSON.stringify(initialData, null, 2));
}

// Task 1: 
app.post('/updateTask', (req, res) => {
    const { taskid, status } = req.body;

    if (taskid === undefined || status === undefined) {
        return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    // Task 3: 
    fs.readFile(todoFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, message: 'File read error' });

        let todos = JSON.parse(data);
        let taskIndex = todos.findIndex(task => task.taskid === taskid);

        if (taskIndex === -1) {
            return res.json({ success: false, message: 'Task not found' });
        }

        todos[taskIndex].status = status;

        fs.writeFile(todoFilePath, JSON.stringify(todos, null, 2), err => {
            if (err) return res.status(500).json({ success: false, message: 'File write error' });
            res.json({ success: true, message: 'Task updated successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});