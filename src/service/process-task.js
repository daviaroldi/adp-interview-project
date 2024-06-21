const api = require('../lib/api');

module.exports = class ProcessTaskService {
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
    const data = await api.getTask();
    this.left = data.left;
    this.right = data.right;
    const result = await this[data.operation]();

    const response = await api.submitTask(
      {
        id: data.id,
        result,
      },
    );

    return {
      id: data.id,
      code: response.code,
      message: response.message,
      result,
    };
  }
};
