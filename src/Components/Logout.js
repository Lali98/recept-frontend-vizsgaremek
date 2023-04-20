import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout () {
    const navigate = useNavigate();
    useEffect(() => {
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        navigate('/');
    }, [navigate]);
    return (<></>)
}

export default Logout;