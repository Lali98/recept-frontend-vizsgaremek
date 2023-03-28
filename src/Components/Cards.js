function Cards() {
    const n = 6;
    return (
        <>
            {[...Array(n)].map((_, i) => (
                <div className='col-lg-4'>
                    {i}
                </div>
            ))}
        </>
    )
}

export default Cards;