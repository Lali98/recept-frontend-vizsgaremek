import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Card, CardMedia, } from "@mui/material";
import { getCookies, userFetch } from '../App';

function SingleRecipe() {
    const [loginuser, setLoginUser] = useState({});
    const [cookies, setCookise] = useState();
    const [createUser, setCreateUser] = useState({});

    useEffect(() => {
        setCookise(getCookies());
    }, []);

    useEffect(() => {
        userFetch(cookies, setLoginUser);
    }, [cookies]);

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState([]);
    function fetchRecipe() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "/api/recipes/" + recipeId)
            .then(response => {
                const adat = response.json();
                if (response.ok) {
                    return adat;
                }
            })
            .then(data => {
                setRecipe(data);
                document.title = `${data.name} - Delicious`
            });
    }

    function fetchCreateRecipe() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "/api/users/" + recipe.createdUserId)
        .then(response => {
            const adat = response.json();
            if (response.ok) {
                return adat;
            }
            return {username: 'Admin'}
        })
        .then((data) => setCreateUser(data));
    }

    useEffect(() => {
        fetchRecipe();
    }, []);

    useEffect(() => {
        fetchCreateRecipe();
    }, [recipe])

    return (
        <>
            <Header />
            <div className="container main">
                <div className="row">
                    <div className="card-group">
                        <div style={{ margin: '15px 0px 15px 0px' }} key={recipe._id}>
                            <Card sx={{ maxWidth: 350 }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={recipe.imageUrl == "" ? "/images/emptydish.jpg" : `${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageUrl}`}
                                    alt="food"
                                />
                            </Card>
                        </div>
                        <div className="fixed col fw-semibold" style={{ maxWidth: 950 }}>
                            <Card style={{ backgroundColor: '#eeeff1', margin: '15px 0px 10px 30px', padding: '30px' }}>
                                <figure>
                                    <blockquote className="blockquote">
                                        <p>{recipe.name}</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        Készítette: <cite title={createUser.username}>{createUser.username}</cite>
                                    </figcaption>
                                </figure>
                                <p>{recipe.description}</p>
                            </Card>
                        </div>
                    </div>

                    {loginuser.role === 'admin' || loginuser._id === recipe.createdUserId && loginuser._id ? <a href={`/recept/${recipeId}/szerkesztes`} className="btn btn-light fw-semibold m-3" style={{ maxWidth: 300 }} role="button">Szerkesztés</a> : ""}

                    <div className="card-group">
                        <div className="col-lg-4 fw-semibold card mb-3 border-light" style={{ backgroundColor: '#eeeff1', padding: '30px' }}>
                            <p>{recipe.name}</p>
                            <ol>
                                {recipe.steps && recipe.steps.map((steps) => (
                                    <li>{steps}</li>
                                ))}
                            </ol>
                        </div>

                        <div className="col-lg-4 fw-semibold card mb-3 border-light" style={{ backgroundColor: '#eeeff1', padding: '30px' }}>
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