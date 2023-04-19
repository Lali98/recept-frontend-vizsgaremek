import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Cards() {
    const [randomDatas, setRandomDatas] = useState([]);

    const getRandomObjects = (array, count) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);
        return selected;
    };

    function fetchRecipes() {
        return fetch(process.env.REACT_APP_BACKEND_URL + '/api/recipes')
            .then(response => response.json())
            .then(data => {
                setRandomDatas(getRandomObjects(data, 6));
            });
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            {randomDatas.map((recipe) => (
                <div className='col-lg-4 col-md-6 col-sm-6 p-3' key={recipe._id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea href={`/recept/${recipe._id}`}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={recipe.imageUrl == "" ? "/images/emptydish.jpg" : `${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageUrl}`}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {recipe.name}
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