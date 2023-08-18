export function movieDuration({ duration }) {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
};

export const BASE_URL = 'https://api.nomoreparties.co';
