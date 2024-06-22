import api from '../lib/api.js';
import CalculatorService from './calculator.js';

const MESSAGES = {
  200: 'Success',
  400: 'Incorrect value in result; no ID specified; value is invalid',
  404: 'Value not found for specified ID',
  503: 'Error communicating with database',
};

export default class ProcessTaskService {
  async run() {
    const { data } = await api.getTask();
    const result = CalculatorService.calculate(data.left, data.right, data.operation);

    const response = {
      code: null,
      message: null,
      id: data.id,
      result,
    };

    try {
      const resp = await api.submitTask(
        {
          id: data.id,
          result,
        },
      );
      response.code = resp.status
    } catch (error) {
      response.code = error.response.status
    }

    response.message = MESSAGES[response.code];

    return response;
  }
};
