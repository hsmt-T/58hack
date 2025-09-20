import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const Login  = async () => {
        try {
            const res = await fetch("http://localhost:8000/auth/login",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData)
                return
            }

            const data = await res.json();
            console.log("ログイン成功",data);
            navigate("/Top")
        } catch (err) {
            console.log("ログイン失敗")
        }
    }
    const navigate = useNavigate();
    return(
        <div>
            <h1>ログイン</h1>
            <input type="email" value={email}  placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" value={password} required placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={Login}>ログイン</button>
            <p onClick={() => navigate("/") }> 新規登録はこちら </p>
        </div>
    )
}