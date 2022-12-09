import React, { useContext } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { AuthContext } from "./context/auth-context";



const drawerWidth = 240;

export default function Navbar2(){
    const auth = useContext(AuthContext);
    // const { window } = props;
    // const [mobileOpen, setMobileOpen] = React.useState(false);
  
    // const handleDrawerToggle = () => {
    //   setMobileOpen(!mobileOpen);
    // };

    // const drawer = (
    //     <div>
    //       <Toolbar />
    //       <Divider />
    //       <Link
    //           to="/Profile"
    //           style={{ color: "white", textDecoration: "none" }}
    //         >
    //           My Profile
    //         </Link>
    //       <List>
    //         {/* {['MyFeed', 'MyPets', 'Profile'].map((text) => ( */}
    //           <ListItem key={'Profile'} disablePadding>
    //             <ListItemButton>
    //                 <Link
    //                 to="/Profile"
    //                 style={{ color: "white", textDecoration: "none" }}
    //                 >
    //                 Profile
    //                 </Link>
    //             </ListItemButton>
    //           </ListItem>
    //           <ListItem key={'Profile'} disablePadding>
    //             <ListItemButton>
    //                 <Link
    //                 to="/Profile"
    //                 style={{ color: "white", textDecoration: "none" }}
    //                 >
    //                 My Pets
    //                 </Link>
    //             </ListItemButton>
    //           </ListItem>
    //           <ListItem key={'PetFeed'} disablePadding>
    //             <ListItemButton>
    //                 <Link
    //                 to="/PetFeed"
    //                 style={{ color: "white", textDecoration: "none" }}
    //                 >
    //                 My Posts
    //                 </Link>
    //             </ListItemButton>
    //           </ListItem>
    //           <ListItem key={'PostFeed'} disablePadding>
    //             <ListItemButton>
    //                 <Link
    //                 to="/PostFeed"
    //                 style={{ color: "white", textDecoration: "none" }}
    //                 >
    //                 Feed
    //                 </Link>
    //             </ListItemButton>
    //           </ListItem>
    //       </List>
    //       <Divider />
    //     </div>
    //   );

    return(
    //     <Box sx={{ display: 'flex' }}>
    //     <CssBaseline />
    //     <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    //     <Toolbar>
    //       <Typography variant="h6" noWrap component="div">
    //         PetFinder
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1976d2' },
        }}
        >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
          {auth.isLoggedIn &&<ListItem key={'Profile'} disablePadding>
          <ListItemButton>
                    <Link
                    to="/Profile"
                    style={{ color: "white", textDecoration: "none" , fontWeight: 'Bold'}}
                    >
                    Profile
                    </Link>
                </ListItemButton>
              </ListItem>}
              {auth.isLoggedIn &&<ListItem key={'MyFeed'} disablePadding>
                <ListItemButton>
                    <Link
                    to="/MyFeed"
                    style={{ color: "white", textDecoration: "none", fontWeight: 'Bold' }}
                    >
                    My Posts
                    </Link>
                </ListItemButton>
              </ListItem>}
              {auth.isLoggedIn &&<ListItem key={'PetFeed'} disablePadding>
                <ListItemButton>
                    <Link
                    to="/PetFeed"
                    style={{ color: "white", textDecoration: "none", fontWeight: 'Bold' }}
                    >
                    My Pets
                    </Link>
                </ListItemButton>
              </ListItem>}
              <ListItem key={'PostFeed'} disablePadding>
                <ListItemButton>
                    <Link
                    to="/Home"
                    style={{ color: "white", textDecoration: "none" , fontWeight: 'Bold'}}
                    >
                    Feed
                    </Link>
                </ListItemButton>
              </ListItem>
              {!auth.isLoggedIn &&<ListItem key={'Login'} disablePadding>
                <ListItemButton>
                    <Link
                    to="Login"
                    style={{ color: "white", textDecoration: "none" , fontWeight: 'Bold'}}
                    >
                    Login
                    </Link>
                </ListItemButton>
              </ListItem>}
          </List> 
        </Box>
      </Drawer>
     
      )
}