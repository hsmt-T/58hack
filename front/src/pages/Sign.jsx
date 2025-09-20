import { useNavigate } from "react-router-dom";

export const Sign = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h1>新規登録</h1>
            <input type="text" required="Email" />
            <input type="password" required="password"/>
            <button >新規登録</button>
            <p onClick={() => navigate("/Login") }> ログインはこちら </p>
        </div>
    );
};
