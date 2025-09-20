import Header from "./Header";
import Footer from "./Footer";

export const Top = () => {
  return (
    <div>
      <img src="../../public/rabbit.png"></img>
      <div>
        <p>name age</p>
        <p>comment</p>
      </div>

      {/* ボタンエリア */}
      <div>
        <button type="button">×</button>

        <button type="button">♡</button>
      </div>
      <Header />
      <Footer />
    </div>
  );
};
const Like  = async () => {
        try {
            const res = await fetch("http://localhost:8000/like",{
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ to_user_id, action: "like" }),credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.log(errorData)
                return
            }

            const data = await res.json();
            console.log("いいね成功",data);
        } catch (err) {
            console.log("いいね失敗")
        }
    }