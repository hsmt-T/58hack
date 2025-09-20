import Header from "./Header";
import Footer from "./Footer";

import React, { useState, useEffect } from "react";

export function Messages() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const rooms = async () => {
      try {
        const res = await fetch("http://localhost:8000/chat/rooms", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("ルーム一覧取得失敗");
        }
        const data = await res.json();
        console.log("APIレスポンス:", data);
        setRooms(data);
      } catch (error) {
        console.log("ルーム一覧取得エラー", error);
      }
    };
    rooms();
  }, []);

  return (
    <div>
      <h2>トークルーム一覧</h2>
      {rooms.length === 0 ? (
        <p>まだルームがありません</p>
      ) : (
        rooms.map((room) => (
          <div
            key={room.id}
            className="bg-blue-400 border-4 border-white p-2 my-2 rounded"
          >
            {/* <p>Room ID: {room.id}</p> */}
            <p>Partner: {room.partner?.user_name ?? "名無し"}</p>
          </div>
        ))
      )}
      <Header />
      <Footer />
    </div>
  );
}
