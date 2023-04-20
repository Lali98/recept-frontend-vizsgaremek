import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="/">
                Delicious
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("email", e.target.elements.email.value);
        data.append("password", e.target.elements.password.value);

        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        if (data.get('email') && data.get('password')) {
            const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
                method: 'POST',
                body: data
            });
            const serverData = await result.json();
            if (result.status === 200) {
                document.cookie = `id=${serverData._id}; max-age=86400`;
                navigate('/');
            } else if (serverData.message === "User does not exist") {
                alert('Nincs ilyen regisztrált email cím!');
            } else if (serverData.message === "Invalid password") {
                alert('Helytelen jelszó!');
            }
        } else {
            alert('Minden mezőt kötelező kitölteni!');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ backgroundColor: '#ffffff77' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Bejelentkezés
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Jelszó"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Bejelentkezés
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/regisztracio" variant="body2">
                                    {"Még nem regisztráltál? Katt ide!"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}