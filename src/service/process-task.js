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

    let response = null;
    try {
      response = await api.submitTask(
        {
          id: data.id,
          result,
        },
      );
    } catch (error) {
      response = error.response;
    }

    return this.handleResponse(response, data, result);
  }

  // Function to handle response properly,
  // in this case, just getting the correct message to be returned
  handleResponse(response, data, result) {
    return {
      code: response.status,
      message: MESSAGES[response.status],
      id: data.id,
      result,
    };
  }
}
