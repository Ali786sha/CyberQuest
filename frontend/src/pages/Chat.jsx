// import { useState } from "react";
// import { sendMessage } from "../api/api";

// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   const handleSend = async () => {
//     console.log("Button clicked", message); // debug line

//     if (!message) return;

//     const userMsg = { sender: "user", text: message };
//     setChat([...chat, userMsg]);

//     try {
//       const data = await sendMessage(message);
//         console.log("API response:", data); // debug line

//       const botMsg = { sender: "bot", text: data.reply };
//       setChat(prev => [...prev, botMsg]);
//     } catch (error) {
//       console.error(error);
//     }

//     setMessage("");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>AI Chatbot</h2>

//       <div style={{ minHeight: "300px", marginBottom: "10px" }}>
//         {chat.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default Chat;



import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api/api";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const chatEndRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };

    setChat((prev) => [...prev, userMsg]);

    try {
      const data = await sendMessage(message);

      const botMsg = {
        sender: "bot",
        text: data.reply,
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    }

    // clear input
    setMessage("");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "650px",
        margin: "auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>AI Chatbot</h1>

      {/* Chat Window */}
      <div
        style={{
          height: "400px",
          width: "600px",
          overflowY: "auto",
          padding: "15px",
          borderRadius: "5px",
          // border: "1px solid #ddd",
          marginBottom: "15px",
          // background: "#f7f7f7",
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "100%",
                whiteSpace: "pre-wrap",
                lineHeight: "1.6",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "70%",
                color: "#fff",
                // border: "0.5px solid #7b7676",
                background:
                  msg.sender === "user" ? "#181818" : "#181818",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <strong>
                {msg.sender === "user" ? "You" : "Bot"}:
              </strong>

              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          style={{
            flex: 1,
            padding: "10px",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "15px",
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
        />

        <button
          onClick={handleSend}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#257449",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >Send</button>
      </div>
    </div>
  );
};

export default Chat;