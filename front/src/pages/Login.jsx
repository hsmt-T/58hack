import { useNavigate } from "react-router-dom";
import { useState } from "react";

const login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin  = async () => {
        try {
            const res = await fetch("http://localhost:8000/auth/login",{
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
            console.log("ログイン成功",data);
        } catch (error) {
            console.log("ログイン失敗")
        }
    }
}

export const Login = () => {
    const navigate = useNavigate();
    return(
        <div>
            <h1>ログイン</h1>
            <input type="email" value={email}  placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" value={password} required placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleLogin}>ログイン</button>
            <p onClick={() => navigate("/") }> 新規登録はこちら </p>
        </div>
    )
}