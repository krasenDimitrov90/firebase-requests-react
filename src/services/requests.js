import * as api from './api';

const host = 'https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app';

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

export class Request {
    static login(data) {
        return api.post(loginURL, data);
    }

    static register(data) {
        return api.post(registerURL, data);
    }

    static addBook(data, token) {
        return api.post(`${host}/books.json`, data, token);
    }

    static getBook(bookId) {
        return api.get(`${host}/${bookId}.json`)
    }

    static getAllBooks() {
        return api.get(`${host}/books.json`)
    }
}

export const login = (data) => api.post(loginURL, data);

export const register = (data) => api.post(registerURL, data);

export const addBook = (data, token) => api.post(`${host}/books.json`, data, token);

export const getBook = (bookId) => api.get(`${host}/${bookId}.json`);

export const getAllBooks = () => api.get(`${host}/books.json`);