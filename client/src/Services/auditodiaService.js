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

// ----------------- HYPER LEDGER --------------- //

export const getAllAuditoriasHyperLedger = async (user) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.get(`${url}/query-auditorias/${user}`,{headers});
    return res;
}

export const getByKeyAuditoriasHyperLedger = async (user, key) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.get(`${url}/query-auditoria/${user}&${key}`,{headers});
    return res;
}

export const setEnrollAdminHyperLedger = async () => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.get(`${url}/enroll-admin`,{headers});
    return res;
}

export const setRegisterUserHyperLedger = async (user) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.get(`${url}/enroll-user/${user}`,{headers});
    return res;
}

export const setInvokeCreateHyperLedger = async (user, auditoria) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.post(`${url}/invoke-create/${user}`, auditoria ,{headers});
    return res;
}

export const isCorrupted = async (id, hash) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let data = {
        hash
    }
    let res = await axios.post(`${url}/verificar-datos/${id}`, data ,{headers});
    return res;
}

export const login = async (user) => {
    //let token = (sessionStorage.getItem('token'));
    let headers = {
        "Content-Type" : "application/json",
    //    "Authorization" : "Bearer ".concat(token)
    }
    let res = await axios.get(`${url}/login/${user}`,{headers});
    return res;
}

