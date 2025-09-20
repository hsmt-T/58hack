import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h1>ログイン</h1>
            <input type="text" required placeholder="Email" />
            <input type="password" required placeholder="password"/>
            <p onClick={() => navigate("/") }> 新規登録はこちら </p>
        </div>
    )
}