import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

function Categories() {
    return (
        <>
            {[...Array(6)].map((_, i) => (
                <div className='col-lg-6 col-md-6 col-sm-12 p-3' key={i}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea href='/'>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" className='text-center'>
                                    Lizard
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default Categories;