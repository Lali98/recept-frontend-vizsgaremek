import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Category from "./Components/Category";
import Upload from "./Components/Upload";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import RecipeAll from "./Components/RecipeAll";
import RecipeCategoryPage from "./Components/RecipeCategoryPage"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/kategotia' element={<Category />} />
                <Route path='/feltoltes' element={<Upload />} />
                <Route path='/bejelenkezes' element={<Login />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/receptek' element={<RecipeAll />} />
                <Route path='/kategoria/:categoryId' element={<RecipeCategoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
