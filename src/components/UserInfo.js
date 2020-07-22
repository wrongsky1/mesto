export default class UserInfo {
  constructor(profile) {
    this._profileName = profile.name;
    this._profileAbout = profile.about;
    this._profileAvatar = profile.avatar;
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