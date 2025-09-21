import Header from "./Header";
import Footer from "./Footer";

import { useEffect, useState } from "react";

export const Profile = () => {
  const [profile, setProfile] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const myProfileGet = async () => {
      try {
        const res = await fetch(
          "https://five8hack-backend.onrender.com/profile/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.error("プロフィール取得失敗:", errorData);
          return;
        }

        const data = await res.json();
        const myProfile = {
          名前: data.user_name ?? "未設定",
          avatar_url: data.avatar_url ?? "../assets/22958955.png",
          性別: data.gender ?? "未設定",
          年齢: data.age ?? "未設定",
          一言: data.comment ?? "未設定",
          研究: data.hobby ?? "未設定",
        };
        console.log("マイプロフィール取得成功", data);
        setProfile(myProfile);
      } catch (error) {
        console.log("マイプロフィール取得失敗", error);
      }
    };
    myProfileGet();
  }, []);

  const [editName, setEditName] = useState(profile?.名前 ?? "");
  const [editComment, setEditComment] = useState(profile?.一言 ?? "");
  const [editAge, setEditAge] = useState(profile?.年齢 ?? "");
  const [editGender, setEditGender] = useState(profile?.性別 ?? "");
  const [editHobby, setEditHobby] = useState(profile?.研究 ?? "");

  const profileEdit = async () => {
    try {
      const res = await fetch(
        "https://five8hack-backend.onrender.com/profile/me",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            user_name: editName,
            comment: editComment,
            age: editAge,
            gender: editGender,
            hobby: editHobby,
          }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.error("プロフィール更新失敗:", errorData);
        return;
      }
      const data = await res.json();
      setProfile({
        名前: data.user_name ?? "未設定",
        一言: data.comment ?? "未設定",
        年齢: data.age ?? "未設定",
        性別: data.gender ?? "未設定",
        研究: data.hobby ?? "未設定",
      });
      setShowModal(false);
      console.log("プロフィール更新成功", data);
    } catch (error) {
      console.error("プロフィール更新失敗", error);
    }
  };

  return (
    <div>
      <Header />
      {profile ? (
        <div className="mt-20">
          <img
            src="../../public/rabbit.png"
            className="h-70 w-50 mx-auto"
          ></img>
          <div className="text-left p-4 bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl shadow-[4px_4px_0_#000000]">
            <h3 className="text-center">プロフィール</h3>
            <hr className="border-t-2 border-gray w-59 ml-3" />
            <p>名前: {profile.名前} さん</p>
            <hr className="border-t border-gray w-59 ml-3" />
            <p>ひとこと: {profile.一言}</p>
            <hr className="border-t border-gray w-59 ml-3" />
            <p>年齢: {profile.年齢}</p>
            <hr className="border-t border-gray w-59 ml-3" />
            <p>性別: {profile.性別}</p>
            <hr className="border-t border-gray w-59 ml-3" />
            <p>研究: {profile.研究}</p>
            <hr className="border-t border-gray w-59 ml-3" />
          </div>
        </div>
      ) : (
        <p>読み込み中...</p>
      )}
      <button
        onClick={() => setShowModal(true)}
        className="underline p-2 rounded mt-4 text-black hover:text-pink"
      >
        プロフィール変更
      </button>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "10px",
              width: "300px",
            }}
          >
            <h2 className="">プロフィール変更</h2>
            <input
              type="text"
              placeholder="名前"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              type="text"
              placeholder="ひとこと"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />

            <input
              type="text"
              placeholder="年齢"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />

            <input
              type="text"
              placeholder="性別"
              value={editGender}
              onChange={(e) => setEditGender(e.target.value)}
            />
            <input
              type="text"
              placeholder="研究"
              value={editHobby}
              onChange={(e) => setEditHobby(e.target.value)}
            />

            <button onClick={profileEdit}>保存</button>
            <button onClick={() => setShowModal(false)}>閉じる</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
