const express = require('express');
const router = express.Router();

const _tasks = require('../models/tasks');

router.get('/api/tasks', async (req, res)=>{
    const _tasksFind = await _tasks.find();
    res.json({
        tasks: _tasksFind
    });
});

router.get('/api/tasks/:id', async (req, res)=>{
    const {id} = req.params;
    const _tasksFind = await _tasks.findOne({_id: id});
    res.json({
        task: _tasksFind
    });
});

router.post('/api/tasks', async (req, res)=>{
    const _tasksSave = new _tasks(req.body);
    await _tasksSave.save();
    const _tasksFind = await _tasks.find();
    res.json({
        tasks: _tasksFind
    });
});

router.put('/api/tasks/:id', async (req, res)=>{
    const {id} = req.params;
    const _tasksFind = await _tasks.findOne({_id: id});
    const {title, description} = req.body;
    if(title){
        _tasksFind.title = title;
    }

    if(description){
        _tasksFind.description = description;
    }

    await _tasks.update({_id: id}, _tasksFind);
    res.json({
        task: _tasksFind
    });
});

router.delete('/api/tasks/:id', async (req, res)=>{
    const {id} = req.params;
    await _tasks.remove({_id: id});
    const _tasksFind = await _tasks.find();
    res.json({
        tasks: _tasksFind
    });
});

module.exports = router;