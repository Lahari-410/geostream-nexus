import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {

  const [room, setRoom] = useState("");
  const [roomInput, setRoomInput] = useState("room1");
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const [typingUser, setTypingUser] = useState("");

  const chatRef = useRef(null);

  useEffect(() => {

   socket.on("receive_message", (data) => {
  setMessages((prev) => {

    const exists = prev.some(
      (msg) =>
        msg.author === data.author &&
        msg.message === data.message &&
        msg.time === data.time
    );

    if (exists) return prev;

    return [...prev, data];

  });
});

    socket.on("chat_history", (history) => {
      setMessages(history || []);
    });

    socket.on("room_users", (list) => {
      setUsers(list);
    });

    socket.on("user_typing", (name) => {

      setTypingUser(name);

      setTimeout(() => {
        setTypingUser("");
      }, 1500);

    });

  }, []);

  useEffect(() => {

    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

  }, [messages]);

  const joinRoom = () => {

  if (username === "") return;

  socket.emit("join_room", {
    username: username,
    room: roomInput
  });

  setRoom(roomInput);
  setJoined(true);

};

  const sendMessage = () => {

    if (message === "") return;

    const data = {
      room: room,
      author: username,
      message: message
    };

    socket.emit("send_message", data);

    setMessage("");

  };

  if (!joined) {

    return (

      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#667eea,#764ba2)"
      }}>

        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center"
        }}>

          <h2>Join GeoStream Nexus</h2>

          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "10px", width: "200px" }}
          />

          <br /><br />

          <input
  placeholder="Room name"
  value={roomInput}
  onChange={(e) => setRoomInput(e.target.value)}
  style={{ padding: "10px", width: "200px" }}
/>

<br /><br />

          <button
            onClick={joinRoom}
            style={{
              padding: "10px 20px",
              background: "#4cafef",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Join Chat
          </button>

        </div>

      </div>

    );

  }

  return (

    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "Arial",
      background: "linear-gradient(135deg,#667eea,#764ba2)"
    }}>


      {/* USERS PANEL */}

      <div style={{
        width: "220px",
        background: "#1e1e2f",
        color: "white",
        padding: "20px"
      }}>

        <h3>Users</h3>

        {users.map((u, i) => (
          <p key={i}>🟢 {u.username}</p>
        ))}

      </div>


      {/* CHAT PANEL */}

      <div style={{
        flex: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column"
      }}>

        <h1 style={{ color: "white" }}>GeoStream Nexus</h1>

        <div
          ref={chatRef}
          style={{
            flex: 1,
            overflowY: "auto",
            background: "white",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "10px"
          }}
        >

          {messages.map((m, i) => {

            const mine = m.author === username;

            return (

              <div
                key={i}
                style={{
                  marginBottom: "10px",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  maxWidth: "70%",
                  background: mine ? "#d1e7ff" : "#f1f1f1",
                  marginLeft: mine ? "auto" : "0"
                }}
              >

                <div style={{ display: "flex", alignItems: "center" }}>

  <div
    style={{
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      background: "#6c63ff",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
      fontWeight: "bold"
    }}
  >
    {m.author[0].toUpperCase()}
  </div>

  <div>
    <b>{m.author}</b> ({new Date(m.time).toLocaleTimeString()})
    <br />
    {m.message}
  </div>

</div>
              </div>

            );

          })}

          {typingUser && (
            <p style={{ fontStyle: "italic", color: "gray" }}>
              {typingUser} is typing...
            </p>
          )}

        </div>


        {/* MESSAGE INPUT */}

        <div style={{ display: "flex" }}>

          <input
            placeholder="Type message..."
            value={message}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "none"
            }}
            onChange={(e) => {

              setMessage(e.target.value);

              socket.emit("typing", {
                username: username,
                room: room
              });

            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginLeft: "8px",
              padding: "10px 16px",
              background: "#4cafef",
              border: "none",
              borderRadius: "6px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default App;