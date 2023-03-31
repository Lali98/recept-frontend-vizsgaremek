import Header from './Header';
import Cards from './Cards';
import Footer from './Footer';
import {useEffect} from "react";

function HomePage() {
    useEffect(() => {
        document.title = 'Delicious - Kezdőoldal';
    }, [])
    return (
        <>
            <Header />
            <div className='container main'>
                <div className="row mt-lg-5 mt-3 ms-auto mb-3 mb-lg-5">
                    <Cards />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;