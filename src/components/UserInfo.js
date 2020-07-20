export default class UserInfo {
  constructor(user) {
    this._userName = user.name;
    this._userInfoAbout = user.text;
    this._userAvatar = user.avatar
  }

  getUserInfo() {
    const userProfileInfo = {
      name: this._userName.textContent,
      text: this._userInfoAbout.textContent,
      avatar: this._userAvatar.src
    }
    return userProfileInfo;
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfoAbout.textContent = data.job;
    this._userAvatar.src = data.avatar;
  }

  setUserAvatar(data) {
    this._userAvatar.src = data.avatar;
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