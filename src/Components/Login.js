import {Box, TextField} from "@mui/material";

function Login() {
    return (
        <main className='text-center form-signin w-50 m-auto align-items-center' id='login'>
            <form>
                <h1 className='h3 mb-3 fw-normal'>Bejelenkezés</h1>
                <Box component="form" sx={{
                    '& > :not(style)' : {
                        m: 1,
                        width: '25ch'
                    }
                }} noValidate autoComplete='off'>
                    <TextField id='username' label='Felhasználónév' variant="filled"/>
                </Box>
            </form>
        </main>
    )
}

export default Login;