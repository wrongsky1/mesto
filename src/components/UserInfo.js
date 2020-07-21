export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    }
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._profileAvatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}



/*
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

  */