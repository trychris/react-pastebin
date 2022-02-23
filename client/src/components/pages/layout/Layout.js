import React from "react";
import { Grid, Box } from '@mui/material';
import Header from "../../header/Header";
import { Route, Routes } from "react-router-dom";
import Create from "../create/Create";
import PasteTable from "../list/Table"

// https://stackoverflow.com/questions/69988285/nested-routing-in-react-router-dom-v6

export default function Layout() {
    return (
        <>
            <Header />
            <Box sx={{  marginTop: '100px' }}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '100px' }}> */}
                <Routes>
                    <Route path="" element={<Create />} />
                    <Route path="create" element={<Create />} />
                    <Route path="list" element={<PasteTable />} />
                </Routes>
            </Box>

        </>

    );
}