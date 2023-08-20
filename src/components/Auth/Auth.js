const BASE_URL = 'https://api.chashchinavv.nomoreparties.sbs';
// const BASE_URL = 'http://localhost:3000';


export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
}

export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => {
            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                return data;
            }
        })
}

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
        .then((data) => data)
}