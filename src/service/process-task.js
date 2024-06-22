import api from '../lib/api.js';

export default class ProcessTaskService {
  async addition() {
    return this.left + this.right;
  }

  async subtraction() {
    return this.left - this.right;
  }

  async division() {
    return this.left / this.right;
  }

  async multiplication() {
    return this.left * this.right;
  }

  async remainder() {
    return this.left % this.right;
  }

  async run() {
    let data = null;
    await api.getTask().then((response) => {
      data = response.data;
    });
    this.left = data.left;
    this.right = data.right;
    const result = await this[data.operation]();

    const response = {
      code: null,
      message: null,
      id: data.id,
      result,
    };
    const errorMessages = {
      400: 'Incorrect value in result; no ID specified; value is invalid',
      404: 'Value not found for specified ID',
      503: 'Error communicating with database',
    };

    await api.submitTask(
      {
        id: data.id,
        result,
      },
    ).then((resp) => {
      response.code = resp.status;
      response.message = 'Success';
    }).catch((error) => {
      response.code = error.response.status;
      response.message = errorMessages[response.code];
    });

    return response;
  }
};
