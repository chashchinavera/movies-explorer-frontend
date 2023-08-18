class MoviesApi {

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

  //Получение фильмов с сервера
  getMovies() {
    return this._request(`${this._link}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const moviesApi = new MoviesApi({
  link: 'https://api.nomoreparties.co/beatfilm-movies',
});

export default moviesApi;