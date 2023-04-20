import {
    AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { getCookies, userFetch } from '../App';

function Header() {
    const [user, setUser] = useState({});
    const [cookies, setCookise] = useState();

    useEffect(() => {
        setCookise(getCookies());
    }, []);

    useEffect(() => {
        userFetch(cookies, setUser);
    }, [cookies]);

    const pages = ['Kategória', "Receptek", 'Recept feltöltése', 'Kapcsolat', !user._id ? 'Belépés / Regisztráció' : ""];
    const url = ['/kategoria', '/receptek', '/uj-recept', '#kapcsolat', !user._id ? '/bejelentkezes' : ""];

    const settings = ['Profile', user.role === 'admin' ? 'Admin' : '' , 'Kijelenkezés'];
    const settingsUrl = ['/', user.role === 'admin' ? '/admin' : '', '/kijelenkezes'];

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
                        {pages.map((page, index) => page !== "" ? (<MenuItem key={page} onClick={handleCloseNavMenu}>
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
                        </MenuItem>) : "")}
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
                    {pages.map((page, i) => page !== "" ? (<Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: '#d2713a', display: 'block', fontWeight: 'bold' }}
                        href={url[i]}
                    >
                        {page}
                    </Button>) : "")}
                </Box>

                {/*Accunt*/}
                {user._id ? <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title={user.username}>
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
                        <MenuItem>
                            <Typography textAlign="center">
                                <p>Felhasználónév: {user.username} <br />Jogosultsága: {user.role}</p>
                            </Typography>
                        </MenuItem>
                        {settings.map((setting, index) => setting !== "" ? (<MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: '#000', display: 'block', fontWeight: 'bold' }}
                                    href={settingsUrl[index]}
                                >
                                    {setting}
                                </Button>
                            </Typography>
                        </MenuItem>) : "")}
                    </Menu>
                </Box> : ""}
            </Toolbar>
        </Container>
    </AppBar>)
}

export default Header;