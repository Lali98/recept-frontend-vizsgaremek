import Header from './Header';
import Cards from './Cards';
import Footer from './Footer';

function HomePage() {
    return (
        <>
            <Header />
            <div className='container'>
                <div className="row">
                    <Cards />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;