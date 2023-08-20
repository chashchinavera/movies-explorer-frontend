import { BASE_URL } from "../config/config";

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
    saveMovie(data, jwt) {
      return this._request(`${this._link}movies`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country: data.country,
          director: data.director,
          duration: data.duration,
          year: data.year,
          description: data.description,
          image: `${BASE_URL}${data.image.url}`,
          trailerLink: data.trailerLink,
          thumbnail: `${BASE_URL}${data.image.formats.thumbnail.url}`,
          movieId: data.id,
          nameRU: data.nameRU,
          nameEN: data.nameEN,
      })
      })
    }
  
    // Удаление фильма из сохраненных
    deleteMovie(movieId, jwt) {
      return this._request(`${this._link}movies/${movieId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      })
    }
  }
  
  
  const mainApi = new Api({
    // link: 'http://localhost:3000/',
    link: 'https://api.chashchinavv.nomoreparties.sbs/',
  });
  
  export default mainApi;