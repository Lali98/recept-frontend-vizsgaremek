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
import Profile from './Components/Profile';

export function userFetch(cookies, setUser) {
    if (cookies) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${cookies.id}`, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then(setUser)
            .catch(() => {
                return "";
            })
    }
}

export function getCookies() {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        if (name) {
            cookies[name] = value;
        }
    });
    return cookies;
}

function App() {
    const [user, setUser] = useState({});
    const [cookies, setCookise] = useState();

    useEffect(() => {
        setCookise(getCookies());
    }, []);

    useEffect(() => {
        userFetch(cookies, setUser);
    }, [cookies]);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/kategoria' element={<Category />} />
                <Route path='/uj-recept' element={user.token ? <Upload /> : <HomePage />} />
                <Route path='/bejelentkezes' element={!user.token ? <Login /> : <HomePage />} />
                <Route path='/admin' element={user.role === "admin" ? (<Admin />) : (<HomePage />)} />
                <Route path='/receptek' element={<RecipeAll />} />
                <Route path='/kategoria/:categoryId' element={<RecipeCategoryPage />} />
                <Route path='/recept/:recipeId' element={<SingleRecipe />} />
                <Route path='/recept/:recipeId/szerkesztes' element={<EditRecipe />} />
                <Route path='/regisztracio' element={!user.token ? <Register /> : <HomePage />} />
                <Route path='/kijelenkezes' element={<Logout />} />
                <Route path='/felhaszalo/:userId' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
