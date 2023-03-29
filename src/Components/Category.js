import Header from "./Header";
import Footer from "./Footer";
import Categories from "./Categories";
import {useEffect} from "react";

function Category() {
    useEffect(() => {
        document.title = "Delicious - Kategoriák"
    })
    return(
        <>
            <Header />
            <div className='container min-vh-100 d-flex align-items-center justify-content-center'>
                <div className="row">
                    <Categories />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Category;