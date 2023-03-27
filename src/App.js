import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Category from "./Components/Category";
import Upload from "./Components/Upload";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/kategotia' element={<Category />} />
                <Route path='/feltoltes' element={<Upload />} />
                <Route path='/bejelenkezes' element={<Login />} />
                <Route path='/regisztracio' element={<Register />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
