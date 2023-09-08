import { Paper, Stack, TextField, Button, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const logIn = (action) => {
    fetch('https://kanban-kou1.onrender.com/' + action ,{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
    },
      body: JSON.stringify({ username, password})
    })
    .then( response => response.json())
    .then( result => {
      if(!result.token) setError(result.message)
      else {
        localStorage.setItem('token', result.token);
        navigate('/');
      }
    })
  }
  
  return (
    <Stack alignItems='center' mt={5} pt={5}>
      <Typography variant='h5'>Welcome to Kanban Board</Typography>
      <Paper sx={{ maxWidth: 'sm', p:3, mt: 5}}>
        <Typography variant='h6' my={2}> Log In / Sign In</Typography>
        <TextField
        autoFocus
        margin="dense"
        label="Username"
        fullWidth
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        />
        <TextField
        autoFocus
        margin="dense"
        label="Password"
        type='password'
        fullWidth
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        />
        <Typography variant='caption' color='error.main'>{error}</Typography>
        <Button variant='contained' sx={{ width: '100%', my: 2}} onClick={() => logIn('login')}>Log In</Button>
        <Divider sx={{ mb: 2}}>OR</Divider>
        <Button variant='contained' sx={{ width: '100%'}} onClick={() => logIn('signup')}>Sign In</Button>
      </Paper>
    </Stack>
  )
}

export default Login