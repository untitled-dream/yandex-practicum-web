class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _defaultResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getInitialData(token) {
    return Promise.all([this.getUserData(token), this.getInitialCards(token)]);
  }

  getInitialCards (token) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    }).then(this._defaultResponse)
  }

  getUserData (token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    }).then(this._defaultResponse)
  }

  setUserData(data, token) {
    return fetch(`${this._baseURL}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._defaultResponse)
  }

  setUserAvatar(data, token) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._defaultResponse)
  }

  sendCard(data, token) {
    return fetch(`${this._baseURL}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    }).then(this._defaultResponse)
  }

  changeLikeCardStatus(id, isLiked, token) {
    return fetch(`${this._baseURL}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._defaultResponse)
  }

  removeCard(data, token) {
    return fetch(`${this._baseURL}/cards/${data}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
    }).then(this._defaultResponse)
  }

  updateProfilePhoto(data, token) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._defaultResponse)
  }
}

const api = new Api({
  baseURL: 'https://api.untitled-dream.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;