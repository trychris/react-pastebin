import React from "react";
import { Grid, Typography } from "@mui/material";

export default function Error() {
    return (
        <Grid 
            container
            justifyContent="center"
            alignItems="center"
            >
            <Typography variant="h1">
                Oops, something went wrong.
            </Typography>
        </Grid>
    )
}