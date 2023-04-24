import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { TextField, Button, Grid, Box } from "@mui/material"

function Profile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    function userFetch() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`)
            .then((res) => res.json())
            .then(setUser)
            .catch(() => {
                return "";
            })
    }

    useEffect(() => {
        userFetch();
    }, []);

    return (
        <>
            <Header />
            <div className="container main">
                <div className="row" style={{ backgroundColor: '#ffffff66' }}>
                    <div className="col-12">
                        <h4 className="text-white mt-2 text-center">Adatok</h4>
                    </div>
                    <div className="col-lg-4">
                        <h6 className="mt-1">Felhasználónév:</h6><p>{user.username}</p>
                    </div>
                    <div className="col-lg-4">
                        <h6 className="mt-1">Email cím:</h6><p>{user.email}</p>
                    </div>
                    <div className="col-lg-4">
                        <h6 className="mt-1">Jogosultság:</h6><p>{user.role === "user" ? "Felhasználó" : "Admin"}</p>
                    </div>
                    <div className="col-12">
                        <h4 className="text-white mt-2">Beálitások</h4>
                    </div>
                    <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={async (e) => {
                        e.preventDefault();
                        const submitData = new FormData();
                        if(e.target.elements.username.value !== "") {
                            submitData.append('username', e.target.elements.username.value);
                        }
                        submitData.append('email', user.email);
                        
                        if(e.target.elements.username.value !== "") {
                            await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/update`, {
                                method: 'PUT',
                                body: submitData
                            });
                        }
                        else {
                            alert("Nincs mit fríssiteni!");
                        }
                        userFetch();
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="username"
                                    fullWidth
                                    id="username"
                                    label="Felhasználónév"
                                    autoFocus
                                    placeholder={user.username}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Mentés
                        </Button>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                            color="error"
                            onClick={async () => {
                                if(window.confirm('Tényleg ki akarja törölni a fiokját?\nAz a müvelet nem vonható vissza!')) {
                                    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/delete/${userId}`, {
                                        method: 'DELETE'
                                    })
                                    navigate('/kijelenkezes');
                                }
                            }}
                        >
                            Fiok törése
                        </Button>
                    </Box>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile;