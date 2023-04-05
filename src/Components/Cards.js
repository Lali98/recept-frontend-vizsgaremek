import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import { useEffect, useState } from "react";

function Cards() {
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
            {recipes.map((recipe) => (
                <div className='col-lg-4 col-md-6 col-sm-6 p-3' key={recipe._id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/images/kaja.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {recipe.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default Cards;