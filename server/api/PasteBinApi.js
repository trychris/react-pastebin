import axios from 'axios';
import qs from 'qs';
import {transform} from 'camaro';
// API functions
// Create a new paste
// Create a new session key with existing user
// List paste created by a certain user
// Deleting A Paste Created By A User
// Getting A Users Information And Settings
// Getting raw paste output of users pastes including 'private' pastes
// Getting raw paste output of any 'public' & 'unlisted' pastes
// https://livecodestream.dev/post/how-to-master-http-requests-with-axios/

const API_KEY = process.env.API_DEV_KEY;
const PASTEBIN_POST_URL = process.env.PASTEBIN_POST_URL;
const PASTEBIN_LOGIN_URL = process.env.PASTEBIN_LOGIN_URL;

const config = {
    headers: {
        "content-type": "application/x-www-form-urlencoded"
    },
    timeout: 10000
}

// Parameters: userKey: String , results_limit: String or int
// Step 1: PasteBin API returns the url of the newly created paste (String) in res.data
// Return res.data
export const createPaste = async (text) => {
    var payload = {
        api_dev_key: API_KEY,
        api_option: 'paste',
        api_paste_code: text
    }
    return axios.post(PASTEBIN_POST_URL, qs.stringify(payload), config)
        .then(res => res.data)
}

// Parameters: username: String, password: String
// Step 1: PasteBin API return the session key (String) in res.data
// Step 2: return res.data
export const createSessionKey = async (username, password) => {
    var payload = {
        api_dev_key: API_KEY,
        api_user_name: username,
        api_user_password: password
    };
    return axios.post(PASTEBIN_LOGIN_URL, qs.stringify(payload), config)
        .then(res => res.data)

}
// Parameters: userKey: String , results_limit: String or int
// Step 1: PasteBin API returns xml format (String) in res.data
// <paste>
//         <paste_key>0b42rwhf</paste_key>
//         <paste_date>1297953260</paste_date>
//         <paste_title>javascript test</paste_title>
//         <paste_size>15</paste_size>
//         <paste_expire_date>1297956860</paste_expire_date>
//         <paste_private>0</paste_private>
//         <paste_format_long>JavaScript</paste_format_long>
//         <paste_format_short>javascript</paste_format_short>
//         <paste_url>https://pastebin.com/0b42rwhf</paste_url>
//         <paste_hits>15</paste_hits>
// </paste>
// <paste>
//         <paste_key>0C343n0d</paste_key>
//         <paste_date>1297694343</paste_date>
//         <paste_title>Welcome To Pastebin V3</paste_title>
//         <paste_size>490</paste_size>
//         <paste_expire_date>0</paste_expire_date>
//         <paste_private>0</paste_private>
//         <paste_format_long>None</paste_format_long>
//         <paste_format_short>text</paste_format_short>
//         <paste_url>https://pastebin.com/0C343n0d</paste_url>
//         <paste_hits>65</paste_hits>
// </paste>
// Step 2: Convert XML format to JSON format
// Return the JSON object
export const listPaste = async (userkey, results_limit) => {
    var payload = {
        api_dev_key: API_KEY,
        api_user_key: userkey,
        api_results_limit: results_limit,
        api_option: 'list'
    };
    return axios.post(PASTEBIN_POST_URL, qs.stringify(payload), config)
        .then(async (res) => {
            if(res.data !== '') {
                const template = ['paste', {
                    pasteKey: '(paste_key)',
                    pasteUnixDate: '(paste_date)',
                    pasteTitle: '(paste_title)',
                    pasteFormatLong: '(paste_format_long)',
                    pasteFormatShort: '(paste_format_short)',
                    pasteUrl: '(paste_url)',
                }]
                const result = await transform(res.data, template);
                return result
            }
        })
}

// Parameters: userKey: String, pasteId: String
// Step 1: PasteBin API return "Paste removed" in res.data if successful
// Step 2: return res.data if successful, else return nothing
export const deletePaste = async (userkey, pasteId) => {
    var payload = {
        api_dev_key: API_KEY,
        api_user_key: userkey,
        api_paste_key: pasteId,
        api_option: 'delete'
    };
    return axios.post(PASTEBIN_POST_URL, qs.stringify(payload), config)
        .then(res => res.data)
}
export const listUserInfo = async (userKey) => {
    var payload = {
        api_dev_key: API_KEY,
        api_option: 'userdetails',
        api_user_key: userKey
    };
    return axios.post(PASTEBIN_POST_URL, qs.stringify(payload), config)
        .then(res => res.data)
}  