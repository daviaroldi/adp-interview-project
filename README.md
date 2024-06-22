<h1>ADP Interview Project</h1>

<h3>Project to get task from a server and process before submitting</h3>

<p>This project was developed using NodeJS opening a communication with a socket(Socket.io) and running the process in background every second to submit the result to the server. Accessing the root path '/' you can see a simple table that shows the result of the submitting ongoing.</p>

<p>Other libraries in the project:</p>
<ul>
  <li>Axios (To make requests in a simple way)</li>
  <li>Vitest (Unit test library that makes easy running tests)</li>
  <li>Dotenv (To save environment variables in .env file and easy load them)</li>
  <li>Nodemon (To reloads automatically the server when some file is saved)</li>
  <li>EJS (Engine to render a simple HTML page. It could be done creating a new React project, but to keep only one project running EJS was the chosen one)</li>
  <li>Express (To create the http server)</li>
</ul>

<p>Before running the project, you will need to install all the dependencies: <pre>npm install</pre></p>

<p>Here are some commands to run in the project:</p>
<ul>
  <li>Run the project: <pre>npm start</pre></li>
  <li>Running in watcher mode with nodemon: <pre>npm run dev</pre></li>
  <li>Verify the ESLint errors in the project: <pre>npm run lint</pre></li>
  <li>You may fix them: <pre>npm run lint-fix</pre></li>
  <li>Running Unit Tests: <pre>npm test</pre></li>
  <li>With coverage report: <pre>npm run test-coverage</pre></li>
</ul>

<h4>Bonus Question</h4>
<p>It's possible to create a Queue application structure, for example using RabbitMQ, and process the request asynchronously. If some of the requests fail with 429, add it to the queue again with a delay time to process.</p>