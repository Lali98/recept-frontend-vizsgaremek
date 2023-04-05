import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Card, CardMedia,} from "@mui/material";

function SingleRecipe() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState([]);
    function fetchRecipe() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "/api/recipes/" + recipeId)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setRecipe(data);
                document.title = `${data.name} - Delicious`
            });
    }
    useEffect(() => {
        fetchRecipe();
    }, []);
    return (
        <>
            <Header />
            <div className="container main">
                <div className="row">
                    <div className='col-lg-4 col-md-6 col-sm-6 p-3' key={recipe._id}>
                            <Card sx={{ maxWidth: 350 }}>
                                    <CardMedia
                                        component="img"
                                        height="350"
                                        image={recipe.imageUrl == "" ? "/images/kaja.jpg" : `${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageUrl}`}
                                        alt="food"
                                    />
                            </Card>
                    </div>
                    <div className="col-lg-4 fw-semibold">
                        <p>{recipe.name}</p>
                        <p maxWidth="350">{recipe.description}</p>
                    </div>
                    <div className="col-lg-4 fw-semibold">
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                                <li>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>   
            <Footer />
        </>
    )
}

export default SingleRecipe;