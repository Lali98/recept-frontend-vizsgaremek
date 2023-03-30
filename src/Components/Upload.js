import Header from "./Header";
import Footer from "./Footer";
import { Box, TextField, Button } from "@mui/material";
import UpgradeIcon from '@mui/icons-material/Upgrade';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";

function Upload() {
    useEffect(() => {
        document.title = "Delicious - Recept feltöltés";
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row p-4 mt-lg-3 mb-lg-3" style={{ backgroundColor: "#ffffff66" }}>
                    <div className="col-12">
                        <h2 className="text-center">Recept feltöltés</h2>
                    </div>
                    <div className="col-12">
                        <Box component="form" sx={{ '& > :not(style)': { m: 1 } }}>
                            <TextField id="outlined-basic" label="Étel neve" variant="outlined" name="name" sx={{ width: '100%' }} /><br />
                            <TextField
                                id="outlined-multiline-static"
                                label="Leírás"
                                multiline
                                rows={6}
                                defaultValue=""
                                sx={{ width: '100%' }}
                                name="description"
                            /><br />
                            <div className="border-bottom">
                                <h5>Hozzávalok:</h5>
                                {[...Array(3)].map((_, i) => (
                                    <div className="mt-3">
                                        <TextField id="outlined-basic" label={`${i + 1}. hozzávaló`} variant="outlined" sx={{ width: '80%' }} name="ingredients"/>
                                        <button className="btn btn-danger ms-1 me-1" type="button"><DeleteIcon /></button>
                                        <br />
                                    </div>
                                ))}
                                <button className="btn btn-success mb-2 mt-2" type="button"><AddIcon /></button>
                            </div>
                            <div>
                                <h5>Lépések:</h5>
                                {[...Array(5)].map((_, i) => (
                                    <div className="mt-3">
                                        <TextField id="outlined-basic" label={`${i + 1}. lépés`} variant="outlined" sx={{ width: '80%' }} name="ingredients"/>
                                        <button className="btn btn-danger ms-1 me-1" type="button"><DeleteIcon /></button>
                                        <br />
                                    </div>
                                ))}
                                <button className="btn btn-success mb-2 mt-2" type="button"><AddIcon /></button>
                            </div>
                            <div>
                                <h5>Kép feltöltése:</h5>
                                <div className="form-group row pb-3">
                                    <div className="col-md-6">
                                        <input type="file" name="img-url" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <Button variant="contained" type="submit"><UpgradeIcon />Feltöltés</Button>
                        </Box>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Upload;