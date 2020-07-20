export default class Api {
    constructor({ baseUrl, ownId, headers = {} }) {
      this.baseUrl = baseUrl;
      this.ownId = ownId;
      this.headers = headers;
    }
  
    _checkResponse(res){
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }
  
    _checkResponseError(err){
      console.log('Error');
      return Promise.reject(err.message);
    }

    getUserInfo() {
      return fetch(
        `${this.baseUrl}/users/me`,
        {
          headers: this.headers
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    setUserInfo(userInfo) {
      return fetch(
        `${this.baseUrl}/users/me`,
        {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
            name: userInfo.profile-name,
            about: userInfo.profile-job
          })
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    changeAvatar(avatar) {
      return fetch(
        `${this.baseUrl}/users/me/avatar`,
        {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify({
            avatar: avatar.avatar-edit-link
          })
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    getInitialCards() {
      return fetch(
        `${this.baseUrl}/cards`,
        {
          headers: this.headers
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    setCard(card) {
      return fetch(
        `${this.baseUrl}/cards`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            name: card.add-place-title,
            link: card.add-place-link
          })
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    setLike(id) {
      return fetch(
        `${this.baseUrl}/cards/likes/${id}`,
        {
          method: 'PUT',
          headers: this.headers
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    deleteLike(id) {
      return fetch(
        `${this.baseUrl}/cards/likes/${id}`,
        {
          method: 'DELETE',
          headers: this.headers
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  
    deleteCard(id) {
      return fetch(
        `${this.baseUrl}/cards/${id}`,
        {
          method: 'DELETE',
          headers: this.headers
        }
      )
      .then(this._checkResponse)
      .catch(this._checkResponseError)
    }
  }