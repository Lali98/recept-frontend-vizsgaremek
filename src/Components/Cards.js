import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

function Cards() {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <div className='col-lg-4 col-md-6 col-sm-6 p-3' key={i}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/images/kaja.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Lizard
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default Cards;