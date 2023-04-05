import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, TextField } from "@mui/material";

function EditRecipe() {
    const { recipeId } = useParams();

    const [recipe, setRecipe] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    function fetchRecipe() {
        return fetch(process.env.REACT_APP_BACKEND_URL + "/api/recipes/" + recipeId)
            .then(response => response.json())
            .then(data => {
                setRecipe(data);
                setIngredients(data.ingredients.map((ingredient) => [ingredient]));
                setSteps(data.steps.map((step) => [step]));
                document.title = `"${data.name}" szerkeztése - Delicious`;
            });
    }

    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        <>
            <Header />
            <div className="container main">
                <div className="row p-4 mt-lg-3 mb-lg-3" style={{ backgroundColor: "#ffffff66" }}>
                    <h3 className="text-center">Recept szerkeztése</h3>
                    <Box>
                        <TextField
                            id="name" 
                            label="Étel neve" 
                            variant="standard" 
                            className="col-lg-12 mb-3" 
                            value={recipe.name != "" ? [recipe.name]: ""}
                            onChange={(e) => setRecipe({...recipe, name: e.target.value})}
                        />
                        <TextField
                            id="description" 
                            label="Leírás" 
                            variant="standard" 
                            multiline
                            rows="4"
                            className="col-lg-12 mb-3" 
                            value={recipe.description != "" ? [recipe.description]: ""}
                            onChange={(e) => setRecipe({...recipe, description: e.target.value})}
                        />
                        {ingredients.map((ingredient, i) => (
                            <TextField
                                id="ingredient"
                                label={(i + 1) + ". hozzávaló"}
                                variant="standard"
                                className="col-lg-10"
                                value={ingredient != "" ? [ingredient]: ""}
                                onChange={(e) => setRecipe({...recipe, ingredients: [e.target.value]})}
                            />
                        ))}
                    </Box>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditRecipe;