import {Link} from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <ul>
                <li><a href="kategoria.html" target="_self">Kategória</a></li>
                <li><a href="feltoltes.html">Recept feltöltése</a></li>
                <li><a href="#">Kapcsolat</a></li>
                {/*<li><a href="login.html">Belépés / Regisztráció</a></li>*/}
                <li>
                    <Link to='/bejelenkezes'>Belépés / Regisztráció</Link>
                </li>

                <input type="search" id="site-search" />
                <button id="but">Keresés</button>
            </ul>
        </nav>
    )
}

export default NavBar;