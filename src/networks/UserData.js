import axios from 'axios';
import { ROOT_API } from "../static/index";


export const createUser = ({ email, password, username, fullname }) => {
    return axios.post(`${ROOT_API}/user`, { email, password, username, fullname });
}

export const login = ({ username, password }) => {
    return axios.put(`${ROOT_API}/user`, { username, password });
}

export const getAll = () => {
    return axios.get(`${ROOT_API}/user`);
}

export const update = ({ history, id }) => {
    return axios.put(`${ROOT_API}/user/${id}`, { history });
}