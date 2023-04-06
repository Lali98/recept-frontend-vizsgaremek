import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function EditRecipe() {
    const {recipeId} = useParams();

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

    const [categories, setCategories] = useState([]);
    function fetchCategories() {
        return fetch(process.env.REACT_APP_BACKEND_URL + '/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchRecipe();
    }, []);

    return (
        <>
            <Header />
            <div className="container main">
                <div className="row p-4 mt-lg-3 mb-lg-3" style={{ backgroundColor: "#ffffff66" }}>
                    <h3 className="text-center">Recept szerkeztése</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Étel neve</label>
                            <input type="text" className="form-control" id="name" name="name" placeholder={recipe.name} defaultValue={recipe.name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Leírás</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows="6"
                                defaultValue={recipe.description}
                                placeholder={recipe.description}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoriesId" className="form-label">Kategoria</label>
                            <select className="form-select" id="categoriesId" name="categoriesId">
                                {categories.map((category) => (
                                    <option 
                                        key={category._id} 
                                        defaultValue={category._id} 
                                        selected={category._id === recipe.categoriesId}
                                    >{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EditRecipe;