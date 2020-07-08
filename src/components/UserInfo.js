export default class UserInfo {
    constructor({ elName, elJob }) {
      this._name = elName;
      this._job = elJob;
    }
  
    getUserInfo() {
      return {
        name: this._name.textContent,
        job: this._job.textContent
      }
    }
  
    setUserInfo(data) {
      this._name.textContent = data.nameInput;
      this._job.textContent = data.jobInput;
    }
  }