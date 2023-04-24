import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getCookies, userFetch } from '../App';

export default function BasicTable() {
    const [users, setUsers] = useState();
    const [recipes, setRecipes] = useState();
    const [isUser, setIsUser] = useState(false);
    const [isRecipes, setIsRecipes] = useState(false);

    const [loginUser, setLoginUser] = useState({});
    const [cookies, setCookise] = useState();

    useEffect(() => {
        setCookise(getCookies());
    }, []);

    useEffect(() => {
        userFetch(cookies, setLoginUser);
    }, [cookies]);

    function fetchRecipes() {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes`)
        .then((res) => res.json())
        .then((data) => setRecipes(data));
    }
    function fetchUsers() {
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    useEffect(() => {
        fetchUsers()
    }, []);

    useEffect(() => {
        document.title = "Admin - Delicious"
    })

    return (
        <>
            <Header />
            <div className='container-fluid main'>
                <div className='row p-3' style={{ backgroundColor: "#ffffffaa" }}>
                    <Stack spacing={2} margin={2} direction='row' className='align-items-center justify-content-center'>
                        <Button variant={!isUser ? "outlined" : "contained"} onClick={(e)=>{
                            e.preventDefault();
                            setIsUser(true);
                            setIsRecipes(false);
                        }}>Felhasználók</Button>
                        <Button variant={!isRecipes ? "outlined" : "contained"} onClick={(e) => {
                            e.preventDefault();
                            setIsRecipes(true);
                            setIsUser(false);
                        }}>Receptek</Button>
                    </Stack>
                    {isUser ?
                    <>
                        <h6 className='text-center pb-2'>Az összes felasználók száma: {users.length} db</h6>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Email cím</TableCell>
                                        <TableCell>Felhasználónév</TableCell>
                                        <TableCell>Szerepkör</TableCell>
                                        <TableCell>Felhasználó keszítése időpontja</TableCell>
                                        <TableCell>Felhasználó frissítése időpontja</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {user.email}
                                            </TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.role}</TableCell>
                                            <TableCell>{user.createdAt}</TableCell>
                                            <TableCell>{user.updatedAt}</TableCell>
                                            <TableCell>
                                                <Stack spacing={2} direction='row'>
                                                    {user._id !== cookies.id ? <>
                                                        <Button variant='contained' color={user.role === 'user' ? 'success' : 'warning'} onClick={async () => {
                                                            const data = new FormData();
                                                            data.append('user_id', user._id);
                                                            data.append('email', user.email);
                                                            data.append('role', user.role === "admin" ? "user" : "admin");
                                                            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/update`, {
                                                                method: 'PUT',
                                                                body: data
                                                            });
                                                            fetchUsers();
                                                        }}>{user.role === "user" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
                                                        <Button variant='contained' color='error' onClick={async () => {
                                                            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/delete/${user._id}`, {
                                                                method: 'DELETE'
                                                            });
                                                            fetchUsers();
                                                        }}><DeleteIcon /></Button>
                                                    </> : <>
                                                        <Button disabled variant='contained' color={user.role === 'user' ? 'success' : 'warning'}>{user.role === "user" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</Button>
                                                        <Button disabled variant='contained' color='error'><DeleteIcon /></Button>
                                                    </>}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </> : ""}
                    {isRecipes ? <>
                        <h6 className='text-center pb-2'>Az összes receptek száma: {recipes.length} db</h6>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Recept nevei</TableCell>
                                        <TableCell>Leírás</TableCell>
                                        <TableCell>Recept linkje</TableCell>
                                        <TableCell>Recept készitése időpontja</TableCell>
                                        <TableCell>Recept frissítése időpontja</TableCell>
                                        <TableCell>Engedélyezve van-e</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recipes.map((recipe) => (
                                        <TableRow
                                            key={recipe._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell>{recipe._id}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {recipe.name}
                                            </TableCell>
                                            <TableCell>{recipe.description}</TableCell>
                                            <TableCell><a href={`/recept/${recipe._id}`} target='_blank' rel='noreferrer'>Link</a></TableCell>
                                            <TableCell>{recipe.createdAt}</TableCell>
                                            <TableCell>{recipe.updatedAt}</TableCell>
                                            <TableCell>
                                                <div className={`${recipe.isEnable ? "bg-success" : "bg-danger"} text-white rounded-pill p-2 text-center`}>{recipe.isEnable ? "igen" : "nem"}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Stack spacing={2} direction='row'>
                                                    <Button variant='contained' color={recipe.isEnable ? 'error' : 'success'} onClick={async () => {
                                                        const data = new FormData();
                                                        data.append('isEnable', !recipe.isEnable);
                                                        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipe._id}`, {
                                                            method: 'PUT',
                                                            body: data
                                                        });
                                                        fetchRecipes();
                                                    }}>{!recipe.isEnable ? <DoneIcon /> : <ClearIcon />}</Button>
                                                    {!recipe.isEnable ? <Button variant='contained' color='error' onClick={async () => {
                                                        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/recipes/${recipe._id}`, {
                                                            method: 'DELETE'
                                                        });
                                                        fetchRecipes();
                                                    }}><DeleteIcon /></Button> : <Button disabled variant='contained' color='error'><DeleteIcon /></Button>}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </> : ""}
                </div>
            </div>
            <Footer />
        </>
    );
}