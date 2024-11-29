"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
  withCredentials: true,
  transports: ["websocket"],
});

interface Message {
  userId: string;
  text: string;
  timestamp: Date;
}

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId] = useState(`user-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        userId: userId,
        timestamp: new Date(),
      };
      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-t-lg">
        <h1 className="text-xl font-bold text-gray-800">Chat Room</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.userId === userId ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.userId === userId
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span
                className={`text-xs ${msg.userId === userId ? "text-blue-100" : "text-gray-500"}`}
              >
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 border-t">
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-full px-6 py-2 hover:bg-blue-600 transition-colors"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
