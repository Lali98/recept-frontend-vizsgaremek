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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Regisztráció - Delicious";
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("username", e.target.elements.username.value);
    data.append("password", e.target.elements.password.value);
    data.append("email", e.target.elements.email.value);

    console.log(
      data.get('username'),
      data.get('password'),
      data.get('email')
    );

    if (data.get('username') && data.get('password') && data.get('email')) {
      if (e.target.elements.password.value === e.target.elements.passwordA.value) {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, {
          method: 'POST',
          body: data
        });
        const serverData = await result.json();
        console.log(serverData);
        if (result.status === 201) {
          localStorage.setItem('username', serverData.username);
          localStorage.setItem('token', serverData.token);
          localStorage.setItem('role', serverData.role);
          localStorage.setItem('id', serverData._id);
          navigate('/');
        } else {
          if (serverData.message === "User already exists") {
            alert('A felhasználó már létezik!');
          }
        }
      } else {
        alert('A két jelszó nem egyforma');
      }
    } else {
      alert('Minden mező kőtelező kitőlteni!');
    }
  }

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
            Regisztráció
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='off'
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Felhasználónév"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email cím"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Jelszó"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordA"
                  label="Jelszó mégegyszer"
                  type="password"
                  id="passwordA"
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Regisztráció
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/bejelentkezes" variant="body2">
                  Ha van felhasználót akkor katt ide!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}