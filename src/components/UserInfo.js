export default class UserInfo {
    constructor({ elName, elJob }) {
      this._elName = elName;
      this._elJob = elJob;
    }
  
    getUserInfo() {
      return {
        name: this._elName.textContent,
        job: this._elJob.textContent
      }
    }
  
    setUserInfo(newData) {
      this._elName.textContent = newData.name;
      this._elJob.textContent = newData.job;
    }
  }