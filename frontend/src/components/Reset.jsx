import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Reset = () => {
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
        alert("세션 삭제 완료");
        navigate("/");
    }, []);
}

export default Reset;