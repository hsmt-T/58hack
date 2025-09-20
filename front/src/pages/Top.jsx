import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Top = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // profiles取得
  const fetchProfiles = async () => {
    try {
      const res = await fetch("https://five8hack-backend.onrender.com/profile", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return;
      }
      const data = await res.json();
      setProfiles(data);
    } catch (err) {
      console.log("プロフィール取得失敗", err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // いいね
  const Like = async (to_user_id) => {
    try {
      const res = await fetch("https://five8hack-backend.onrender.com/matching/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to_user_id, action: "like" }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData);
        return;
      }

      const data = await res.json();
      console.log("いいね成功", data);
    } catch (err) {
      console.log("いいね失敗", err);
    }
  };

  if (!profiles.length) return <div>Loading...</div>;

  const profile = profiles[currentIndex];

  const nextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const prevProfile = () => {
    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  return (
    <div className="flex flex-col items-center">
      <Header />

      <div className="w-80 h-96 border p-4 my-4 flex flex-col items-center justify-between relative">
        <img
          src={profile.avatar_url || "../../public/rabbit.png"}
          alt={profile.user_name}
          className="w-32 h-32 object-cover rounded-full"
        />
        <div className="text-center">
          <p className="text-lg font-semibold">
            {profile.user_name} {profile.age}
          </p>
          <p className="text-sm mt-2">{profile.comment}</p>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={prevProfile}
          >
            ←
          </button>
          <button
            className="bg-pink-300 px-4 py-2 rounded"
            onClick={() => Like(profile.id)}
          >
            ♡
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={nextProfile}
          >
            →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
