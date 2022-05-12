class Api {
  constructor (url, headers) {
    this._url = url
    this._headers = headers
  }
  getCards () {
    return this._makeRequest(
      fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
    )
  }
  _makeRequest (promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json()
      }
      throw 'Request failed'
    })
  }
  postCard ({ name, url }) {
    const promise = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: url
      })
    })
    return this._makeRequest(promise)
  }
  deleteCard (id) {
    const promise = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    return this._makeRequest(promise)
  }
  getProfileInfo () {
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers
      }).catch(err => alert(`Request failed ${err.status}`))
    )
  }
  editProfileInfo ({ name, about }) {
    console.log({ name, about })
    return this._makeRequest(
      fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
    )
  }

  changeAvatar (avatar) {
    return this._makeRequest(
      fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
    )
  }
  changeLikeCardStatus (id, isLiked) {
    return this._makeRequest(
      fetch(`${this._url}/cards/${id}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers
      })
    )
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-38', {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  authorization: 'c5a7c514-ca8f-4b82-95f7-7b25ec57dd45'
})

export default api
