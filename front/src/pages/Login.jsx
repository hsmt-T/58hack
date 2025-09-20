import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from './Header';

export const Login = () => { 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  const Login = async () => {
    try {
      const res = await fetch("https://five8hack-backend.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
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
            console.log("ログイン失敗", err)
        }
    }
    const navigate = useNavigate();
    return(
        <div>
            <h1 className="text-2xl py-20">ログイン画面</h1>
            <div className="py-0 flex flex-col">
                <input 
                    type="email" 
                    value={email}  
                    placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="border border-pink-500 p-2 rounded"
                />
                <input
                    type="password" 
                    value={password} 
                    required placeholder="password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    className="border border-pink-500 p-2 rounded"
                />
                <button 
                    onClick={Login} 
                    className="bg-pink-200 text-white p-4 rounded"
                >ログイン</button>
            </div>
            <p onClick={() => navigate("/") } className="text-pink-300 underline p-4"> 新規登録はこちら </p>    
            <Header />
        </div>
    )
}