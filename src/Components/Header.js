import {
    AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";

function Header() {
    const pages = ['Kategória', "Receptek", 'Recept feltöltése', 'Kapcsolat', 'Belépés / Regisztráció'];
    const url = ['/kategoria', '/receptek', '/uj-recept', '#kapcsolat', '/bejelentkezes'];

    const settings = ['Profile', 'Admin', 'Kijelenkezés'];
    const settingsUrl = ['/', '/admin', '/kijelenkezes'];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (<AppBar position="static" sx={{ backgroundColor: '#EEEFF1' }}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 100,
                        color: '#d2713a',
                        textDecoration: 'none',
                        fontFamily: 'Great Vibes',
                        fontSize: '2rem'
                    }}
                >
                    Delicious
                </Typography>

                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        sx={{ color: '#d2713a' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page, index) => (<MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: '#000', display: 'block', fontWeight: 'bold' }}
                                    href={url[index]}
                                >
                                    {page}
                                </Button>
                            </Typography>
                        </MenuItem>))}
                    </Menu>
                </Box>

                {/*Telefonos megjelenítés*/}
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'Great Vibes',
                        fontWeight: 100,
                        color: '#d2713a',
                        textDecoration: 'none',
                        fontSize: '2.5rem'
                    }}
                >
                    Delicious
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page, i) => (<Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: '#d2713a', display: 'block', fontWeight: 'bold' }}
                        href={url[i]}
                    >
                        {page}
                    </Button>))}
                </Box>

                {/*Accunt*/}
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Profile">
                        <IconButton
                            sx={{ color: '#d2713a' }}
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenUserMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting, index) => (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Button
                                    key={setting}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: '#000', display: 'block', fontWeight: 'bold' }}
                                    href={settingsUrl[index]}
                                >
                                    {setting}
                                </Button>
                            </Typography>
                        </MenuItem>))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>)
}

export default Header;