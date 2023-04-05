import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Category from "./Components/Category";
import Upload from "./Components/Upload";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import RecipeAll from "./Components/RecipeAll";
import RecipeCategoryPage from "./Components/RecipeCategoryPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleRecipe from './Components/SingleRecipe';
import EditRecipe from './Components/EditRecipe';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/kategoria' element={<Category />} />
                <Route path='/uj-recept' element={<Upload />} />
                <Route path='/bejelenkezes' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/receptek' element={<RecipeAll />} />
                <Route path='/kategoria/:categoryId' element={<RecipeCategoryPage />} />
                <Route path='/recept/:recipeId' element={<SingleRecipe />} />
                <Route path='/recept/:recipeId/szerkeztes' element={<EditRecipe />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
