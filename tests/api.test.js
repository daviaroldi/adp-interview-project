import { default as axios } from 'axios';
import api from '../src/lib/api';

jest.mock('axios');

const taskMocked = {
  id: "5a41307f-2342-45f7-a144-d6d53d2f3c57",
  operation: "remainder",
  left: -2703759441766803,
  right: -7967951047237295
}

test('Getting task', async () => {
  axios.get.mockImplementation(() => Promise.resolve({ data: taskMocked }));
  const task = await api.getTask();
  expect(task).toBe(taskMocked);
});
