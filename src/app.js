// eslint-disable-next-line
import dotenv from 'dotenv/config';
import express from 'express';
import ejs from 'ejs';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

import tasksRoutes from './routes/tasks.js';
import ProcessTaskService from './service/process-task.js';

const filename = fileURLToPath(import.meta.url);

const dirname = path.dirname(filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// public folder is the only one accessible by browser
app.use(express.static(path.join(dirname, '..', 'public')));

// views are in public folder
app.set('views', path.join(dirname, '..', 'public'));

// define the engine that will render html
app.engine('html', ejs.renderFile);

app.set('view engine', 'html');

// Root path to show the events
app.use('/', tasksRoutes);

// processing the results and storing in memory.
// It's possible to add a DB with high performance like Mongo
const intervalExecution = process.env.INTERVAL_EXECUTION;
const tasks = [];
io.on('connection', (socket) => {
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
