import Header from "./Header";
import Footer from "./Footer";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Messages() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          "https://five8hack-backend.onrender.com/chat/rooms",
          {
            credentials: "include",
          }
        );
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
    fetchRooms();
  }, []);

  return (
    <div>
      <Header />
      <div className="my-20"></div>
      <h2>トークルーム一覧</h2>
      {rooms.length === 0 ? (
        <p>まだルームがありません</p>
      ) : (
        rooms.map((room) => (
          <div
            key={room.id}
            className="bg-blue-400 border-4 border-white p-2 my-2 rounded flex items-center justify-between "
          >
            {/* 名前をクリックで遷移 */}
            <p
              onClick={() => navigate(`/detail/${room.id}`)}
              className="cursor-pointer flex-1"
            >
              {room.partner?.user_name ?? "名無し"}さん
            </p>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
}
