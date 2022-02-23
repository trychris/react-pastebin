# React Pastebin API
This web application uses REST to connect to the PasteBin API. Pastebin is a website where users can post 'pastes'.

### Tech stack and libraries
1. This front-end uses react and axios
1. The back-end uses Node (Express) and axios
1. Some front-end features are inspired by [https://github.com/flatlogic/react-material-admin/](https://github.com/flatlogic/react-material-admin/)

### Set up
1. Set up a PasteBin account at [https://pastebin.com/](https://pastebin.com/) and get the API Dev key. 
2. Add the key to the .env file in /server
3. Run in both the /server and /client directory
```
npm run start
```


4. The server is located at localhost at port 5000, and the client is located at port 3000

### Development options
1. To use the false server
    1. run `npm run start` in the /false-pastebin-server directory
    1. Change the lines in `.env` file in /server to 
    ```
    PASTEBIN_POST_URL="http://localhost:5001/api_post"
    PASTEBIN_LOGIN_URL="http://localhost:5001/api/api_login"
    ```
2. In order to see any Axios errors, add `.catch(error => console.log(error))` after the then block. For example, in `createPaste` function in `\server\api\PasteBinApi.js`, change the line
```
return axios.post(PASTEBIN_POST_URL, qs.stringify(payload), config)
        .then(res => res.data)
```
to
```
return axios.post(PASTEBIN_POST_URL, qs.stringify(payload), config)
        .then(res => res.data)
        .catch(error => console.log(error))
```

### Design concerns
1. A CORS problem with connecting React to the Pastebin API. 
```
Client (React) <-> Pastebin API
```

Axios in React keeps triggering CORS preflight. Theoretically, a simple request should not trigger a CORS preflight. A CORS preflight meets all of the following conditions:

- One of the allowed methods :GET, HEAD, POST
    
- The only headers are Accept, Accept-Language, Content-Language, Content-Type, and headers set by the user agent
    
- The only allowed values for the Content-Type header are: application/x-www-form-urlencoded, multipart/form-data, text/plain
    
- If the request is made using an XMLHttpRequest object, no event listeners are registered on the object returned by the XMLHttpRequest.upload property used in the request; that is, given an XMLHttpRequest instance xhr, no code has called xhr.upload.addEventListener() to add an event listener to monitor the upload.
    
- No ReadableStream object is used in the request.
    
Pastebin server does not respond with 
```
Access-Control-Allow-Origin: *
```
Hence, the brower does not allow any resources loaded from Pastebin server. Thus, I decided to use Node to make API requests. It is also a good exercise.

2. PasteBin server also imposes maximum API requests per day. Hence, I created a false server that will always return false data.
