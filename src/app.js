require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const tasksRoutes = require('./routes/tasks');
const ProcessTaskService = require('./service/process-task');

// public folder is the only one accessible by browser
app.use(express.static(path.join(__dirname, '..', 'public')));

// views are in public folder
app.set('views', path.join(__dirname, '..', 'public'));

// define the engine that will render html
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

// Root path to show the events
app.use('/', tasksRoutes);

// processing the results and storing in memory.
// It's possible to add a DB with high performance like Mongo
const intervalExecution = process.env.INTERVAL_EXECUTION;
const tasks = [];
io.on('connection', (socket) => {
  console.log('Running on port 3000');

  // if server is already running, show the old events
  socket.emit('previousTasks', tasks);

  const process = new ProcessTaskService();
  setInterval(() => {
    process.run().then((data) => {
      tasks.push(data);
      socket.broadcast.emit('receivedTask', data);
    });
  }, intervalExecution);
});

server.listen(3000);
