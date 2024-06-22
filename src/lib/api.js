import axios from 'axios';

class Api {
  constructor() {
    this.baseURL = process.env.ADP_INTERVIEW_BASE_URL;
    this.version = process.env.ADP_INTERVIEW_API_VERSION;
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

  getTask() {
    return axios.get(this.getTaskUrl());
  }

  submitTask(task) {
    return axios.post(
      this.getSubmitTaskUrl(),
      task,
    );
  }
}

export default new Api();
