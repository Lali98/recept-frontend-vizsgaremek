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
                    <div class="card-group">
                        <div style={{margin: '15px 0px 15px 0px'}} key={recipe._id}>
                                <Card sx={{ maxWidth: 350 }}>
                                        <CardMedia
                                            component="img"
                                            height="350"
                                            image={recipe.imageUrl == "" ? "/images/kaja.jpg" : `${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageUrl}`}
                                            alt="food"
                                        />
                                </Card>
                        </div>
                        <div className="fixed col fw-semibold" style={{maxWidth: 950}}>
                            <Card style={{backgroundColor: '#eeeff1', margin: '15px 0px 10px 30px', padding: '15px'}}>
                                <p>{recipe.name}</p>
                                <p>{recipe.description}</p>
                            </Card>
                        </div>
                    </div>

                    <div class="card-group">
                        <div className="col-lg-4 fw-semibold card mb-3 border-light" style={{backgroundColor: '#eeeff1', padding: '15px'}}>
                            <p>{recipe.name}</p>
                            <ol>
                                {recipe.steps && recipe.steps.map((steps) => (
                                <li>{steps}</li>
                                ))}
                            </ol>
                        </div>

                        <div className="col-lg-4 fw-semibold card mb-3 border-light" style={{backgroundColor: '#eeeff1', padding: '15px'}}>
                            <ul>
                                {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                                    <li>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>   
            <Footer />
        </>
    )
}

export default SingleRecipe;