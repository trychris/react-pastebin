import { React, useState } from 'react';
import {
    Grid,
    CircularProgress,
    Typography,
    Fade,
    TextField,
    Button
} from "@mui/material";
import {createPaste} from '../../../api/PasteBinApi'

export default function Create() {
    var [response, setResponse] = useState({isSuccessful: false});
    var [textValue, setTextValue] = useState("");
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);

    const validateForm = (textValue) => {
        return textValue.length > 0;
    }

    const handleSubmit = async () => {
        setError(false);
        setIsLoading(true);
        const {pasteLink, isSuccessful} = await createPaste(textValue);
        setIsLoading(false);
        if (isSuccessful) {
            setError(null);           
            setResponse({isSuccessful, pasteLink});
        } else {
            setError(true);
            setResponse({isSuccessful});
        }
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
                    Create a paste
                </Typography>
            </Grid>

            <Grid item sx={{minWidth: '250px'}}>
                <TextField
                    id="textValue"
                    value={textValue}
                    onChange={e => setTextValue(e.target.value)}
                    margin="normal"
                    placeholder="Create Paste"
                    type="string"
                    fullWidth
                    multiline
                    rows={8}
                />
            </Grid>
            <Grid item sx={{ paddingTop: 5 }}>
                {isLoading ? (
                    <CircularProgress size={26} sx={{
                        marginTop: '10px'
                    }} />
                ) : (
                    <Button
                        disabled={!validateForm(textValue)}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Create
                    </Button>
                )}
            </Grid>
            <Grid item sx={{ paddingTop: 5 }}>
                <Fade in={error}>
                    <Typography color="secondary" >
                        Something is wrong with submission :(
                    </Typography>
                </Fade>
                <Fade in={response.isSuccessful}>
                    <Typography color="secondary" >
                        Paste can be found at
                        <a href={response.pasteLink}> {response.pasteLink} </a>
                    </Typography>
                </Fade>
            </Grid>

        </Grid>
    )
}