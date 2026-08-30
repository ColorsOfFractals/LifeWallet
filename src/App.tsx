import { useState } from "react";
import "./App.css";

type Room = {
  id: string;
  icon: string;
  title: string;
  short: string;
  message: string;
  accent: string;
};

const rooms: Room[] = [
  {
    id: "tasks",
    icon: "📋",
    title: "TASKS",
    short: "My turn.",
    message: "Things waiting for you to move them forward.",
    accent: "blue",
  },
  {
    id: "waiting",
    icon: "⏳",
    title: "WAITING ROOM",
    short: "I did my part.",
    message: "You acted. Now somebody or something else has the ball.",
    accent: "sky",
  },
  {
    id: "lastdone",
    icon: "🌱",
    title: "LAST DONE",
    short: "How old is it?",
    message: "Things that slowly age until they deserve attention again.",
    accent: "green",
  },
  {
    id: "capture",
    icon: "🧺",
    title: "CAPTURE",
    short: "Get it out.",
    message: "Thoughts, links, scraps and reminders can land here first.",
    accent: "purple",
  },
  {
    id: "downloads",
    icon: "📥",
    title: "DOWNLOADS",
    short: "Digital basket.",
    message: "New files wait here until you keep, sort or toss them.",
    accent: "gold",
  },
  {
    id: "resume",
    icon: "↩️",
    title: "RESUME",
    short: "Where was I?",
    message: "Save the state of something unfinished so tomorrow starts here.",
    accent: "orange",
  },
  {
    id: "depleted",
    icon: "🛒",
    title: "DEPLETED",
    short: "We ran out.",
    message: "Capture depletion instead of constantly remembering inventory.",
    accent: "teal",
  },
  {
    id: "stuff",
    icon: "📦",
    title: "STUFF",
    short: "Things that exist.",
    message: "Car, rent, insurance, home, documents and everything worth mapping.",
    accent: "aqua",
  },
  {
    id: "friction",
    icon: "🔧",
    title: "FIX FRICTION",
    short: "This keeps sucking.",
    message: "Recurring annoyance goes to the workshop until the environment absorbs it.",
    accent: "rose",
  },
  {
    id: "state",
    icon: "👁️",
    title: "STATE",
    short: "Just observe.",
    message: "Not everything needs to become a task. Some things only need a light on them.",
    accent: "amber",
  },
];

function App() {
  const [activeId, setActiveId] = useState("tasks");
  const active = rooms.find((room) => room.id === activeId) ?? rooms[0];

  return (
    <main className="app">
      <div className="sun-glow" />
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />

      <header className="top-sign">
        <div className="sign-nail left" />
        <div className="sign-nail right" />
        <h1>LIFE WALLET</h1>
        <p>a home for the pieces of life</p>
      </header>

      <section className="clubhouse">
        <aside className="control-panel">
          <div className="panel-title">CONTROL PANEL</div>

          <div className="room-grid">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`room-button ${room.accent} ${
                  activeId === room.id ? "selected" : ""
                }`}
                onClick={() => setActiveId(room.id)}
              >
                <span className="room-icon">{room.icon}</span>
                <strong>{room.title}</strong>
                <small>{room.short}</small>
              </button>
            ))}
          </div>

          <div className="map-note">
            <div className="tiny-creature">
              <span className="eye eye-left" />
              <span className="eye eye-right" />
            </div>

            <div>
              <strong>Life is messy.</strong>
              <span>This is your map.</span>
            </div>
          </div>
        </aside>

        <section className="world">
          <div className="landscape">
            <div className="hill hill-back" />
            <div className="hill hill-front" />

            <div className="tree">
              <div className="tree-top tree-top-a" />
              <div className="tree-top tree-top-b" />
              <div className="tree-top tree-top-c" />
              <div className="tree-trunk" />
            </div>

            <div className="little-home">
              <div className="roof" />
              <div className="house-body">
                <div className="round-window" />
                <div className="door" />
              </div>
            </div>

            <div className="mailbox">
              <div className="mailbox-box" />
              <div className="mailbox-post" />
            </div>
          </div>

          <article className={`room-stage ${active.accent}`}>
            <div className="stage-tab">
              <span>{active.icon}</span>
              <div>
                <h2>{active.title}</h2>
                <p>{active.short}</p>
              </div>
            </div>

            <div className="paper">
              <div className="paper-pin">●</div>

              <div className="empty-room">
                <div className="big-icon">{active.icon}</div>
                <h3>Welcome to {active.title.toLowerCase()}.</h3>
                <p>{active.message}</p>

                <div className="coming-soon">
                  <span>🖍️</span>
                  <div>
                    <strong>This room is empty on purpose.</strong>
                    <small>We paint its rules when it earns them.</small>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>
      </section>

      <footer>
        <span>🌱 Life Wallet 0.1</span>
        <span>Nothing valuable lives here. The map does.</span>
      </footer>
    </main>
  );
}

export default App;
