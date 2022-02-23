import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import * as PasteBinApi from './api/PasteBinApi.js';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to PasteBin api');
});

app.post('/paste/create', async (req, res) => {
    try {
        const response = await PasteBinApi.createPaste(req.body.paste);   
        if(response) {
            res.status(200).json(response)
        }
    } catch (error) {
        res.json(error);
    }
});
app.post('/user/login', async (req, res) => {
    try {
        const response = await PasteBinApi.createSessionKey(req.body.username, req.body.password);   
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.json(error);
    }
});
app.post('/paste/list', async (req, res) => {
    try {
        const response = await PasteBinApi.listPaste(req.body.userKey, req.body.limit);   
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.json(error);
    }
});
app.post('/paste/delete', async (req, res) => {
    try {
        const response = await PasteBinApi.deletePaste(req.body.userKey, req.body.pasteId);   
        if(response) {
            res.status(200).send()
        }
    } catch (error) {
        res.json(error);
    }
});
app.post('/user/info', async (req, res) => {
    try {
        const response = await PasteBinApi.listUserInfo(req.body.userKey);   
        if(response) {
            res.status(200).json(response);
        }
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));