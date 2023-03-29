import {
    AppBar, Box, Button, Container, IconButton, InputBase, Menu, MenuItem, Toolbar, Tooltip, Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

function Header() {
    const pages = ['Kategória', 'Recept feltöltése', 'Kapcsolat', 'Belépés / Regisztráció'];
    const url = ['/kategotia', '/feltoltes', '#kapcsolat', '/bejelenkezes'];

    const settings = ['Profile', 'Admin', 'Kijelenkezés'];

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

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

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
                <Search sx={{ flexGrow: 1, display: { xs: "none", lg: "block" } }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Keresés…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>

                {/*<Box sx={{ flexGrow: 0 }}>
                    <Tooltip title='Keresés'>
                        <IconButton
                            sx={{ flexGrow: 1, display: { xs: 'flex', lg: "none" }, color: '#d2713a' }}
                            onClick={(event) => {
                                
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                        </Box>*/}

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
                                    href={'/asd'}
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