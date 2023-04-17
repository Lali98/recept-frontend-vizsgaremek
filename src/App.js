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
import Register from './Components/Register';
import Logout from './Components/Logout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/kategoria' element={<Category />} />
                <Route path='/uj-recept' element={<Upload />} />
                <Route path='/bejelentkezes' element={<Login />} />
                <Route path='/admin' element={localStorage.getItem('role') === "admin" && localStorage.getItem('role') ? (<Admin />) : (<HomePage />)} />
                <Route path='/receptek' element={<RecipeAll />} />
                <Route path='/kategoria/:categoryId' element={<RecipeCategoryPage />} />
                <Route path='/recept/:recipeId' element={<SingleRecipe />} />
                <Route path='/recept/:recipeId/szerkesztes' element={<EditRecipe />} />
                <Route path='/regisztracio' element={<Register />} />
                <Route path='/kijelenkezes' element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
