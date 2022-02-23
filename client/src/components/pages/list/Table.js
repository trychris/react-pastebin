import { React, useEffect, useState } from 'react';
import { Button, Box, Container, CircularProgress, Fade, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { listPaste, deletePaste } from '../../../api/PasteBinApi';
import { settle } from '../../../utils/utils';

export default function PasteTable() {
  const [pasteData, setPasteData] = useState([])
  const [selectionModel, setSelectionModel] = useState([])
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const sessionKey = localStorage.getItem('sessionKey');
      const pasteDataArray = await listPaste(sessionKey);
      var counter = 0
      for (var paste of pasteDataArray) {
        paste.id = counter++
      }
      setPasteData(pasteDataArray);
    }
    fetchData();
  }, [])

  function handleDelete() {
    setIsLoading(true)
    setError(false)
    const sessionKey = localStorage.getItem('sessionKey');
    var deleteRequests = []
    for (var i of selectionModel) {
      if (0 <= i && i <= pasteData.length - 1) {
        deleteRequests.push(deletePaste(sessionKey, pasteData[i].pasteKey))
      }
    }

    var notAllSuccessful = false;
    settle(deleteRequests).then(results => {
      var pasteDataCopy = [...pasteData]
      for (var i = results.length - 1; i >= 0; i--) {
        if (results[i].state === 'fullfilled' && results[i].value.isSuccessful) {
          var indexToDelete = selectionModel[i]
          pasteDataCopy.splice(indexToDelete, 1)
        } else {
          notAllSuccessful = true
        }
      }
      setError(notAllSuccessful)
      setIsLoading(false)
      setSelectionModel([])
      setPasteData(pasteDataCopy)
    })

  }

  const columns = [
    { field: 'id', headerName: 'Index', width: 70 },
    { field: 'pasteKey', headerName: 'Paste Key', width: 130 },
    {
      field: 'pasteDate',
      headerName: 'Paste Date',
      width: 130,
      type: 'date',
      valueGetter: (params) => new Date(params.row.pasteUnixDate * 1000)
    },
    { field: 'pasteTitle', headerName: 'Title', width: 130 },
    { field: 'pasteFormatShort', headerName: 'Content', width: 130 },
    { field: 'pasteUrl', headerName: 'Paste URL', width: 400 },
  ];


  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'right', my: '10px' }}>
        {isLoading ? (
          <CircularProgress size={26} sx={{
            marginTop: '10px'
          }} />
        ) : (
          <Button
            onClick={handleDelete}
            variant="contained"
            color="primary"
            size="large">
            Delete
          </Button>
        )}

      </Box>
      <Box>
        <div style={{ height: 400 }}>
          <DataGrid
            rows={pasteData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        </div>
      </Box>
      <Fade in={error}>
        <Typography color="secondary" >
          Some or all paste have been deleted :(
        </Typography>
      </Fade>
    </Container>
  );
}