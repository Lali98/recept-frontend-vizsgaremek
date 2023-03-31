import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";

function Categories() {
    const [categories, setCategories] = useState([]);
    function fetchCategories() {
        return fetch('http://192.168.0.65:9000/api/categories')
            .then(response => response.json())
            .then(data => setCategories(data));
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            {categories.map((category) => (
                <div className='col-lg-6 col-md-6 col-sm-12 p-3' key={category._id}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea href={`/kategoria/${category._id}`}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" className='text-center'>
                                    {category.name}
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