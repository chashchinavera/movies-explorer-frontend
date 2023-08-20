class Api {

    constructor({ link, headers }) {
      this._link = link;
      this._headers = headers;
    }
    //Универсальный метод запроса с проверкой ответа
    _request(url, options) {
      return fetch(url, options).then(this._handleResponse)
    }
  
    //Обработка ответа сервера
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`код ошибки: ${res.status}`);
      }
    }
  
    //Получение информации о пользователе
    getUserData(jwt) {
      return this._request(`${this._link}users/me`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      })
    }
    
    //Получение фильмов с сервера
    getInitialCards(jwt) {
      return this._request(`${this._link}movies`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      })
    }
  
    // Отправка информации о пользователе на сервер
    sendUserData(data, jwt) {
      return this._request(`${this._link}users/me`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email
        })
      })
    }
  
    // Добавление фильма в сохраненные
    saveMovie(movieId, jwt) {
      return this._request(`${this._link}movies/${movieId}/likes`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
    }
  
    // Удаление фильма из сохраненных
    deleteMovie(movieId, jwt) {
      return this._request(`${this._link}movies/${movieId}/likes`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      })
    }
  }
  
  
  const mainApi = new Api({
    link: 'http://localhost:3000/',
    // link: 'https://api.chashchinavv.nomoreparties.sbs/',
  });
  
  export default mainApi;