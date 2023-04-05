import { red } from '@mui/material/colors';
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';

function RecipeAll() {
    const [recipes, setRecipes] = useState([]);
    function fetchRecipes() {
        return fetch(process.env.REACT_APP_BACKEND_URL + '/api/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data));
    }

    useEffect(() => {
        fetchRecipes();
    }, []);
    return (
        <>
            <Header />
            <div className='container d-flex align-items-center justify-content-center main'>
                <div className='row mt-lg-5 mt-3 ms-auto mb-3 mb-lg-5'>
                <h2 className='text-center col-12' style={{color: '#fff'}}>Az összes receptek</h2>
                    {recipes.map((recipe) => (
                        <div className='col-lg-4 col-md-6 col-sm-6 p-3' key={recipe._id}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                            R
                                        </Avatar>
                                    }
                                    title={recipe.name}
                                    subheader={recipe.createdAt.split('T')[0]}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={recipe.imageUrl == "" ? "/images/kaja.jpg" : `${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageUrl}`}
                                    alt={recipe.name}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {recipe.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RecipeAll;