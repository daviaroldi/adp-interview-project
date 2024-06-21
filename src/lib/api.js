const axios = require('axios');

module.exports = new class Api {
  constructor() {
    this.baseURL = 'https://interview.adpeai.com/api/';
    this.version = 'v1';
  }

  getURLWithVersion() {
    return this.baseURL + this.version;
  }

  getTaskUrl() {
    return `${this.getURLWithVersion()}/get-task`;
  }

  getSubmitTaskUrl() {
    return `${this.getURLWithVersion()}/submit-task`;
  }

  async getTask() {
    let data = null;
    await axios.get(this.getTaskUrl()).then((response) => {
      data = response.data;
    });

    return data;
  }

  async submitTask(task) {
    const result = {
      code: null,
      message: null,
    };
    await axios.post(
      this.getSubmitTaskUrl(),
      task,
    ).then((response) => {
      result.code = response.status;
      result.message = response.data;
    });

    return result;
  }
}();
