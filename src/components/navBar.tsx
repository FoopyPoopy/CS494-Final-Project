'use client'
import React, { useContext } from 'react';
import { googleSignIn, logOut, useUserContext } from "../context/userContext";
import { Container, AppBar, Toolbar, IconButton, Button, Link, Avatar, Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material';


const Navbar = () => {
    const user = useUserContext();

    const settings = ['Login', 'Profile', 'Logout'];

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting: string) => {
        setAnchorElUser(null);
        if (setting === 'Logout') {
            logOut();
            window.location.href = '/'
        }
        if (setting === 'Profile') {
            window.location.href = '/profile';
        }
        if (setting === 'Login') {
            googleSignIn();
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar >
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button color="inherit">Home</Button>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Profile" src={user?.photoURL} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={() => handleCloseUserMenu('')}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;