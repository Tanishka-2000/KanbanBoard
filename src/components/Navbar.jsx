import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material'
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <DeveloperBoardIcon fontSize='large'/>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} mx={1}>
            <Link to='/'> Kanban Baord</Link>
          </Typography>

          <Button
           color="inherit"
           variant='outlined'
           onClick={() => setDarkMode(prev => !prev)}
           startIcon={ darkMode ? <LightModeIcon /> : <DarkModeIcon />}
           sx={{mr: 1}}
           >
            ChangeTheme
          </Button>

          <Button color="inherit" variant='outlined' onClick={logout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}