import axios from 'axios';
import {url} from './global';

export const getAllAuditorias = async () => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.get(`${url}/auditorias`,{headers});
    return res;
}

export const getByIdAuditoria = async (id) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    const res = await axios.get(`${url}/auditorias/${id}`,{headers});
    return res;
}

