import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Sign = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp  = async () => {
        try {
            const res = await fetch("http://localhost:8000/auth/sign",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData)
                return
            }

            const data = await res.json();
            console.log("サインアップ成功",data);
        } catch (error) {
            console.log("サインアップ失敗")
        }
    }
    return(
        <div>
            <h1>新規登録</h1>
            <input type="email" value={email} required placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" value={email} required placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleSignUp}>新規登録</button>
            <p onClick={() => navigate("/Login") }> ログインはこちら </p>
        </div>
    );
};
