import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Area = {
  id:
    | "subscriptions"
    | "car"
    | "home"
    | "internet"
    | "phone"
    | "grocery"
    | "laundry"
    | "friends"
    | "appointments"
    | "work"
    | "tasks"
    | "forgotten";
  icon: string;
  title: string;
  short: string;
  accent: string;
};

type Subscription = {
  id: string;
  name: string;
  amount: number;
  cadence: "monthly" | "yearly";
};

type GroceryItem = {
  id: string;
  name: string;
  category: string;
  done: boolean;
};

type FriendPlan = {
  id: string;
  person: string;
  plan: string;
  date: string;
};

type Appointment = {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
};

type TaskItem = {
  id: string;
  title: string;
  due: string;
  priority: "Normal" | "Soon" | "Important";
  done: boolean;
};

const areas: Area[] = [
  {
    id: "subscriptions",
    icon: "🧾",
    title: "SUBSCRIPTIONS",
    short: "What am I promising?",
    accent: "purple",
  },
  {
    id: "car",
    icon: "🚗",
    title: "CAR PAYMENTS",
    short: "Keep the wheels boring.",
    accent: "blue",
  },
  {
    id: "home",
    icon: "🏠",
    title: "HOUSE / RENT",
    short: "Keep the roof happy.",
    accent: "green",
  },
  {
    id: "internet",
    icon: "🌐",
    title: "INTERNET",
    short: "The invisible utility.",
    accent: "aqua",
  },
  {
    id: "phone",
    icon: "📱",
    title: "PHONE",
    short: "Bill + device.",
    accent: "teal",
  },
  {
    id: "grocery",
    icon: "🛒",
    title: "GROCERY LIST",
    short: "Stop remembering milk.",
    accent: "gold",
  },
  {
    id: "laundry",
    icon: "🧺",
    title: "LAUNDRY",
    short: "What needs washing?",
    accent: "sky",
  },
  {
    id: "friends",
    icon: "🫂",
    title: "FRIEND SCHEDULE",
    short: "People aren't tasks.",
    accent: "rose",
  },
  {
    id: "appointments",
    icon: "📅",
    title: "APPOINTMENTS",
    short: "Places future-me goes.",
    accent: "orange",
  },
  {
    id: "work",
    icon: "💼",
    title: "WORK SCHEDULE",
    short: "When am I spoken for?",
    accent: "amber",
  },
  {
    id: "tasks",
    icon: "✅",
    title: "TASKS",
    short: "My turn.",
    accent: "blue",
  },
  {
    id: "forgotten",
    icon: "❓",
    title: "WHAT AM I FORGETTING?",
    short: "The weird stuff.",
    accent: "mystery",
  },
];
type NicheArea = {
  id: string;
  icon: string;
  title: string;
  short: string;
  question: string;
  examples: string[];
  color: string;
};


type NicheEntry = {
  id: string;
  text: string;
  done: boolean;
};
const nicheAreas: NicheArea[] = [
  {
    id: "paperwork",
    icon: "📬",
    title: "PAPERWORK",
    short: "Things asking for a response.",
    question: "Did a piece of paper quietly create work for you?",
    examples: [
      "Forms to complete",
      "Letters that need replies",
      "Things to sign or send",
      "Paper waiting to be filed",
    ],
    color: "paperwork",
  },
  {
    id: "renewals",
    icon: "🔄",
    title: "RENEWALS",
    short: "Future expiration bullshit.",
    question: "What silently stops being valid later?",
    examples: [
      "Vehicle registration",
      "Licenses",
      "Memberships",
      "Policies and annual renewals",
    ],
    color: "renewals",
  },
  {
    id: "orders",
    icon: "📦",
    title: "ORDERS / RETURNS",
    short: "Where is my shit?",
    question: "Is money or merchandise currently in limbo?",
    examples: [
      "Packages arriving",
      "Return deadlines",
      "Refunds expected",
      "Replacement shipments",
    ],
    color: "orders",
  },
  {
    id: "homecare",
    icon: "🔧",
    title: "HOME CARE",
    short: "The house slowly decays.",
    question: "What around the home ages whether you remember it or not?",
    examples: [
      "HVAC filters",
      "Smoke detector batteries",
      "Repairs",
      "Seasonal maintenance",
    ],
    color: "homecare",
  },
  {
    id: "documents",
    icon: "🪪",
    title: "DOCUMENTS / IDs",
    short: "Things governments gave you.",
    question: "Which important document exists somewhere and eventually expires?",
    examples: [
      "Driver license",
      "Passport",
      "Birth certificate pointer",
      "Professional credentials",
    ],
    color: "documents",
  },
  {
    id: "insurance",
    icon: "🛡️",
    title: "INSURANCE",
    short: "Hopefully boring forever.",
    question: "If something goes sideways, do you know where the policy lives?",
    examples: [
      "Auto",
      "Renters / homeowners",
      "Health",
      "Dental / vision",
    ],
    color: "insurance",
  },
  {
    id: "pets",
    icon: "🐾",
    title: "PETS",
    short: "Got a little dude?",
    question: "What does the creature depend on you remembering?",
    examples: [
      "Vet visits",
      "Vaccinations",
      "Food / medication",
      "Grooming or registration",
    ],
    color: "pets",
  },
  {
    id: "health",
    icon: "🩺",
    title: "HEALTH",
    short: "Human maintenance.",
    question: "Is there health admin that future-you will otherwise reconstruct?",
    examples: [
      "Checkups",
      "Prescription reminders",
      "Screenings",
      "Follow-up appointments",
    ],
    color: "health",
  },
  {
    id: "taxes",
    icon: "🧾",
    title: "TAXES / RECEIPTS",
    short: "Unfortunately.",
    question: "What boring financial evidence should survive until tax season?",
    examples: [
      "Tax documents arriving",
      "Receipts worth keeping",
      "Deductible expenses",
      "Things still needed to file",
    ],
    color: "taxes",
  },
  {
    id: "dates",
    icon: "🎂",
    title: "IMPORTANT DATES",
    short: "Recurring human obligations.",
    question: "Which date would make you feel like an asshole if you forgot it?",
    examples: [
      "Birthdays",
      "Anniversaries",
      "Weddings",
      "RSVP deadlines",
    ],
    color: "dates",
  },
  {
    id: "travel",
    icon: "✈️",
    title: "TRAVEL",
    short: "Going somewhere?",
    question: "What needs to line up before you can physically disappear somewhere?",
    examples: [
      "Flights",
      "Hotels",
      "Reservations",
      "Travel documents / packing",
    ],
    color: "travel",
  },
  {
    id: "warranties",
    icon: "🧰",
    title: "WARRANTIES / REPAIRS",
    short: "Who fixed this thing?",
    question: "What expensive object has history worth remembering?",
    examples: [
      "Warranty expiration",
      "Repair history",
      "Receipt pointer",
      "Serial / model pointer",
    ],
    color: "warranties",
  },
  {
    id: "projects",
    icon: "🛠️",
    title: "PROJECTS / SIDE QUESTS",
    short: "What was I building again?",
    question: "What project, experiment, hobby, or ridiculous idea do I want future-me to find again?",
    examples: [
      "Project I want to start",
      "Thing I left half-finished",
      "Next step for a project",
      "Where the project files live",
      "Something I want to build",
      "Idea worth trying later",
    ],
    color: "projects",
  },
  {
    id: "movies",
    icon: "🍿",
    title: "MOVIES / TV",
    short: "What was that thing I wanted to watch?",
    question: "What movie, show, documentary, or series do I not want to lose in the void?",
    examples: [
      "Movie someone recommended",
      "Show I want to start",
      "Series I'm currently watching",
      "Waiting for another season",
      "Something I loved",
      "Something I stopped watching",
    ],
    color: "movies",
  },
  {
    id: "music",
    icon: "🎵",
    title: "MUSIC",
    short: "That song was good. What was it?",
    question: "What song, album, artist, or musical rabbit hole do I want to remember?",
    examples: [
      "Song someone showed me",
      "Album I want to hear",
      "Artist I want to explore",
      "Old song I rediscovered",
      "Song I heard somewhere",
      "Music for a specific mood",
    ],
    color: "music",
  },];

type Companion = {
  id: string;
  name: string;
  description: string;
  lines: string[];
};

const companions: Companion[] = [
  {
    id: "sprout",
    name: "Sprout",
    description: "Round. Leafy. Extremely employed at nothing.",
    lines: [
      "All my stuff!",
      "Nice.",
      "I live here now.",
      "Big wallet.",
      ":)",
    ],
  },
  {
    id: "marmalade",
    name: "Marmalade",
    description: "A tiny orange fuzzball with no known obligations.",
    lines: [
      "Warm.",
      "Found a ledge.",
      "Excellent button.",
      "I brought nothing.",
      "Hello!",
    ],
  },
  {
    id: "mush",
    name: "Mush",
    description: "A purple forest lump doing their absolute best.",
    lines: [
      "Hmm.",
      "Very organized.",
      "Good shelf.",
      "I approve.",
      "Bonk.",
    ],
  },
  {
    id: "puddle",
    name: "Puddle",
    description: "A blue bean who appears to be mostly water.",
    lines: [
      "plip",
      "Everything seems fine.",
      "Nice weather.",
      "I have arrived.",
      "boop",
    ],
  },
  {
    id: "wicket",
    name: "Wicket",
    description: "Long ears. Short thoughts. Excellent company.",
    lines: [
      "What's that?",
      "Oh! A button.",
      "This place rules.",
      "I am supervising.",
      "Carry on.",
    ],
  },
];
const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(value) ? value : 0);

const todayISO = () => new Date().toISOString().slice(0, 10);

function App() {
  const [activeId, setActiveId] = useState<Area["id"]>("subscriptions");

  // ----------------------------------------------------------
  // 🌱 Happy Friends
  // ----------------------------------------------------------

  const [companionPickerOpen, setCompanionPickerOpen] = useState(false);
  const [selectedCompanionId, setSelectedCompanionId] =
    useState<string | null>(null);
  const [companionLineIndex, setCompanionLineIndex] = useState(0);

  const selectedCompanion =
    companions.find((friend) => friend.id === selectedCompanionId) ?? null;

  const summonCompanion = (id: string) => {
    setSelectedCompanionId(id);
    setCompanionLineIndex(0);
    setCompanionPickerOpen(false);
  };

  const pokeCompanion = () => {
    if (!selectedCompanion) return;

    setCompanionLineIndex((current) =>
      (current + 1) % selectedCompanion.lines.length
    );
  };
  const [nicheActive, setNicheActive] = useState<string | null>(null);

  const [nicheEntries, setNicheEntries] =
    useState<Record<string, NicheEntry[]>>({});

  const [nicheDrafts, setNicheDrafts] =
    useState<Record<string, string>>({});

  // ----------------------------------------------------------
  // 🔄 Launch sequence
  // ----------------------------------------------------------

  const [launching, setLaunching] = useState(true);
  const [launchLeaving, setLaunchLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setLaunchLeaving(true);
    }, 1800);

    const finishTimer = window.setTimeout(() => {
      setLaunching(false);
    }, 2300);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  // ----------------------------------------------------------
  // 🧾 Subscriptions
  // ----------------------------------------------------------

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [subName, setSubName] = useState("");
  const [subAmount, setSubAmount] = useState("");
  const [subCadence, setSubCadence] =
    useState<Subscription["cadence"]>("monthly");

  const monthlySubscriptionTotal = useMemo(
    () =>
      subscriptions.reduce(
        (sum, item) =>
          sum +
          (item.cadence === "monthly"
            ? item.amount
            : item.amount / 12),
        0
      ),
    [subscriptions]
  );

  const yearlySubscriptionTotal = monthlySubscriptionTotal * 12;

  const addSubscription = () => {
    const amount = Number(subAmount);

    if (!subName.trim() || !Number.isFinite(amount) || amount <= 0) return;

    setSubscriptions((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        name: subName.trim(),
        amount,
        cadence: subCadence,
      },
    ]);

    setSubName("");
    setSubAmount("");
  };

  // ----------------------------------------------------------
  // 🚗 Car
  // ----------------------------------------------------------

  const [carAmount, setCarAmount] = useState("");
  const [carDueDay, setCarDueDay] = useState("1");
  const [carLender, setCarLender] = useState("");
  const [carAutopay, setCarAutopay] = useState(false);
  const [carNote, setCarNote] = useState("");

  // ----------------------------------------------------------
  // 🏠 Home / Rent
  // ----------------------------------------------------------

  const [homeAmount, setHomeAmount] = useState("");
  const [homeDueDay, setHomeDueDay] = useState("1");
  const [homePayee, setHomePayee] = useState("");
  const [homeAutopay, setHomeAutopay] = useState(false);
  const [homePointer, setHomePointer] = useState("");

  // ----------------------------------------------------------
  // 🌐 Internet
  // ----------------------------------------------------------

  const [internetProvider, setInternetProvider] = useState("");
  const [internetAmount, setInternetAmount] = useState("");
  const [internetDue, setInternetDue] = useState("1");
  const [internetPlan, setInternetPlan] = useState("");
  const [internetSupport, setInternetSupport] = useState("");

  // ----------------------------------------------------------
  // 📱 Phone
  // ----------------------------------------------------------

  const [phoneCarrier, setPhoneCarrier] = useState("");
  const [phoneAmount, setPhoneAmount] = useState("");
  const [phoneDue, setPhoneDue] = useState("1");
  const [deviceBalance, setDeviceBalance] = useState("");
  const [phoneAutopay, setPhoneAutopay] = useState(false);

  // ----------------------------------------------------------
  // 🛒 Grocery
  // ----------------------------------------------------------

  const [groceries, setGroceries] = useState<GroceryItem[]>([]);
  const [groceryName, setGroceryName] = useState("");
  const [groceryCategory, setGroceryCategory] = useState("General");

  const addGrocery = () => {
    if (!groceryName.trim()) return;

    setGroceries((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        name: groceryName.trim(),
        category: groceryCategory,
        done: false,
      },
    ]);

    setGroceryName("");
  };

  // ----------------------------------------------------------
  // 🧺 Laundry
  // ----------------------------------------------------------

  const [laundryDates, setLaundryDates] = useState({
    everyday: "",
    bedding: "",
    towels: "",
    work: "",
    delicates: "",
  });

  // ----------------------------------------------------------
  // 🫂 Friends
  // ----------------------------------------------------------

  const [friendPlans, setFriendPlans] = useState<FriendPlan[]>([]);
  const [friendName, setFriendName] = useState("");
  const [friendPlan, setFriendPlan] = useState("");
  const [friendDate, setFriendDate] = useState("");

  const addFriendPlan = () => {
    if (!friendName.trim() || !friendPlan.trim()) return;

    setFriendPlans((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        person: friendName.trim(),
        plan: friendPlan.trim(),
        date: friendDate,
      },
    ]);

    setFriendName("");
    setFriendPlan("");
    setFriendDate("");
  };

  // ----------------------------------------------------------
  // 📅 Appointments
  // ----------------------------------------------------------

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentTitle, setAppointmentTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentPlace, setAppointmentPlace] = useState("");

  const addAppointment = () => {
    if (!appointmentTitle.trim() || !appointmentDate) return;

    setAppointments((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        title: appointmentTitle.trim(),
        date: appointmentDate,
        time: appointmentTime,
        place: appointmentPlace.trim(),
      },
    ]);

    setAppointmentTitle("");
    setAppointmentDate("");
    setAppointmentTime("");
    setAppointmentPlace("");
  };

  // ----------------------------------------------------------
  // 💼 Work
  // ----------------------------------------------------------

  const [workDays, setWorkDays] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });

  const [workStart, setWorkStart] = useState("08:00");
  const [workEnd, setWorkEnd] = useState("17:00");
  const [workNote, setWorkNote] = useState("");

  // ----------------------------------------------------------
  // ✅ Tasks
  // ----------------------------------------------------------

  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState("");
  const [taskPriority, setTaskPriority] =
    useState<TaskItem["priority"]>("Normal");

  const addTask = () => {
    if (!taskTitle.trim()) return;

    setTasks((current) => [
      ...current,
      {
        id: `${Date.now()}-${Math.random()}`,
        title: taskTitle.trim(),
        due: taskDue,
        priority: taskPriority,
        done: false,
      },
    ]);

    setTaskTitle("");
    setTaskDue("");
    setTaskPriority("Normal");
  };

  const active = areas.find((area) => area.id === activeId) ?? areas[0];

  const elapsedLabel = (date: string) => {
    if (!date) return "Never logged";

    const then = new Date(`${date}T12:00:00`);
    const now = new Date();

    const days = Math.max(
      0,
      Math.floor((now.getTime() - then.getTime()) / 86400000)
    );

    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";

    return `${days} days ago`;
  };

  const SectionTitle = ({
    icon,
    title,
    text,
  }: {
    icon: string;
    title: string;
    text: string;
  }) => (
    <div className="life-room-heading">
      <div className="life-room-heading-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );

  const EmptyNote = ({ children }: { children: string }) => (
    <div className="life-empty-note">
      <span>🌱</span>
      <p>{children}</p>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="🧾"
        title="What has future-you already agreed to pay?"
        text="Enter subscriptions once. Life Wallet does the monthly ↔ yearly translation."
      />

      <div className="life-stat-row">
        <div className="life-stat-card hero-stat">
          <span>Monthly promise</span>
          <strong>{money(monthlySubscriptionTotal)}</strong>
          <small>every month</small>
        </div>

        <div className="life-stat-card">
          <span>Annual promise</span>
          <strong>{money(yearlySubscriptionTotal)}</strong>
          <small>every year</small>
        </div>

        <div className="life-stat-card">
          <span>Subscriptions</span>
          <strong>{subscriptions.length}</strong>
          <small>active entries</small>
        </div>
      </div>

      <div className="life-split">
        <div className="life-card">
          <div className="life-card-title">
            <span>➕</span>
            Add subscription
          </div>

          <div className="life-form-grid">
            <label className="span-2">
              <span>Name</span>
              <input
                value={subName}
                onChange={(e) => setSubName(e.target.value)}
                placeholder="Music, cloud storage, gym..."
              />
            </label>

            <label>
              <span>Amount</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={subAmount}
                onChange={(e) => setSubAmount(e.target.value)}
                placeholder="14.99"
              />
            </label>

            <label>
              <span>Charged</span>
              <select
                value={subCadence}
                onChange={(e) =>
                  setSubCadence(e.target.value as Subscription["cadence"])
                }
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </div>

          <button className="life-action-button" onClick={addSubscription}>
            Add to my promises
          </button>
        </div>

        <div className="life-card">
          <div className="life-card-title">
            <span>🔭</span>
            Calculator
          </div>

          <div className="subscription-preview">
            <span>
              {subAmount || "0"} / {subCadence === "monthly" ? "month" : "year"}
            </span>

            <strong>
              {money(
                subCadence === "monthly"
                  ? (Number(subAmount) || 0) * 12
                  : Number(subAmount) || 0
              )}
            </strong>

            <small>equivalent yearly cost</small>
          </div>
        </div>
      </div>

      <div className="life-list-card">
        <div className="life-card-title">
          <span>📜</span>
          Current subscriptions
        </div>

        {subscriptions.length === 0 ? (
          <EmptyNote>
            Nothing entered yet. The total stays gloriously boring.
          </EmptyNote>
        ) : (
          <div className="subscription-list">
            {subscriptions.map((subscription) => (
              <div className="subscription-row" key={subscription.id}>
                <div className="subscription-badge">🧾</div>

                <div className="subscription-name">
                  <strong>{subscription.name}</strong>
                  <small>
                    {subscription.cadence === "monthly"
                      ? `${money(subscription.amount)} monthly`
                      : `${money(subscription.amount)} yearly`}
                  </small>
                </div>

                <div className="subscription-equivalent">
                  <strong>
                    {money(
                      subscription.cadence === "monthly"
                        ? subscription.amount * 12
                        : subscription.amount
                    )}
                  </strong>
                  <small>/ year</small>
                </div>

                <button
                  className="tiny-remove"
                  onClick={() =>
                    setSubscriptions((current) =>
                      current.filter((x) => x.id !== subscription.id)
                    )
                  }
                  title="Remove subscription"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderCar = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="🚗"
        title="The car should be boring."
        text="Keep the payment facts in one place so the car only becomes interesting when you drive it."
      />

      <div className="object-hero car-hero">
        <div className="object-hero-icon">🚗</div>
        <div>
          <small>Monthly payment</small>
          <strong>{carAmount ? money(Number(carAmount)) : "Not entered"}</strong>
        </div>
        <div>
          <small>Due</small>
          <strong>Day {carDueDay || "—"}</strong>
        </div>
        <div>
          <small>Payment</small>
          <strong>{carAutopay ? "Autopay ✓" : "Manual"}</strong>
        </div>
      </div>

      <div className="life-split">
        <div className="life-card">
          <div className="life-card-title">💳 Payment</div>

          <div className="life-form-grid">
            <label className="span-2">
              <span>Lender / payment destination</span>
              <input
                value={carLender}
                onChange={(e) => setCarLender(e.target.value)}
                placeholder="Where the payment goes"
              />
            </label>

            <label>
              <span>Monthly amount</span>
              <input
                type="number"
                value={carAmount}
                onChange={(e) => setCarAmount(e.target.value)}
                placeholder="425.00"
              />
            </label>

            <label>
              <span>Due day</span>
              <input
                type="number"
                min="1"
                max="31"
                value={carDueDay}
                onChange={(e) => setCarDueDay(e.target.value)}
              />
            </label>
          </div>

          <label className="life-toggle-row">
            <input
              type="checkbox"
              checked={carAutopay}
              onChange={(e) => setCarAutopay(e.target.checked)}
            />
            <span>Autopay is enabled</span>
          </label>
        </div>

        <div className="life-card">
          <div className="life-card-title">📝 Car note</div>

          <textarea
            className="life-textarea"
            value={carNote}
            onChange={(e) => setCarNote(e.target.value)}
            placeholder="Payment URL pointer, payoff note, registration thought..."
          />

          <div className="soft-callout">
            <span>💡</span>
            <p>
              Later this room can also hold registration, insurance and
              maintenance state without exposing credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="🏠"
        title="Keep the roof happy."
        text="Rent or mortgage is recurring life infrastructure, not something worth reconstructing every month."
      />

      <div className="object-hero home-hero">
        <div className="object-hero-icon">🏠</div>

        <div>
          <small>Housing payment</small>
          <strong>{homeAmount ? money(Number(homeAmount)) : "Not entered"}</strong>
        </div>

        <div>
          <small>Due</small>
          <strong>Day {homeDueDay || "—"}</strong>
        </div>

        <div>
          <small>Status</small>
          <strong>{homeAutopay ? "Automatic ✓" : "Manual"}</strong>
        </div>
      </div>

      <div className="life-split">
        <div className="life-card">
          <div className="life-card-title">🔑 Housing payment</div>

          <div className="life-form-grid">
            <label className="span-2">
              <span>Landlord / mortgage servicer</span>
              <input
                value={homePayee}
                onChange={(e) => setHomePayee(e.target.value)}
                placeholder="Who receives the payment?"
              />
            </label>

            <label>
              <span>Monthly amount</span>
              <input
                type="number"
                value={homeAmount}
                onChange={(e) => setHomeAmount(e.target.value)}
                placeholder="1800"
              />
            </label>

            <label>
              <span>Due day</span>
              <input
                type="number"
                min="1"
                max="31"
                value={homeDueDay}
                onChange={(e) => setHomeDueDay(e.target.value)}
              />
            </label>
          </div>

          <label className="life-toggle-row">
            <input
              type="checkbox"
              checked={homeAutopay}
              onChange={(e) => setHomeAutopay(e.target.checked)}
            />
            <span>Payment is automatic</span>
          </label>
        </div>

        <div className="life-card">
          <div className="life-card-title">🗺️ Where is the paperwork?</div>

          <label>
            <span>Lease / mortgage pointer</span>
            <input
              value={homePointer}
              onChange={(e) => setHomePointer(e.target.value)}
              placeholder="Drive → Documents → Lease"
            />
          </label>

          <div className="soft-callout">
            <span>🧭</span>
            <p>
              Life Wallet remembers where the document lives. It does not need
              to become the document vault.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInternet = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="🌐"
        title="The invisible utility."
        text="Provider, price, plan and support details should not disappear until the exact moment the internet breaks."
      />

      <div className="life-split">
        <div className="life-card">
          <div className="life-card-title">📡 Service</div>

          <div className="life-form-grid">
            <label className="span-2">
              <span>Provider</span>
              <input
                value={internetProvider}
                onChange={(e) => setInternetProvider(e.target.value)}
                placeholder="Internet provider"
              />
            </label>

            <label>
              <span>Monthly bill</span>
              <input
                type="number"
                value={internetAmount}
                onChange={(e) => setInternetAmount(e.target.value)}
                placeholder="79.99"
              />
            </label>

            <label>
              <span>Due day</span>
              <input
                type="number"
                min="1"
                max="31"
                value={internetDue}
                onChange={(e) => setInternetDue(e.target.value)}
              />
            </label>

            <label className="span-2">
              <span>Plan / speed</span>
              <input
                value={internetPlan}
                onChange={(e) => setInternetPlan(e.target.value)}
                placeholder="1 Gbps fiber"
              />
            </label>
          </div>
        </div>

        <div className="life-card">
          <div className="life-card-title">🛟 When it breaks</div>

          <label>
            <span>Support / account pointer</span>
            <textarea
              className="life-textarea compact"
              value={internetSupport}
              onChange={(e) => setInternetSupport(e.target.value)}
              placeholder="Support number, portal name, modem location..."
            />
          </label>

          <div className="bill-chip">
            <span>Monthly</span>
            <strong>
              {internetAmount ? money(Number(internetAmount)) : "$0.00"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPhone = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="📱"
        title="Service and tiny computer debt."
        text="Keep the carrier bill and device payment visible without turning this into a finance application."
      />

      <div className="life-stat-row">
        <div className="life-stat-card hero-stat">
          <span>Monthly phone</span>
          <strong>{phoneAmount ? money(Number(phoneAmount)) : "$0.00"}</strong>
          <small>{phoneCarrier || "No carrier entered"}</small>
        </div>

        <div className="life-stat-card">
          <span>Device remaining</span>
          <strong>
            {deviceBalance ? money(Number(deviceBalance)) : "$0.00"}
          </strong>
          <small>remaining balance</small>
        </div>

        <div className="life-stat-card">
          <span>Payment</span>
          <strong>{phoneAutopay ? "Auto" : "Manual"}</strong>
          <small>due day {phoneDue || "—"}</small>
        </div>
      </div>

      <div className="life-card">
        <div className="life-card-title">📲 Phone payment</div>

        <div className="life-form-grid four">
          <label>
            <span>Carrier</span>
            <input
              value={phoneCarrier}
              onChange={(e) => setPhoneCarrier(e.target.value)}
              placeholder="Carrier"
            />
          </label>

          <label>
            <span>Monthly bill</span>
            <input
              type="number"
              value={phoneAmount}
              onChange={(e) => setPhoneAmount(e.target.value)}
              placeholder="95"
            />
          </label>

          <label>
            <span>Due day</span>
            <input
              type="number"
              min="1"
              max="31"
              value={phoneDue}
              onChange={(e) => setPhoneDue(e.target.value)}
            />
          </label>

          <label>
            <span>Device remaining</span>
            <input
              type="number"
              value={deviceBalance}
              onChange={(e) => setDeviceBalance(e.target.value)}
              placeholder="480"
            />
          </label>
        </div>

        <label className="life-toggle-row">
          <input
            type="checkbox"
            checked={phoneAutopay}
            onChange={(e) => setPhoneAutopay(e.target.checked)}
          />
          <span>Autopay is enabled</span>
        </label>
      </div>
    </div>
  );

  const renderGrocery = () => {
    const remaining = groceries.filter((x) => !x.done).length;

    return (
      <div className="life-room-content">
        <SectionTitle
          icon="🛒"
          title="Stop spending brain RAM on milk."
          text="The grocery list is a depletion landing zone: notice it once, then let the list remember."
        />

        <div className="grocery-toolbar">
          <input
            value={groceryName}
            onChange={(e) => setGroceryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addGrocery();
            }}
            placeholder="What ran out?"
          />

          <select
            value={groceryCategory}
            onChange={(e) => setGroceryCategory(e.target.value)}
          >
            <option>General</option>
            <option>Produce</option>
            <option>Fridge</option>
            <option>Freezer</option>
            <option>Pantry</option>
            <option>Household</option>
          </select>

          <button className="life-action-button" onClick={addGrocery}>
            Toss it in
          </button>
        </div>

        <div className="grocery-summary">
          <span>🧺</span>
          <strong>{remaining}</strong>
          <small>things still needed</small>
        </div>

        <div className="grocery-board">
          {groceries.length === 0 ? (
            <EmptyNote>
              Grocery basket is empty. Either you're stocked or living dangerously.
            </EmptyNote>
          ) : (
            groceries.map((item) => (
              <label
                key={item.id}
                className={`grocery-item ${item.done ? "done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() =>
                    setGroceries((current) =>
                      current.map((x) =>
                        x.id === item.id ? { ...x, done: !x.done } : x
                      )
                    )
                  }
                />

                <span className="grocery-checkmark">✓</span>

                <div>
                  <strong>{item.name}</strong>
                  <small>{item.category}</small>
                </div>

                <button
                  type="button"
                  className="tiny-remove"
                  onClick={(e) => {
                    e.preventDefault();

                    setGroceries((current) =>
                      current.filter((x) => x.id !== item.id)
                    );
                  }}
                >
                  ×
                </button>
              </label>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderLaundry = () => {
    const cycles = [
      ["everyday", "👕", "Everyday clothes"],
      ["work", "👔", "Work clothes"],
      ["bedding", "🛏️", "Bedding"],
      ["towels", "🧻", "Towels"],
      ["delicates", "🧦", "Delicates / oddballs"],
    ] as const;

    return (
      <div className="life-room-content">
        <SectionTitle
          icon="🧺"
          title="Laundry as elapsed state."
          text="No guilt calendar. Just remember when categories were last handled."
        />

        <div className="laundry-grid">
          {cycles.map(([key, icon, title]) => (
            <div className="laundry-card" key={key}>
              <div className="laundry-icon">{icon}</div>

              <strong>{title}</strong>

              <div className="laundry-age">
                {elapsedLabel(laundryDates[key])}
              </div>

              <input
                type="date"
                value={laundryDates[key]}
                onChange={(e) =>
                  setLaundryDates((current) => ({
                    ...current,
                    [key]: e.target.value,
                  }))
                }
              />

              <button
                className="small-life-button"
                onClick={() =>
                  setLaundryDates((current) => ({
                    ...current,
                    [key]: todayISO(),
                  }))
                }
              >
                Washed today ✓
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFriends = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="🫂"
        title="People aren't tasks."
        text="This room remembers plans you actually want to keep without turning friendship into CRM software."
      />

      <div className="life-card">
        <div className="life-form-grid friend-form">
          <label>
            <span>Who?</span>
            <input
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              placeholder="Friend"
            />
          </label>

          <label className="span-2">
            <span>What were we talking about doing?</span>
            <input
              value={friendPlan}
              onChange={(e) => setFriendPlan(e.target.value)}
              placeholder="Coffee, game night, hike..."
            />
          </label>

          <label>
            <span>When?</span>
            <input
              type="date"
              value={friendDate}
              onChange={(e) => setFriendDate(e.target.value)}
            />
          </label>
        </div>

        <button className="life-action-button" onClick={addFriendPlan}>
          Remember this plan
        </button>
      </div>

      <div className="friend-board">
        {friendPlans.length === 0 ? (
          <EmptyNote>
            No plans captured. This room is allowed to stay low pressure.
          </EmptyNote>
        ) : (
          friendPlans.map((plan) => (
            <div className="friend-card" key={plan.id}>
              <div className="friend-avatar">🙂</div>

              <div>
                <strong>{plan.person}</strong>
                <p>{plan.plan}</p>
                <small>{plan.date || "No date yet"}</small>
              </div>

              <button
                className="tiny-remove"
                onClick={() =>
                  setFriendPlans((current) =>
                    current.filter((x) => x.id !== plan.id)
                  )
                }
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="📅"
        title="Places future-you has agreed to appear."
        text="Appointments stay visible as commitments instead of hiding inside date squares."
      />

      <div className="life-card">
        <div className="life-form-grid appointment-form">
          <label className="span-2">
            <span>Appointment</span>
            <input
              value={appointmentTitle}
              onChange={(e) => setAppointmentTitle(e.target.value)}
              placeholder="Dentist, haircut, DMV..."
            />
          </label>

          <label>
            <span>Date</span>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </label>

          <label>
            <span>Time</span>
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
            />
          </label>

          <label className="span-2">
            <span>Where?</span>
            <input
              value={appointmentPlace}
              onChange={(e) => setAppointmentPlace(e.target.value)}
              placeholder="Office, clinic, address pointer..."
            />
          </label>
        </div>

        <button className="life-action-button" onClick={addAppointment}>
          Put it on the board
        </button>
      </div>

      <div className="appointment-board">
        {appointments.length === 0 ? (
          <EmptyNote>No appointments captured yet.</EmptyNote>
        ) : (
          [...appointments]
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((appointment) => (
              <div className="appointment-ticket" key={appointment.id}>
                <div className="appointment-date">
                  <strong>{appointment.date.slice(8, 10)}</strong>
                  <small>{appointment.date.slice(5, 7)}</small>
                </div>

                <div className="appointment-body">
                  <strong>{appointment.title}</strong>
                  <span>
                    {appointment.time || "Any time"}{" "}
                    {appointment.place ? `• ${appointment.place}` : ""}
                  </span>
                </div>

                <button
                  className="tiny-remove"
                  onClick={() =>
                    setAppointments((current) =>
                      current.filter((x) => x.id !== appointment.id)
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );

  const renderWork = () => (
    <div className="life-room-content">
      <SectionTitle
        icon="💼"
        title="When is work allowed to own your time?"
        text="A simple weekly boundary instead of making your personal life reverse-engineer your work calendar."
      />

      <div className="work-layout">
        <div className="life-card">
          <div className="life-card-title">🕐 Normal hours</div>

          <div className="work-time-row">
            <label>
              <span>Start</span>
              <input
                type="time"
                value={workStart}
                onChange={(e) => setWorkStart(e.target.value)}
              />
            </label>

            <span className="work-arrow">→</span>

            <label>
              <span>End</span>
              <input
                type="time"
                value={workEnd}
                onChange={(e) => setWorkEnd(e.target.value)}
              />
            </label>
          </div>

          <textarea
            className="life-textarea compact"
            value={workNote}
            onChange={(e) => setWorkNote(e.target.value)}
            placeholder="On-call week, commute note, weird Friday..."
          />
        </div>

        <div className="week-board">
          {Object.entries(workDays).map(([day, enabled]) => (
            <button
              className={`weekday-tile ${enabled ? "working" : "off"}`}
              onClick={() =>
                setWorkDays((current) => ({
                  ...current,
                  [day]: !current[day],
                }))
              }
              key={day}
            >
              <strong>{day.slice(0, 3)}</strong>
              <span>{enabled ? `${workStart}–${workEnd}` : "OFF"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => {
    const remaining = tasks.filter((task) => !task.done).length;

    return (
      <div className="life-room-content">
        <SectionTitle
          icon="✅"
          title="My turn."
          text="Only put things here when you are actually the next thing that has to move."
        />

        <div className="task-topline">
          <div>
            <strong>{remaining}</strong>
            <span>still mine</span>
          </div>

          <div>
            <strong>{tasks.filter((x) => x.done).length}</strong>
            <span>finished</span>
          </div>
        </div>

        <div className="life-card">
          <div className="life-form-grid task-form">
            <label className="span-2">
              <span>What needs your move?</span>
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Return headphones..."
              />
            </label>

            <label>
              <span>Due</span>
              <input
                type="date"
                value={taskDue}
                onChange={(e) => setTaskDue(e.target.value)}
              />
            </label>

            <label>
              <span>Weight</span>
              <select
                value={taskPriority}
                onChange={(e) =>
                  setTaskPriority(e.target.value as TaskItem["priority"])
                }
              >
                <option>Normal</option>
                <option>Soon</option>
                <option>Important</option>
              </select>
            </label>
          </div>

          <button className="life-action-button" onClick={addTask}>
            Give future-me the baton
          </button>
        </div>

        <div className="task-board">
          {tasks.length === 0 ? (
            <EmptyNote>Your turn pile is empty.</EmptyNote>
          ) : (
            tasks.map((task) => (
              <label
                className={`task-slip ${task.done ? "done" : ""}`}
                key={task.id}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() =>
                    setTasks((current) =>
                      current.map((x) =>
                        x.id === task.id
                          ? { ...x, done: !x.done }
                          : x
                      )
                    )
                  }
                />

                <span className="task-check">✓</span>

                <div className="task-slip-body">
                  <strong>{task.title}</strong>

                  <small>
                    {task.priority}
                    {task.due ? ` • ${task.due}` : ""}
                  </small>
                </div>

                <button
                  type="button"
                  className="tiny-remove"
                  onClick={(e) => {
                    e.preventDefault();

                    setTasks((current) =>
                      current.filter((x) => x.id !== task.id)
                    );
                  }}
                >
                  ×
                </button>
              </label>
            ))
          )}
        </div>
      </div>
    );
  };


  const renderForgotten = () => {
    const selectedNiche =
      nicheAreas.find((area) => area.id === nicheActive) ?? null;

    const currentEntries = selectedNiche
      ? nicheEntries[selectedNiche.id] ?? []
      : [];

    const currentDraft = selectedNiche
      ? nicheDrafts[selectedNiche.id] ?? ""
      : "";

    const addNicheEntry = () => {
      if (!selectedNiche || !currentDraft.trim()) return;

      const entry: NicheEntry = {
        id: `${Date.now()}-${Math.random()}`,
        text: currentDraft.trim(),
        done: false,
      };

      setNicheEntries((current) => ({
        ...current,
        [selectedNiche.id]: [
          ...(current[selectedNiche.id] ?? []),
          entry,
        ],
      }));

      setNicheDrafts((current) => ({
        ...current,
        [selectedNiche.id]: "",
      }));
    };

    const toggleNicheEntry = (id: string) => {
      if (!selectedNiche) return;

      setNicheEntries((current) => ({
        ...current,
        [selectedNiche.id]: (current[selectedNiche.id] ?? []).map(
          (entry) =>
            entry.id === id
              ? { ...entry, done: !entry.done }
              : entry
        ),
      }));
    };

    const removeNicheEntry = (id: string) => {
      if (!selectedNiche) return;

      setNicheEntries((current) => ({
        ...current,
        [selectedNiche.id]: (current[selectedNiche.id] ?? []).filter(
          (entry) => entry.id !== id
        ),
      }));
    };

    // ========================================================
    // 🧷 SELECTED NICHE = FULL ROOM
    // ========================================================

    if (selectedNiche) {
      const remaining = currentEntries.filter(
        (entry) => !entry.done
      ).length;

      return (
        <div className="life-room-content forgotten-room niche-full-room">

          <div className="niche-room-header">
            <button
              className="junk-back-button"
              onClick={() => setNicheActive(null)}
            >
              ← Junk Drawer
            </button>

            <div className="niche-room-title">
              <div className={`niche-room-big-icon niche-${selectedNiche.color}`}>
                {selectedNiche.icon}
              </div>

              <div>
                <small>WHAT AM I FORGETTING?</small>
                <h3>{selectedNiche.title}</h3>
                <p>{selectedNiche.short}</p>
              </div>
            </div>

            <div className="niche-room-counter">
              <strong>{remaining}</strong>
              <span>still on my mind</span>
            </div>
          </div>

          <div className="niche-room-question">
            <span>💭</span>

            <div>
              <small>THINK ABOUT THIS</small>
              <strong>{selectedNiche.question}</strong>
            </div>
          </div>

          <div className="niche-room-columns">

            <section className="niche-prompt-card">
              <div className="niche-card-heading">
                <span>🔎</span>
                Stuff people commonly forget
              </div>

              <div className="niche-starter-grid">
                {selectedNiche.examples.map((example) => (
                  <button
                    key={example}
                    className="niche-starter"
                    onClick={() =>
                      setNicheDrafts((current) => ({
                        ...current,
                        [selectedNiche.id]: example,
                      }))
                    }
                  >
                    <span>＋</span>
                    {example}
                  </button>
                ))}
              </div>

              <div className="starter-hint">
                Tap one to drop it into the remembering box.
              </div>
            </section>

            <section className="niche-memory-card">
              <div className="niche-card-heading">
                <span>📌</span>
                What do I need to remember?
              </div>

              <textarea
                className="niche-memory-input"
                value={currentDraft}
                onChange={(e) =>
                  setNicheDrafts((current) => ({
                    ...current,
                    [selectedNiche.id]: e.target.value,
                  }))
                }
                placeholder={`Anything about ${selectedNiche.title.toLowerCase()} that future-you shouldn't have to reconstruct...`}
              />

              <button
                className="life-action-button niche-pin-button"
                onClick={addNicheEntry}
              >
                📌 Pin this thought
              </button>
            </section>

          </div>

          <section className="remember-board">

            <div className="remember-board-heading">
              <div>
                <span>🧠</span>
                <strong>Things I'm remembering</strong>
              </div>

              <small>
                {currentEntries.length === 0
                  ? "Nothing here yet."
                  : `${currentEntries.length} remembered`}
              </small>
            </div>

            {currentEntries.length === 0 ? (
              <div className="remember-empty">
                <div className="remember-empty-icon">
                  {selectedNiche.icon}
                </div>

                <div>
                  <strong>
                    Nothing pinned for {selectedNiche.title.toLowerCase()}.
                  </strong>

                  <p>
                    That's allowed. This room only exists so your brain
                    doesn't have to keep asking the question.
                  </p>
                </div>
              </div>
            ) : (
              <div className="remember-note-grid">

                {currentEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`remember-note ${
                      entry.done ? "remember-done" : ""
                    }`}
                    style={{
                      transform: `rotate(${
                        [-0.45, 0.35, -0.2, 0.5][index % 4]
                      }deg)`,
                    }}
                  >
                    <button
                      className="remember-check"
                      onClick={() => toggleNicheEntry(entry.id)}
                      title={
                        entry.done
                          ? "Mark unfinished"
                          : "Mark handled"
                      }
                    >
                      {entry.done ? "✓" : ""}
                    </button>

                    <div className="remember-note-copy">
                      <strong>{entry.text}</strong>

                      <small>
                        {entry.done
                          ? "Handled."
                          : "Future-you knows now."}
                      </small>
                    </div>

                    <button
                      className="remember-remove"
                      onClick={() => removeNicheEntry(entry.id)}
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}

              </div>
            )}

          </section>

          <div className="niche-room-footer">
            <span>🌱</span>

            <div>
              <strong>Remembering is enough for now.</strong>
              <small>
                If this becomes actionable later, we can teach Life Wallet
                where it should go next.
              </small>
            </div>
          </div>

        </div>
      );
    }

    // ========================================================
    // 🧷 NO SELECTION = THE JUNK DRAWER
    // ========================================================

    return (
      <div className="life-room-content forgotten-room">

        <div className="forgotten-heading">
          <div className="forgotten-question">
            ❓
          </div>

          <div>
            <h3>What am I forgetting?</h3>

            <p>
              Probably something. That's normal. Poke around until
              something makes your brain go “OH SHIT, THAT.”
            </p>
          </div>
        </div>

        <div className="junk-drawer-sign">
          <span>🧷</span>
          THE ADULTING JUNK DRAWER
          <span>🧷</span>
        </div>

        <div className="niche-bulletin-board">

          <div className="cork-speck cork-speck-a" />
          <div className="cork-speck cork-speck-b" />
          <div className="cork-speck cork-speck-c" />

          <div className="niche-grid">

            {nicheAreas.map((area, index) => {
              const remembered =
                nicheEntries[area.id]?.filter(
                  (entry) => !entry.done
                ).length ?? 0;

              return (
                <button
                  key={area.id}
                  className={`niche-button niche-${area.color}`}
                  onClick={() => setNicheActive(area.id)}
                  style={{
                    transform: `rotate(${
                      [-0.8, 0.5, -0.25, 0.9][index % 4]
                    }deg)`,
                  }}
                >
                  <span className="niche-pin">●</span>

                  {remembered > 0 && (
                    <span className="niche-memory-badge">
                      {remembered}
                    </span>
                  )}

                  <span className="niche-icon">
                    {area.icon}
                  </span>

                  <strong>{area.title}</strong>
                  <small>{area.short}</small>
                </button>
              );
            })}

          </div>
        </div>

        <div className="forgotten-bottom-note">
          <span>👀</span>

          <div>
            <strong>Nothing screaming at you?</strong>

            <small>
              Excellent. Leave the junk drawer closed and go live your life.
            </small>
          </div>
        </div>

      </div>
    );
  };
  const renderRoom = () => {
    switch (activeId) {
      case "subscriptions":
        return renderSubscriptions();
      case "car":
        return renderCar();
      case "home":
        return renderHome();
      case "internet":
        return renderInternet();
      case "phone":
        return renderPhone();
      case "grocery":
        return renderGrocery();
      case "laundry":
        return renderLaundry();
      case "friends":
        return renderFriends();
      case "appointments":
        return renderAppointments();
      case "work":
        return renderWork();
      case "tasks":
        return renderTasks();
      case "forgotten":
        return renderForgotten();
      default:
        return null;
    }
  };

  return (
    <main className={`app ${launching ? "app-launching" : ""}`}>
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
          <div className="panel-title">LIFE BOARD</div>

          <div className="room-grid life-board-grid">
            {areas.map((area) => (
              <button
                key={area.id}
                className={`room-button ${area.accent} ${
                  activeId === area.id ? "selected" : ""
                }`}
                onClick={() => setActiveId(area.id)}
              >
                <span className="room-icon">{area.icon}</span>
                <strong>{area.title}</strong>
                <small>{area.short}</small>
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

          <button
            className={`companion-summoner ${
              companionPickerOpen ? "summoner-open" : ""
            }`}
            onClick={() =>
              setCompanionPickerOpen((current) => !current)
            }
            title="Choose a little friend"
          >
            <span className="summoner-face">☺</span>

            <span className="summoner-copy">
              <strong>COMPANION</strong>
              <small>summon friend</small>
            </span>
          </button>

          {companionPickerOpen && (
            <div className="companion-picker">

              <div className="companion-picker-sign">
                <span>🌱</span>
                PICK A LITTLE DUDE
                <span>🌱</span>
              </div>

              <div className="companion-picker-grid">

                {companions.map((friend) => (
                  <button
                    key={friend.id}
                    className={`companion-choice companion-${friend.id} ${
                      selectedCompanionId === friend.id
                        ? "companion-choice-selected"
                        : ""
                    }`}
                    onClick={() => summonCompanion(friend.id)}
                  >
                    <div className="choice-creature">
                      <span className="choice-ear choice-ear-left" />
                      <span className="choice-ear choice-ear-right" />

                      <span className="choice-eye choice-eye-left" />
                      <span className="choice-eye choice-eye-right" />
                    </div>

                    <strong>{friend.name}</strong>
                    <small>{friend.description}</small>
                  </button>
                ))}

              </div>

              {selectedCompanion && (
                <button
                  className="companion-dismiss"
                  onClick={() => {
                    setSelectedCompanionId(null);
                    setCompanionPickerOpen(false);
                  }}
                >
                  Let my friend wander off
                </button>
              )}

            </div>
          )}

          <div className="companion-ledge-stage">

            {selectedCompanion && (
              <div className="companion-home">

                <div className="companion-speech">
                  {selectedCompanion.lines[companionLineIndex]}
                </div>

                <button
                  className={`companion companion-${selectedCompanion.id}`}
                  onClick={pokeCompanion}
                  title={`Say hi to ${selectedCompanion.name}`}
                >
                  <span className="companion-ear companion-ear-left" />
                  <span className="companion-ear companion-ear-right" />

                  <span className="companion-eye companion-eye-left">
                    <span />
                  </span>

                  <span className="companion-eye companion-eye-right">
                    <span />
                  </span>

                  <span className="companion-mouth" />
                  <span className="companion-foot companion-foot-left" />
                  <span className="companion-foot companion-foot-right" />
                </button>

              </div>
            )}

          </div>

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

            <div className="paper life-panel-paper">{renderRoom()}</div>
          </article>
        </section>
      </section>

      <footer>
        <span>🌱 Life Wallet 0.2</span>
        <span>Remember the state. Keep the secrets elsewhere.</span>
      </footer>

      {launching && (
        <div
          className={`launch-overlay ${
            launchLeaving ? "launch-leaving" : ""
          }`}
          aria-hidden="true"
        >
          <div className="launch-glow launch-glow-a" />
          <div className="launch-glow launch-glow-b" />

          <div className="launch-card">
            <div className="launch-creature">
              <span className="launch-leaf leaf-left" />
              <span className="launch-leaf leaf-right" />

              <span className="launch-eye launch-eye-left">
                <span />
              </span>

              <span className="launch-eye launch-eye-right">
                <span />
              </span>

              <span className="launch-hand launch-hand-left" />
              <span className="launch-hand launch-hand-right" />
            </div>

            <div className="launch-board">
              <span className="launch-bolt bolt-left" />
              <span className="launch-bolt bolt-right" />

              <div className="launch-copy">
                <strong>One spot</strong>
                <span>to remember</span>
                <b>where everything is!</b>
              </div>
            </div>

            <div className="launch-loading">
              <span>Loading</span>
              <span className="launch-spinner">↻</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;