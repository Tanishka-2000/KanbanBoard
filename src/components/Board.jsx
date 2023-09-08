import { useState } from 'react'
import { Toolbar, Typography, Button, Paper, Stack, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material'
import { useLoaderData, Form } from 'react-router-dom';

import Column from './Column';
import ColumnForm from './ColumnForm';

export async function loader({ params }){

    const response = await fetch("https://kanban-kou1.onrender.com/board/" + params.boardId, {
        method: 'GET',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": 'Bearer ' + localStorage.getItem('token')
      },
    });
    const result = await response.json();
    return result;
}

function Board() {
    const [open, setOpen] = useState(false);
    const board = useLoaderData();

  return (
    <Stack spacing={2} padding={2}>
        <Paper>
            <Toolbar>
                <Typography variant='h6' sx={{ flex: '1'}}>Board Name: { board.name }</Typography>
                <Button variant='contained' onClick={() => setOpen(true)}>+ add new list</Button>
            </Toolbar>
        </Paper>

        <Stack direction='row' gap={4} padding={4} justifyContent='center' flexWrap='wrap'>
            { board.columns.map( column => <Column key={column._id} column={column}/>)}
        </Stack>

        <ColumnForm 
            open={open}
            handleClose={() => setOpen(false)}
            data={{}}
            action=''
        />    
    </Stack>
  )
}

export default Board