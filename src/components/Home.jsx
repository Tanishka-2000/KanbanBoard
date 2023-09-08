import { useState } from "react";
import { Box, Grid, Stack, Paper, Typography, Button, TextField, IconButton, InputLabel, MenuItem, FormControl, Select,
Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/EditOutlined'
import CircleIcon from '@mui/icons-material/Circle'
import { useLoaderData, Form, Link, useSubmit } from "react-router-dom";

import { colors } from "./colors";

export async function loader(){
  
  const response = await fetch('https://kanban-kou1.onrender.com/board/all',{
    method: 'GET',
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": 'Bearer ' + localStorage.getItem('token')
  },
  });
  const data = await response.json();
  return data;
}



export default function Home() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [action, setAction] = useState("");
  const boards = useLoaderData();
  const submit = useSubmit();

  const handleClose = () => {
    setOpen(false);
    setData({});
    setAction("");
  }

  const editBoard = (boardId, boardName, boardColor) => {
    setAction('board/' + boardId + '/edit');
    setData({name: boardName, color: boardColor});
    setOpen(true)
  };

  const deleteBoard = (boardId) => submit({}, { method: 'delete', action: '/board/' + boardId + '/delete'});

  return (
    <Stack alignItems='center' justifyContent='center' gap={5} sx={{ minHeight: '80vh', textAlign: 'center', paddingInline: '50px'}}>
      
      <Box sx={{ maxWidth: '800px'}} mt={5}>
        <Typography variant="h4">Welcome to Trello Clone.</Typography>
        <Typography variant="body1" mt={3}>Whether you and your team are starting something new or trying to get more organized with your existing work, Trello clone adapts to any project. It helps you simplify and standardize your team’s work process in an intuitive way.</Typography>
      </Box>
  
      <Button onClick={() => setOpen(true)}>+ Create New Board</Button>
      {open && <BoardForm open={open} action={action} data={data} handleClose={handleClose} />}

      <Grid container sx={{ maxWidth: '900px'}} spacing={3}>
        
        {
          boards.map( (item, i) => 
            <Grid item key={i} xs={12} sm={6} md={4} >
              <Paper sx={{ backgroundColor: item.color, color: 'white'}}>
                <Stack direction='row' justifyContent='end'>
                  <IconButton color='inherit' onClick={(e) => editBoard(item._id, item.name, item.color)}><EditIcon /></IconButton>
                  <IconButton color='inherit' onClick={(e) => deleteBoard(item._id)}><DeleteIcon /></IconButton>
                </Stack>
                <Link to={'board/' + item._id}>
                  <Typography sx={{  color: 'white', padding: '20px 40px 40px'}}>{ item.name }</Typography>
                </Link>
              </Paper>
            </Grid>
            )
        }
      </Grid>
    </Stack>
  )
}

function BoardForm({ open, action, data, handleClose}){

  return(
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{data.name ? "Edit Board" : "Create New Board"}</DialogTitle>
      <Form method='post' action={action} onSubmit={handleClose}>
        <DialogContent>
          <DialogContentText>
            {
              data.name
              ? "Please retype the name and/or reselect color of the board to edit it."
              : "Please type the name and select color of the board to create it."
            }
            
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Board Name"
            name='name'
            fullWidth
            defaultValue={data.name}
            sx={{ my: 2}}
          />
          <FormControl fullWidth>
            <InputLabel id='boardColor'>Color</InputLabel>
            <Select
              labelId="boardColor"
              margin='dense'
              defaultValue={data.color || '#696969'}
              fullWidth
              name='color'
              label="Board Color"
            >
              {
                colors.map(item => <MenuItem key={item.name} value={item.color}><CircleIcon sx={{color: item.color, mr: 1}} /> {item.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button type='button' onClick={handleClose}>Cancel</Button>
          <Button type='submit' >{ data.name ? 'Save Changes' : 'Create' }</Button>
        </DialogActions>
      </Form>
    </Dialog>
  )
}