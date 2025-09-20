import React from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Messages() {
  const navigate = useNavigate();
  return (
    <div className="messagesBox w-120 h-30 text-black-500" onClick={() => navigate("/Detail")} />
  )
}

export default Messages;