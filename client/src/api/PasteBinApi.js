import axios from 'axios';
import qs from 'qs';
// API functions
// Create a new paste
// Create a new session key with existing user
// List paste created by a certain user
// Deleting A Paste Created By A User
// Getting A Users Information And Settings
// Getting raw paste output of users pastes including 'private' pastes
// Getting raw paste output of any 'public' & 'unlisted' pastes

const api = axios.create({baseURL: 'http://localhost:5000'});

const globalConfig = {timeout: 4000};
export const createPaste = async (paste) => {
    try {
        const { data, status } = await api.post('/paste/create', qs.stringify({paste}), globalConfig);
        return { pasteLink: data, isSuccessful: status === 200 };
    } catch(error) {
        return { isSuccessful: false};
    }
    
}
export const createSessionKey = async (username, password) => {
    const { data } = await api.post('/user/login', qs.stringify({username, password}), globalConfig)
    return data;  
}

// Returns a JSON array in the form
// [
//     {
//       pasteKey: 'xxxxxxxx',
//       pasteUnixDate: 'xxxxxxxxxx',
//       pasteTitle: 'xxxxxxx',
//       pasteFormatLong: 'xxxx',
//       pasteFormatShort: 'xxxx',
//       pasteUrl: 'https://pastebin.com/xxxxxxx' 
//     },
//]
export const listPaste = async (userKey, results_limit) => {
    const { data } = await api.post('/paste/list', qs.stringify({userKey, limit: results_limit}), globalConfig);
    if(data) return data
    else return [];
}

export const deletePaste = async (userKey, pasteId) => {
    const { status } = await api.post('/paste/delete', qs.stringify({userKey, pasteId}), globalConfig);
    return {isSuccessful: status === 200};
}

export const listUserInfo = async (userKey) => {
    const { data } = await api.post('/user/info', qs.stringify({userKey}), globalConfig);

    return data;
}