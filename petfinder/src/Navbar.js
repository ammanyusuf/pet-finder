import React, {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from './context/auth-context'
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
    const auth = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Link to="/Home" style={{color: 'white', textDecoration: 'none'}}>Feed</Link>
            {auth.isLoggedIn &&
            (<Link to="/" style={{color: 'white', textDecoration: 'none'}}>My Post</Link>)
            }
            {auth.isLoggedIn &&
            (<Link to="/" style={{color: 'white', textDecoration: 'none'}}>My Pet</Link>)
            }
            {auth.isLoggedIn &&
                (<Button onClick={auth.logout}  variant="contained" color="secondary" style={{color:'white'}}>
                  Logout
                </Button>)
            }
            {!auth.isLoggedIn &&
                <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>Login</Link>
            }
            {auth.isLoggedIn &&
            (<h2>{auth.name}</h2>)
            }
        </Toolbar>
      </AppBar>
    </Box>
  );
}