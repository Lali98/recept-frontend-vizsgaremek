import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { useEffect, useState } from 'react';

function App() {
    const [user, setUser] = useState({});
    const [success, setSuccess] = useState();
    const [cookies, setCookise] = useState();
    function getCookies() {
        const cookies = {};
        document.cookie.split(';').forEach(cookie => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            if (name) {
                cookies[name] = value;
            }
        });
        return cookies;
    }
    function userFetch() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${localStorage.getItem('id')}`)
            .then((res) => res.json())
            .then(setUser)
            .catch(() => {
                return "";
            })
    }
    useEffect(() => {
        setSuccess(userFetch());
        setCookise(getCookies());
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/kategoria' element={<Category />} />
                <Route path='/uj-recept' element={success !== "" && localStorage.getItem('id') ? <Upload /> : <HomePage />} />
                <Route path='/bejelentkezes' element={success !== "" && !localStorage.getItem('id') ? <Login /> : <HomePage />} />
                <Route path='/admin' element={localStorage.getItem('role') === "admin" && localStorage.getItem('role') === user.role && success !== "" && localStorage.getItem('role') && cookies['token'] ? (<Admin />) : (<HomePage />)} />
                <Route path='/receptek' element={<RecipeAll />} />
                <Route path='/kategoria/:categoryId' element={<RecipeCategoryPage />} />
                <Route path='/recept/:recipeId' element={<SingleRecipe />} />
                <Route path='/recept/:recipeId/szerkesztes' element={<EditRecipe />} />
                <Route path='/regisztracio' element={success !== "" && !localStorage.getItem('id') ? <Register /> : <HomePage />} />
                <Route path='/kijelenkezes' element={<Logout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
