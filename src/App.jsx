import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Outlet, redirect } from "react-router-dom"

import Navbar from './components/Navbar';

export async function loader(){
  let token = localStorage.getItem('token');
  if(!token){
    return redirect('/login');
  }
  return null;
}

const light = {
  palette:{
    mode: 'light',
    background: {
      
    }
  }
};

const dark = {
  palette: {
    mode: 'dark',
  }
};


function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={darkMode ? createTheme(dark) : createTheme(light)}>
          <CssBaseline />
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Outlet />
        </ThemeProvider>
      </LocalizationProvider>
    </div>
  )
}

export default App