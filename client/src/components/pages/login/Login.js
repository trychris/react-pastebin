import React, { useState } from "react";
import {
    Grid,
    CircularProgress,
    Typography,
    Fade,
    TextField,
    Button
} from "@mui/material";
import { useDispatch } from 'react-redux';
import { signinUser } from "../../../data/user/action";


export default function Login(props) {
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [username, setUsername] = useState("");
    var [passwordValue, setPasswordValue] = useState("");
    var dispatch = useDispatch();

    const validateForm = (username, password) => {
        return username.length > 0 && password.length > 0;
    }

    const successCallback = () => {
        setError(null)
        setIsLoading(false)
    }
    const failureCallback = () => {
        setError(true);
        setIsLoading(false);
    }
    const handleSubmit = () => {
        setError(false);
        setIsLoading(true);
        dispatch(signinUser(
            username,
            passwordValue,
            successCallback,
            failureCallback
        ))
    }
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh">
            <Grid item>
                <Typography variant="h4">
                    Sign in with Pastebin account
                </Typography>
            </Grid>
            
            <Grid item>
                <TextField
                    label="Username"
                    variant="standard"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    margin="normal"
                    placeholder="Username"
                    type="username"
                    fullWidth
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Password"
                    variant="standard"
                    id="password"
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    margin="normal"
                    placeholder="Password"
                    type="password"
                    fullWidth
                />
            </Grid>
            <Grid item sx={{ paddingTop: 5 }}>
                {isLoading ? (
                    <CircularProgress size={26} sx={{
                        marginTop: '10px'
                    }} />
                ) : (
                    <Button
                        disabled={!validateForm(username, passwordValue)}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Login
                    </Button>
                )}
            </Grid>
            <Grid item sx={{ paddingTop: 5 }}>
                <Fade in={error}>
                    <Typography color="secondary" >
                        Something is wrong with your login or password :(
                    </Typography>
                </Fade>
            </Grid>

        </Grid>

    );
}