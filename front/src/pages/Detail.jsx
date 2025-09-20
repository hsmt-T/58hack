import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const { room_id } = useParams();
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  //ルーム情報
  useEffect(() => {
    console.log("開いたトークルームID:", room_id)
    const thisRoom = async() => {
        try{
            const res =  await fetch(`http://localhost:8000/chat/${room_id}`, {
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
          console.log("取得したルーム情報:", data);
        }
        catch (error) {
          console.log("room情報取得エラー", error)
        }
    };
    thisRoom();
  }, [room_id]);

  //websocket
  useEffect(()=> {
    if (!room_id) return;

    const socket = new WebSocket(`ws://localhost:8000/chat/${room_id}`);
    setWs(socket);

    socket.onopen = () =>  console.log("WebSocket接続成功");

    socket.onmessgae = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    socket.occlose = () => console.log("socket切断");

    return () => socket.close();
  }, [room_id]);

  //メッセージ送信
  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(input);
      // 自分のメッセージも表示
      setMessages((prev) => [
        ...prev,
        { sender_id: "me", content: input }
      ]);
      setInput("");
    }
  }
  return(
    <div>
      {room ? (
        <div>
          <p>相手: {room.partner?.user_name ?? "名無し"}さん</p>
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
        </div>
      ) : (
        <p>ルーム情報を読み込み中...</p>
      )}
    </div>
  ) 
};
