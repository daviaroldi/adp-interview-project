import ProcessTaskService from '../src/service/process-task.js';
import successResponses from './assets/process-success-responses.json';
import errorResponses from './assets/process-error-responses.json';
import tasks from './assets/tasks-mock.json';
import axios from 'axios';

const process = new ProcessTaskService();
vi.mock('axios');

test.each(successResponses)('Testing run with $status code and $message case', async (response) => {
  const mock = {
    status: response.code,
    message: response.message
  }
  axios.get.mockResolvedValue({ data: tasks[0] });
  axios.post.mockResolvedValue({ status: response.code, data: mock });
  const event = await process.run();

  expect(event).toEqual(response)
})

test.each(errorResponses)('Testing run with $status code and $message case', async (response) => {
  const mock = {
    status: response.code,
    message: response.message
  }
  axios.get.mockResolvedValue({ data: tasks[0] });
  axios.post.mockRejectedValue({response: { status: response.code, data: mock }});
  const event = await process.run();

  expect(event).toEqual(response)
})