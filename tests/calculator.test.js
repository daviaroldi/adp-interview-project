import tasks from './assets/tasks-mock.json';
import CalculatorService from '../src/service/calculator.js';

test.each(tasks)('Calculate operations $operation', async (task) => {
  const result = CalculatorService.calculate(task.left, task.right, task.operation)
  expect(result).toBe(task.result);
});
