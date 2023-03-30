import {Box, TextField} from "@mui/material";
import Header from './Header';
import Footer from './Footer';

function Login() {
    return (
        <>
            <Header/>
            <main className='text-center form-signin w-50 m-auto align-items-center' id='login' style={{fontSize : '30px' }}>
                <form>
                    <h1 className='h3 mb-3 fw-normal'>Bejelenkezés</h1>
                    <Box component="form" sx={{
                        '& > :not(style)' : {
                            m: 2,
                            width: '25ch'
                        }
                    }} noValidate autoComplete='off'>
                        <TextField id='username' label='Felhasználónév' variant="filled"/>
                        <br/>
                        <TextField id='password' label='Jelszó' variant="filled"/>
                    </Box>

                    <h1 className='h3 mb-3 fw-normal'>Regisztráció</h1>
                    <Box component="form" sx={{
                        '& > :not(style)' : {
                            m: 2,
                            width: '25ch'
                        }
                    }} noValidate autoComplete='off'>
                        <TextField id='username' label='Felhasználónév' variant="filled"/>
                        <br/>
                        <TextField id='emailaddress' label='Email cím' variant="filled"/>
                        <br/>
                        <TextField id='password' type="password" label='Jelszó (Legalább 8 karakter)' variant="filled" minlength="8"/>
                        <br/>
                        <TextField id='passwordagain' type="password" label='Jelszó mégegyszer (Legalább 8 karakter)' variant="filled" minlength="8"/>
                    </Box>
                </form>
            </main>
            <Footer/>
        </>
    )
}

export default Login;