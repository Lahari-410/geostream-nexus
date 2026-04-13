# 📊 Binance Orderbook Visualizer

A real-time orderbook visualization tool built using Next.js, TypeScript, and WebSocket-based streaming.
The application processes live market data and renders orderbook depth with a focus on responsiveness and clarity.

---

## 🚀 Overview

This project connects to live trading streams and displays bid/ask data in real time.
It focuses on efficient UI updates and structured data handling for high-frequency market inputs.

---

## ✨ Features

### 📡 Real-Time Orderbook Updates

* Streams live market data using WebSocket connections
* Continuously updates orderbook without page refresh
* Handles frequent tick-level updates

---

### 🎨 Depth Visualization

* Displays bids and asks in a color-coded format
* Improves readability of market depth
* Structured layout for quick interpretation

---

### ⚡ UI Performance Optimization

* Minimizes unnecessary re-renders
* Uses efficient state updates for smoother UI
* Designed to handle rapid incoming data streams

---

### 📉 Spread Monitoring (Basic)

* Calculates bid-ask spread from incoming data
* Tracks changes in spread over time
* Can be extended for alert-based systems

---

### 🧠 Structured Data Handling

* Processes and formats incoming WebSocket data
* Maintains consistent orderbook state
* Prepares data for efficient rendering

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* TypeScript

### Backend

* Node.js
* Express.js

### Realtime Communication

* WebSocket

### Database (Basic Integration)

* MongoDB

### Notifications (Planned / Partial)

* Nodemailer

---

## 🏗️ Architecture

```
Client (Next.js + TypeScript)
        ↓
WebSocket Server (Node.js + Express)
        ↓
MongoDB (Data Storage)
```

* Backend receives and processes streaming data
* Frontend renders updates in real time
* Database can be used for storing snapshots or logs

---

## 📂 Project Structure

```
geostream-nexus/
│
├── client/                     # React Frontend
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── App.js             # Main UI + socket logic
│   │   └── index.js           # React entry point
│   │
│   ├── package.json
│   └── package-lock.json
│
│
├── server/                     # Backend (Node + Express + Socket.IO)
│   │
│   ├── index.js               # Main server file (all logic)
│   ├── package.json
│   └── package-lock.json
│
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Lahari-410/binance-orderbook.git
cd binance-orderbook
```

---

### 2️⃣ Install dependencies

```
cd client
npm install

cd ../server
npm install
```

---

### 3️⃣ Run the application

Start backend:

```
cd server
node index.js
```

Start frontend:

```
cd client
npm run dev
```

---

## 💡 Key Concepts Demonstrated

* Real-time data streaming with WebSockets
* Handling high-frequency updates in frontend
* Orderbook data structures (bids/asks)
* Event-driven backend communication
* Performance-aware UI rendering

---

## 🚀 Future Improvements

* Advanced alert system for spread monitoring
* Snapshot storage and replay functionality
* Multi-symbol support
* Enhanced performance benchmarking

---

## 👩‍💻 Author

Lahari
