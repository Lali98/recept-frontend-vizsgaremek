import Header from "./Header";
import Footer from "./Footer";
import Categories from "./Categories";
import {useEffect} from "react";

function Category() {
    useEffect(() => {
        document.title = "Delicious - Kategóriák"
    })
    return(
        <>
            <Header />
            <div className='container d-flex align-items-center justify-content-center main'>
                <div className="row">
                    <Categories />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Category;