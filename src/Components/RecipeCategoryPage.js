import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

function RecipeCategoryPage() {
    const { categoryId } = useParams();
    const [recipes, setRecipe] = useState([]);
    function fetchRecipes() {
        return fetch(`http://192.168.0.65:9000/api/recipes/category/${categoryId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => setRecipe(data));
    }
    useEffect(() => {
        fetchRecipes();
        
    }, []);

    return (
        <>
            <Header />
            <div className="container main">
                <div className="row mt-lg-5 mt-3 ms-auto mb-3 mb-lg-5">
                    {recipes ?
                        recipes.map((recipe) => (
                            <div className='col-lg-4 col-md-6 col-sm-6 p-3' key={recipe._id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea href="">
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image="/images/kaja.jpg"
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
                        )) :
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Sajnáljuk</h4>
                            <hr />
                            <p>Nincsen ilyen receptek.</p>
                        </div>}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RecipeCategoryPage;