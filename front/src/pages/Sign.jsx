import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from './Header';
import Footer from './Footer';

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
            navigate("/Top")
        } catch (error) {
            console.log("サインアップ失敗", error)
        }
    }
    return(
        <div>
            <h1 className="text-2xl py-20">ログイン画面</h1>
            <div className="py-0 flex flex-col">
                <input 
                    type="email" 
                    value={email} 
                    required placeholder="Email" 
                    onChange={(e)=>setEmail(e.target.value)} 
                    className="border p-2 rounded"
                />
                <input 
                    type="password" 
                    value={password} 
                    required placeholder="password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    className="border p-2 rounded"
                />
                <button     
                onClick={handleSignUp}
                className="bg-pink-200 text-white p-4 rounded"
                >新規登録</button>
            </div>
            <p onClick={() => navigate("/Login") } className="text-pink-300 underline p-4"> ログインはこちら </p>
            <Header />
            <Footer />
        </div>
    );
};