import axios from 'axios';
import api from '../src/lib/api.js';
import operations from './assets/tasks-mock.json';
import result from './assets/result-mock.json';

vi.mock('axios');

test('Getting task', async () => {
  const taskMocked = operations[0];
  axios.get.mockImplementation(() => Promise.resolve({ data: taskMocked }));
  const { data } = await api.getTask();
  expect(data).toBe(taskMocked);
});

test('Submit task', async () => {
  axios.post.mockImplementation(() => Promise.resolve({ data: result }));
  const { data } = await api.submitTask({
    id: result.id,
    result: result.result,
  });
  expect(data).toBe(result);
});