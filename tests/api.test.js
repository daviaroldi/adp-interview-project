import axios from 'axios';
import api from '../src/lib/api.js';
import operations from './assets/operations-mock.json';

vi.mock('axios');

test('Getting task', async () => {
  const taskMocked = operations[0];
  axios.get.mockImplementation(() => Promise.resolve({ data: taskMocked }));
  const { data } = await api.getTask();
  expect(data).toBe(taskMocked);
});
