const mongoose = require('mongoose');
const {Schema} = mongoose;

const tasks = new Schema({title:String,description:String});

module.exports = mongoose.model('tasks', tasks);