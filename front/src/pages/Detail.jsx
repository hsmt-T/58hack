import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { room_id } = useParams();
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    if (!room_id) return;

    let socket;

    const fetchRoomInfoAndConnect = async () => {
      try {
        // ルーム情報と過去のメッセージを取得
        const res = await fetch(`https://five8hack-backend.onrender.com/chat/${room_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("room情報取得失敗:", errorData);
          return;
        }

        const data = await res.json();
        setRoom(data);
        setMessages(data.chat_messages || []);
        console.log("取得したルーム情報:", data);

        // WebSocket接続
        socket = new WebSocket(`wss://five8hack-backend.onrender.com/chat/${room_id}`);
        ws.current = socket;

        socket.onopen = () => console.log("WebSocket接続成功");

        socket.onmessage = (event) => {
          const msg = JSON.parse(event.data);
          setMessages((prev) => [...prev, msg]);
        };

        socket.onclose = () => console.log("socket切断");

      } catch (error) {
        console.log("room情報取得またはWebSocket接続エラー", error);
      }
    };

    fetchRoomInfoAndConnect();

    return () => {
      // コンポーネントのアンマウント時にsocketを閉じる
      if (socket) {
        socket.close();
      }
    };
  }, [room_id]);

  //メッセージ送信
  const sendMessage = () => {
    if (ws.current && input.trim()) {
      const message = {
        content: input,
      };
      ws.current.send(JSON.stringify(message));
      // 自分のメッセージも表示
      setMessages((prev) => [
        ...prev,
        { sender_id: "me", content: input }
      ]);
      setInput("");
    }
  }

  const handleHeartClick = async () => {
    if (!input.trim()) return;

    try {
      // ここでAI APIを呼び出す
      const res = await fetch("https://five8hack-backend.onrender.com/ai/rewrite", {
        method: "POST",
        body: JSON.stringify({ message: input }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log("AI修正結果:", data);
      setInput(data.fixed_message);

      // モックとして、メッセージの先頭に"AI: "を付ける
      // setInput("AI: " + input);
    } catch (error) {
      console.error("AIメッセージ修正エラー", error);
    }
  };

  return(
    <div>
      <Header />
      {room ? (
        <div className="mt-40">
          <p>相手: {room.partner?.user_name ?? "名無し"}さん</p>
          <button>AI要約</button>
          <div className="message-list">
            {messages.map((m, i) => (
              <p key={i}>
                {m.sender_id === "me" ? "自分" : room.partner.user_name}: {m.content}
              </p>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力"
          />
          <button onClick={sendMessage}>送信</button>
          <button
            onClick={handleHeartClick}
            className="ml-2 p-1 rounded-full hover:scale-110 transition"
            title="AIで優しい文にする"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#e25555"
            >
              <path d="M12 21s-6.716-4.146-9.428-7.12C.857 11.932 1 9.143 3.172 7.514 5.343 5.885 8.057 6.4 9.6 8.2L12 10.9l2.4-2.7c1.543-1.8 4.257-2.315 6.428-.686 2.172 1.629 2.315 4.418.6 6.366C18.716 16.854 12 21 12 21z" />
            </svg>
          </button>
        </div>
      ) : (
        <p>ルーム情報を読み込み中...</p>
      )}
      <Footer />
    </div>
  ) 
};
