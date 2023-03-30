function Footer() {
    return (<footer
        className="text-center text-lg-start text-white"
        id='kapcsolat'
        style={{backgroundColor: '#EEEFF1'}}
    >
        <div className="container p-4 pb-0" style={{color :'#d2713a'}}>
            <section className="">
                <div className="row">
                    <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold" >
                            Delicious
                        </h6>
                        <p>
                            Ha finom recepteket szeretnél olvasni és kipróbálni, itt a helyed!
                        </p>
                    </div>

                    <hr className="w-100 clearfix d-md-none"/>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">
                            Hasznos linkek
                        </h6>
                        <p>
                            <a href="/" style={{color :'#d2713a'}}>Felhasználói fiók</a>
                        </p>
                        <p>
                            <a href="/kategotia" style={{color :'#d2713a'}}>Kategóriák</a>
                        </p>
                        <p>
                            <a href="/" style={{color :'#d2713a'}}>Ötletek és galéria</a>
                        </p>
                        <p>
                            <a href="/" style={{color :'#d2713a'}}>Segítség</a>
                        </p>
                    </div>

                    <hr className="w-100 clearfix d-md-none"/>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Kapcsolatok</h6>
                        <p><i className="fas fa-home mr-3"></i>Hungary, Szeghalom</p>
                        <p><i className="fas fa-phone mr-3"></i>Kiss Lajos Bertalan</p>
                        <p><i className="fas fa-print mr-3"></i>Kasza Tünde Napsugár</p>
                        <p><i className="fas fa-print mr-3"></i>Rostás Barbara</p>
                    </div>
                </div>
            </section>

            <hr className="my-3" />

                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            <div className="p-3">
                                © {new Date().getFullYear() === 2023 ? new Date().getFullYear() : "2023-" + new Date().getFullYear()} Copyright: Delicious
                            </div>
                        </div>
                    </div>
                </section>
        </div>
    </footer>
)
}

export default Footer;