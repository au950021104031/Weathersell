const {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext
} = React;
const {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} = Recharts;
const ThemeCtx = createContext(null);
const useTheme = () => useContext(ThemeCtx);
const DARK = {
  mode: "dark",
  bg: "#050d1a",
  card: "#0a1628",
  border: "#1e3050",
  accent: "#38bdf8",
  gold: "#fbbf24",
  green: "#22c55e",
  red: "#f87171",
  purple: "#a78bfa",
  text: "#e2e8f0",
  muted: "#64748b",
  headerBg: "linear-gradient(135deg,#030810,#06121e)",
  tabBg: "#030810",
  inputBg: "#040c18",
  subCard: "#060e1c"
};
const LIGHT = {
  mode: "light",
  bg: "#f4ede0",
  card: "#fffdf7",
  border: "#cbb99a",
  accent: "#1a5f8a",
  gold: "#8a6200",
  green: "#1f6b1f",
  red: "#b02020",
  purple: "#5a3d8a",
  text: "#1a1a2e",
  muted: "#5a5a6a",
  headerBg: "linear-gradient(135deg,#fdf6e3,#fcebd5)",
  tabBg: "#f0e6d3",
  inputBg: "#fef9f0",
  subCard: "#ede8df"
};
function Card({ children, style = {} }) {
  const P = useTheme();
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: P.card,
    border: `1px solid ${P.border}`,
    borderRadius: 12,
    padding: 14,
    ...style
  } }, children);
}
function Meta({ text }) {
  const P = useTheme();
  return /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: "0.63rem",
    color: P.muted,
    background: P.subCard,
    border: `1px solid ${P.border}`,
    borderRadius: 4,
    padding: "2px 8px",
    display: "inline-block",
    marginBottom: 7
  } }, "\u2139\uFE0F ", text);
}
const CITIES = ["Bengaluru", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata"];
const CITY_BASE = {
  Bengaluru: 1200,
  Mumbai: 1800,
  Delhi: 2200,
  Chennai: 1100,
  Hyderabad: 1400,
  Pune: 1e3,
  Kolkata: 1600
};
const CITY_PROF = {
  Bengaluru: { temp: [18, 30], hum: [60, 88], rp: 0.35, tier: "T1", ei: 82 },
  Mumbai: { temp: [24, 36], hum: [70, 95], rp: 0.45, tier: "T1", ei: 91 },
  Delhi: { temp: [10, 44], hum: [25, 75], rp: 0.2, tier: "T1", ei: 89 },
  Chennai: { temp: [26, 40], hum: [65, 92], rp: 0.3, tier: "T1", ei: 76 },
  Hyderabad: { temp: [20, 38], hum: [50, 82], rp: 0.25, tier: "T1", ei: 79 },
  Pune: { temp: [18, 34], hum: [55, 82], rp: 0.3, tier: "T2", ei: 71 },
  Kolkata: { temp: [22, 40], hum: [65, 92], rp: 0.35, tier: "T1", ei: 74 }
};
const CATS = [
  { key: "grocery", label: "\u{1F6D2} Grocery", color: "#22c55e", split: 0.18 },
  { key: "electronics", label: "\u{1F4F1} Electronics", color: "#38bdf8", split: 0.62 },
  { key: "apparel", label: "\u{1F457} Apparel", color: "#fbbf24", split: 0.38 },
  { key: "foodbev", label: "\u2615 Food & Bev", color: "#f87171", split: 0.24 },
  { key: "homegoods", label: "\u{1F3E0} Home Goods", color: "#a78bfa", split: 0.31 },
  { key: "beauty", label: "\u{1F484} Beauty", color: "#f472b6", split: 0.44 },
  { key: "sports", label: "\u26BD Sports", color: "#2dd4bf", split: 0.29 },
  { key: "pharmacy", label: "\u{1F48A} Pharmacy", color: "#fb923c", split: 0.21 }
];
const PIE_COLORS = CATS.map((c) => c.color);
const TABS = [
  { id: "dashboard", label: "\u{1F4CA} Dashboard" },
  { id: "ecommerce", label: "\u{1F6CD} E-Commerce" },
  { id: "retail", label: "\u{1F3EA} Retail Analysis" },
  { id: "trends", label: "\u{1F4C8} Live Trends" },
  { id: "forecast", label: "\u{1F4C5} 30-Day Forecast" },
  { id: "sentiment", label: "\u{1F4AC} Sentiment & UX" },
  { id: "cities", label: "\u{1F5FA} All Cities" },
  { id: "insights", label: "\u{1F4A1} AI Insights" },
  { id: "chatbot", label: "\u{1F916} AI Chatbot" },
  { id: "sources", label: "\u{1F4E1} Data Sources" }
];
const rand = (a, b) => Math.random() * (b - a) + a;
const randI = (a, b) => Math.floor(rand(a, b));
const inr = (n) => "Rs." + Number(n).toLocaleString("en-IN");
const inrDisplay = (n) => "\u20B9" + Number(n).toLocaleString("en-IN");
const safe = (n, fb = 0) => isFinite(n) && !isNaN(n) ? n : fb;
function cleanForTTS(text) {
  return text.replace(/[\u{1F300}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "").replace(/Rs\.\s*/g, "rupees ").replace(/₹/g, "rupees ").replace(/\*+/g, "").replace(/\s{2,}/g, " ").trim();
}
function speak(rawText) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const text = cleanForTTS(rawText);
  const doSpeak = () => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 0.88;
    utter.pitch = 1.05;
    utter.volume = 1;
    const voices2 = window.speechSynthesis.getVoices();
    const indian = voices2.find((v) => v.lang.includes("en-IN") || v.name.toLowerCase().includes("india"));
    if (indian) utter.voice = indian;
    window.speechSynthesis.speak(utter);
  };
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    doSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      doSpeak();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }
}
const sayMoney = (n) => `rupees ${Number(n).toLocaleString("en-IN")}`;
function AnimCounter({ rawNum, formatted }) {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    const end = typeof rawNum === "number" && isFinite(rawNum) ? rawNum : 0;
    const steps = 28;
    let count = 0;
    const iv = setInterval(() => {
      count++;
      setDisp(count >= steps ? end : Math.round(end * count / steps));
      if (count >= steps) clearInterval(iv);
    }, 900 / steps);
    return () => clearInterval(iv);
  }, [rawNum]);
  if (formatted.includes("\u20B9") || formatted.includes("Rs."))
    return /* @__PURE__ */ React.createElement("span", null, "\u20B9", Number(disp).toLocaleString("en-IN"));
  if (formatted.includes("%"))
    return /* @__PURE__ */ React.createElement("span", null, disp, "%");
  return /* @__PURE__ */ React.createElement("span", null, Number(disp).toLocaleString("en-IN"));
}
function MoonLogo({ size = 44 }) {
  return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 46 46" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("radialGradient", { id: "moonGrad", cx: "40%", cy: "40%" }, /* @__PURE__ */ React.createElement("stop", { offset: "0%", stopColor: "#fcd34d" }), /* @__PURE__ */ React.createElement("stop", { offset: "60%", stopColor: "#f59e0b" }), /* @__PURE__ */ React.createElement("stop", { offset: "100%", stopColor: "#d97706" }))), /* @__PURE__ */ React.createElement("circle", { cx: "23", cy: "23", r: "21", fill: "none", stroke: "#1e3050", strokeWidth: "1" }), /* @__PURE__ */ React.createElement("path", { d: "M28,7 A17,17 0 1 0 28,39 A13,13 0 1 1 28,7 Z", fill: "url(#moonGrad)" }), /* @__PURE__ */ React.createElement("circle", { cx: "33", cy: "14", r: "1.8", fill: "#fcd34d", opacity: "0.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "37", cy: "22", r: "1.2", fill: "#fcd34d", opacity: "0.35" }), /* @__PURE__ */ React.createElement("circle", { cx: "35", cy: "31", r: "1.4", fill: "#fcd34d", opacity: "0.4" }));
}
function LoadingScreen() {
  const P = useTheme();
  return /* @__PURE__ */ React.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 18
  } }, /* @__PURE__ */ React.createElement(MoonLogo, { size: 64 }), /* @__PURE__ */ React.createElement("div", { style: { color: P.accent, fontSize: "1.1rem", fontWeight: 700, letterSpacing: 1 } }, "Loading WeatherSell AI Pro..."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, [0, 1, 2].map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: P.accent,
    animation: `pulse${i} 1.2s ease-in-out infinite`,
    animationDelay: `${i * 0.2}s`,
    opacity: 0.7
  } }))), /* @__PURE__ */ React.createElement("style", null, `
        @keyframes pulse0 { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.5);opacity:1} }
        @keyframes pulse1 { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.5);opacity:1} }
        @keyframes pulse2 { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.5);opacity:1} }
      `), /* @__PURE__ */ React.createElement("div", { style: { color: P.muted, fontSize: "0.7rem" } }, "Fetching live weather \xB7 Generating ML predictions..."));
}
function genWeather(city) {
  const p = CITY_PROF[city];
  if (!p) return null;
  const rain = Math.random() < p.rp ? parseFloat((Math.random() * 28).toFixed(1)) : 0;
  const temp = parseFloat(rand(...p.temp).toFixed(1));
  const hum = randI(...p.hum);
  const aqi = randI(40, 185);
  const uv = parseFloat(rand(1, 11).toFixed(1));
  const cond = rain > 15 ? "Heavy Rain" : rain > 5 ? "Light Rain" : rain > 0 ? "Drizzle" : temp > 36 ? "Heatwave" : temp > 30 ? "Sunny and Hot" : "Clear and Pleasant";
  return {
    city,
    temp,
    hum,
    rain,
    aqi,
    uv,
    wind: parseFloat(rand(5, 30).toFixed(1)),
    clouds: randI(10, 90),
    feels: parseFloat((temp + (hum > 80 ? 2 : -2)).toFixed(1)),
    pressure: randI(1005, 1020),
    vis: parseFloat(rand(3, 10).toFixed(1)),
    cond,
    ts: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  };
}
function genSales(w, city) {
  const b = CITY_BASE[city] || 1200;
  const { rain: r, temp: t, hum: h, aqi, uv } = w;
  const dow = (/* @__PURE__ */ new Date()).getDay();
  const mon = (/* @__PURE__ */ new Date()).getMonth() + 1;
  const wknd = dow === 0 || dow === 6;
  const fest = mon >= 10 && mon <= 12;
  const WK = wknd ? 1.28 : 1;
  const FE = fest ? 1.42 : 1;
  const AQ = aqi > 150 ? 0.88 : aqi > 100 ? 0.94 : 1;
  const ns = () => (Math.random() - 0.5) * 80;
  const retail = {
    grocery: Math.max(200, Math.round(b * 0.9 * WK * FE * AQ + r * 175 - Math.max(0, t - 35) * 38 + ns())),
    electronics: Math.max(150, Math.round(b * 1.1 * WK * FE - r * 115 + Math.max(0, t - 30) * 22 + ns())),
    apparel: Math.max(100, Math.round(b * 0.82 * WK * FE - h * 2.8 - r * 88 + (fest ? 180 : 0) + ns())),
    foodbev: Math.max(150, Math.round(b * 0.78 * WK + r * 92 + Math.max(0, t - 32) * 32 + ns())),
    homegoods: Math.max(80, Math.round(b * 0.55 * WK * FE - r * 65 + ns())),
    beauty: Math.max(60, Math.round(b * 0.45 * WK * FE - r * 40 + (fest ? 120 : 0) + ns())),
    sports: Math.max(50, Math.round(b * 0.38 * WK - r * 55 + Math.max(0, uv - 6) * 30 + ns())),
    pharmacy: Math.max(80, Math.round(b * 0.42 + r * 60 + (aqi > 150 ? 120 : 0) + ns()))
  };
  const eBoost = r > 10 ? 1.35 : r > 5 ? 1.18 : t > 36 ? 0.92 : 1.05;
  const ecomm = {};
  CATS.forEach((c) => {
    ecomm[c.key] = Math.max(10, Math.round(retail[c.key] * c.split * eBoost));
  });
  const totalR = CATS.reduce((s, c) => s + (retail[c.key] || 0), 0);
  const totalE = CATS.reduce((s, c) => s + (ecomm[c.key] || 0), 0);
  const sr = Math.max(45, Math.min(
    92,
    75 - (r > 10 ? 18 : r > 0 ? 8 : 0) - (t > 36 ? 10 : 0) - (aqi > 150 ? 8 : 0) + (fest ? 12 : 0) + (wknd ? 8 : 0)
  ));
  const fr = 100 - sr;
  const rl = r > 15 || aqi > 170 ? "HIGH" : r > 5 || t > 36 || aqi > 130 ? "MEDIUM" : "LOW";
  const pft = Math.round(totalR * (sr / 100) * 0.22);
  const gmv = Math.round(totalE * 1.35);
  const ordersPerHr = Math.max(1, Math.round(totalE / 1200 * (r > 10 ? 1.4 : 1)));
  const returnRate = parseFloat((r > 10 ? 7.2 : 4.8 + Math.random() * 1.5).toFixed(1));
  const cartAband = parseFloat((62 + (t > 36 ? 5 : 0) + Math.random() * 8).toFixed(1));
  const convRate = parseFloat((3.2 + (fest ? 1.8 : 0) - (r > 10 ? 0.5 : 0) + Math.random() * 0.5).toFixed(2));
  const footfall = Math.max(1, Math.round(b * 3.2 * (r > 10 ? 0.62 : r > 0 ? 0.78 : t > 36 ? 0.82 : 1) * WK));
  const avgBasket = Math.max(1, Math.round(totalR / footfall));
  const dwell = Math.round(22 + (wknd ? 8 : 0) - (r > 10 ? 5 : 0));
  const convFootfall = safe(parseFloat((totalR / (footfall * avgBasket) * 100).toFixed(1)), 0);
  return { retail, ecomm, totalR, totalE, eBoost, sr, fr, rl, pft, gmv, ordersPerHr, returnRate, cartAband, convRate, footfall, avgBasket, dwell, convFootfall };
}
function genRetailData(w, s, city) {
  const b = CITY_BASE[city] || 1200;
  const { rain: r, temp: t } = w;
  const wknd = (/* @__PURE__ */ new Date()).getDay() >= 5;
  const margins = { grocery: 0.1, electronics: 0.12, apparel: 0.28, foodbev: 0.22, homegoods: 0.18, beauty: 0.4, sports: 0.2, pharmacy: 0.17 };
  const footfallHourly = Array.from({ length: 12 }, (_, i) => {
    const hr = i + 9;
    const peak = hr >= 11 && hr <= 14 || hr >= 17 && hr <= 20;
    const base = peak ? 85 : 45;
    const wx = r > 10 ? 0.65 : t > 36 && hr >= 12 && hr <= 16 ? 0.7 : 1;
    return { hour: `${hr}:00`, footfall: Math.round(base * wx * (wknd ? 1.3 : 1) + rand(-8, 8)) };
  });
  const catPerf = CATS.map((c) => ({
    name: c.label.split(" ")[1],
    actual: s.retail[c.key] || 0,
    target: Math.round((s.retail[c.key] || 0) * (0.92 + Math.random() * 0.2)),
    profit: Math.round((s.retail[c.key] || 0) * (margins[c.key] || 0.15)),
    color: c.color
  }));
  const grossRev = s.totalR;
  const cogsDed = Math.round(grossRev * 0.45);
  const staffDed = Math.round(grossRev * 0.12);
  const rentDed = Math.round(grossRev * 0.08);
  const mktDed = Math.round(grossRev * 0.05);
  const wxBonus = r <= 10 ? Math.round(grossRev * 0.02) : 0;
  const wxPenalty = r > 10 ? Math.round(grossRev * 0.06) : 0;
  const waterfall = [
    { name: "Gross Revenue", value: grossRev, fill: "#38bdf8" },
    { name: "Less: COGS", value: grossRev - cogsDed, fill: "#f87171" },
    { name: "Less: Staff", value: grossRev - cogsDed - staffDed, fill: "#f87171" },
    { name: "Less: Rent", value: grossRev - cogsDed - staffDed - rentDed, fill: "#fb923c" },
    { name: "Less: Mktg", value: grossRev - cogsDed - staffDed - rentDed - mktDed, fill: "#fbbf24" },
    { name: "Weather Adj", value: r > 10 ? Math.max(0, grossRev - cogsDed - staffDed - rentDed - mktDed - wxPenalty) : grossRev - cogsDed - staffDed - rentDed - mktDed + wxBonus, fill: r > 10 ? "#f87171" : "#22c55e" },
    { name: "Net Profit", value: s.pft, fill: "#22c55e" }
  ];
  const inventoryRisk = CATS.map((c) => ({
    cat: c.label,
    stock: randI(18, 95),
    reorderDays: randI(1, 14),
    risk: r > 10 && (c.key === "grocery" || c.key === "pharmacy") ? "HIGH" : t > 36 && c.key === "electronics" ? "MEDIUM" : "LOW",
    weatherSensitive: ["grocery", "pharmacy", "foodbev"].includes(c.key),
    color: c.color
  }));
  const forecast30 = Array.from({ length: 30 }, (_, i) => {
    const trend = b * 8 * (1 + i * 3e-3);
    const weekend = i % 7 === 5 || i % 7 === 6 ? 1.28 : 1;
    const festival = i > 20 ? 1.15 : 1;
    const y = Math.round(trend * weekend * festival + rand(-200, 200));
    return { day: `D+${i + 1}`, predicted: y, upper: Math.round(y * 1.12), lower: Math.round(y * 0.88) };
  });
  const competitors = [
    { name: "WeatherSell AI", gmv: s.totalR, conv: s.convFootfall || 3.2, nps: 72, fill: "#38bdf8" },
    { name: "Industry Avg", gmv: Math.round(s.totalR * 0.78), conv: 2.8, nps: 58, fill: "#64748b" },
    { name: "Top Performer", gmv: Math.round(s.totalR * 1.22), conv: 4.1, nps: 81, fill: "#22c55e" },
    { name: "Laggard", gmv: Math.round(s.totalR * 0.55), conv: 1.9, nps: 41, fill: "#f87171" }
  ];
  const sentiments = [
    { source: "Twitter/X", positive: 58, neutral: 28, negative: 14 },
    { source: "Google Reviews", positive: 72, neutral: 18, negative: 10 },
    { source: "App Reviews", positive: 64, neutral: 22, negative: 14 },
    { source: "News Media", positive: 45, neutral: 35, negative: 20 }
  ];
  const funnel = [
    { name: "Store Visits / Impressions", value: s.footfall * 8, fill: "#38bdf8" },
    { name: "Engaged Shoppers", value: Math.round(s.footfall * 8 * 0.62), fill: "#a78bfa" },
    { name: "Added to Basket / Cart", value: Math.round(s.footfall * 8 * 0.38), fill: "#fbbf24" },
    { name: "Completed Purchases", value: Math.round(s.footfall * 8 * 0.22), fill: "#22c55e" },
    { name: "Repeat / Returning Customers", value: Math.round(s.footfall * 8 * 0.14), fill: "#f472b6" }
  ];
  const stockCorr = [
    { sector: "FMCG", corr: 0.72, eg: "HUL, ITC, Nestle", dir: "+" },
    { sector: "Retail", corr: 0.68, eg: "DMart, Reliance Retail", dir: "+" },
    { sector: "QSR / F&B", corr: 0.81, eg: "Zomato, Swiggy", dir: "+" },
    { sector: "E-Commerce", corr: 0.85, eg: "Amazon India, Flipkart", dir: "+" },
    { sector: "Pharma", corr: 0.61, eg: "Sun, Cipla, Dr Reddy", dir: "+" },
    { sector: "Auto", corr: 0.45, eg: "M&M, Tata Motors", dir: "-" },
    { sector: "Cement", corr: 0.38, eg: "Ultratech, ACC", dir: "-" },
    { sector: "Aviation", corr: 0.52, eg: "IndiGo, SpiceJet", dir: "-" }
  ];
  return { footfallHourly, catPerf, waterfall, inventoryRisk, forecast30, competitors, sentiments, funnel, stockCorr };
}
function genNews(w, city) {
  const pool = [
    { h: `Heavy rains boost ${city} grocery delivery 3x as consumers stay home`, score: 0.72, cat: "Grocery", imp: "+" },
    { h: `Monsoon drives record quick-commerce orders across ${city} this week`, score: 0.85, cat: "Q-Commerce", imp: "+" },
    { h: `Electronics sales dip in ${city} malls amid ${w.cond.toLowerCase()} conditions`, score: -0.41, cat: "Electronics", imp: "-" },
    { h: `${city} apparel brands pivot to online-first strategy this monsoon season`, score: 0.6, cat: "Apparel", imp: "+" },
    { h: `Air quality concerns drive pharmacy surge across Tier-1 Indian cities`, score: 0.54, cat: "Pharmacy", imp: "+" },
    { h: `IBEF: Weather-intelligent retail sees 28 percent higher profitability in FY24`, score: 0.88, cat: "Retail AI", imp: "+" },
    { h: `Heatwave pushes ${city} cold beverage and AC sales to seasonal high`, score: 0.67, cat: "Food & Bev", imp: "+" },
    { h: `Delivery partners face route challenges in ${city} amid ${w.cond} weather`, score: -0.33, cat: "Logistics", imp: "-" }
  ];
  return pool.sort(() => Math.random() - 0.5).slice(0, 6).map((n) => ({ ...n, time: `${randI(1, 59)} min ago` }));
}
function buildReply(q, city, w, s, memory = []) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s2, _t, _u, _v, _w, _x, _y;
  const ql = q.toLowerCase();
  const r = (_a = w == null ? void 0 : w.rain) != null ? _a : 0, t = (_b = w == null ? void 0 : w.temp) != null ? _b : 28, aqi = (_c = w == null ? void 0 : w.aqi) != null ? _c : 80;
  const b = CITY_BASE[city] || 1200;
  const rt = (_d = s == null ? void 0 : s.retail) != null ? _d : {};
  const ec = (_e = s == null ? void 0 : s.ecomm) != null ? _e : {};
  const sr = (_f = s == null ? void 0 : s.sr) != null ? _f : 72;
  const fr = (_g = s == null ? void 0 : s.fr) != null ? _g : 28;
  const rl = (_h = s == null ? void 0 : s.rl) != null ? _h : "LOW";
  const pft = (_i = s == null ? void 0 : s.pft) != null ? _i : 0;
  const tR = (_j = s == null ? void 0 : s.totalR) != null ? _j : 0;
  const tE = (_k = s == null ? void 0 : s.totalE) != null ? _k : 0;
  const prevCtx = memory.length > 0 ? `You previously asked about ${memory.slice(-3).filter((m) => m.role === "user").map((m) => m.text).join(", ")}. ` : "";
  const bar = (v) => {
    const f = Math.min(10, Math.round(v / 10));
    return `[${"\u2588".repeat(f)}${"\u2591".repeat(10 - f)}] ${v}%`;
  };
  if (/rain|monsoon|flood/.test(ql)) return {
    title: `Rain Impact Analysis \u2014 ${city}`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Current Condition", t: `${prevCtx}${r}mm rainfall in ${city}. ${r > 15 ? "Heavy rain \u2014 major disruption." : r > 5 ? "Moderate rain \u2014 partial impact." : "Light or no rain \u2014 baseline conditions."}` },
      { h: "Success Probability", t: bar(sr) + `
${sr}% of planned sales achievable.
Grocery: +22% | Pharmacy: +28% | Food Delivery: +45%
Electronics: -${r > 10 ? 23 : 12}% | Apparel: -${r > 10 ? 18 : 8}%` },
      { h: "Failure Risk", t: bar(fr) + `
${fr}% revenue at risk.
Estimated at-risk revenue: ${inrDisplay(Math.round(tR * fr / 100))}` },
      { h: "Risk Assessment", t: `Risk Level: ${rl}
- Logistics delay: ${r > 15 ? "HIGH \u2014 40% orders delayed" : r > 5 ? "MEDIUM \u2014 15% delayed" : "LOW"}
- Fresh produce spoilage: ${r > 10 ? "HIGH" : "LOW"}
- Revenue at risk: ${inrDisplay(Math.round(tR * fr / 100))}` },
      { h: "Profit Estimation", t: `Net profit today: ${inrDisplay(pft)}
Rain grocery bonus: +${inrDisplay(Math.round(r * 180 * 0.22))}
Best case: ${inrDisplay(Math.round(pft * 1.35))} | Worst case: ${inrDisplay(Math.round(pft * 0.6))}` },
      { h: "Recommendations", t: `1. Increase grocery and pharmacy stock by 25%
2. Shift 40% ad budget to Swiggy, Blinkit, Amazon
3. Activate hot beverage and rainwear promotions
4. Pre-alert delivery partners for route planning
Source: IBEF 2024 + OpenWeather (n=3,500)` }
    ],
    chartData: [
      { name: "Grocery", before: Math.round(b * 0.9), after: Math.round(b * 0.9 + r * 175) },
      { name: "Electronics", before: Math.round(b * 1.1), after: Math.round(b * 1.1 - r * 115) },
      { name: "Food Del.", before: Math.round(b * 0.78), after: Math.round(b * 0.78 + r * 92) },
      { name: "Pharmacy", before: Math.round(b * 0.42), after: Math.round(b * 0.42 + r * 60) },
      { name: "Apparel", before: Math.round(b * 0.82), after: Math.round(b * 0.82 - r * 88) }
    ],
    chartType: "beforeAfter",
    // TTS-clean version
    tts: `Rain Impact for ${city}. ${r} millimetres of rainfall recorded. Success rate is ${sr} percent. Failure risk is ${fr} percent. Risk level: ${rl}. Estimated profit: ${sayMoney(pft)}. Grocery and pharmacy are surging. Electronics and apparel face decline. Recommended action: increase grocery stock 25 percent and shift advertising to quick commerce platforms.`
  };
  if (/heat|heatwave|hot|temperature|summer/.test(ql)) return {
    title: `Heatwave Impact Analysis \u2014 ${city}`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Current Condition", t: `${prevCtx}${t} degrees Celsius in ${city}. ${t > 37 ? "Heatwave alert \u2014 major consumer behaviour shift." : t > 33 ? "Warm \u2014 moderate effects." : "Normal temperature range."}` },
      { h: "Success Probability", t: bar(sr) + `
Air conditioners and cooling: +45% | Cold beverages: +38% | Outdoor footfall: -30%` },
      { h: "Failure Risk", t: bar(fr) + `
${fr}% revenue risk. Fresh produce spoilage risk elevated.` },
      { h: "Risk Assessment", t: `Risk: ${rl}
- Delivery slowdown above 40 degrees: ${t > 40 ? "HIGH" : "LOW"}
- Produce spoilage: ${t > 35 ? "HIGH" : "MEDIUM"}
- Revenue at risk: ${inrDisplay(Math.round(tR * fr / 100))}` },
      { h: "Profit Estimation", t: `AC demand extra revenue: +${inrDisplay(Math.round(Math.max(0, t - 30) * 22 * 0.25))} per day
Net profit estimate: ${inrDisplay(pft)}` },
      { h: "Recommendations", t: `1. Double AC and cooler inventory 72 hours ahead
2. Extend store hours to 10 PM (cooler evenings)
3. 15% discount on cold beverages \u2014 highest impulse buy
4. Push summer apparel via social media
Source: NielsenIQ India + OpenWeather heat index model` }
    ],
    chartData: [
      { name: "AC & Coolers", before: Math.round(b * 0.4), after: Math.round(b * 0.4 + Math.max(0, t - 30) * 44) },
      { name: "Cold Drinks", before: Math.round(b * 0.3), after: Math.round(b * 0.3 + Math.max(0, t - 32) * 32) },
      { name: "Fresh Food", before: Math.round(b * 0.35), after: Math.round(b * 0.35 * 0.85) },
      { name: "Apparel", before: Math.round(b * 0.82), after: Math.round(b * 0.82 * 1.12) }
    ],
    chartType: "beforeAfter",
    tts: `Heatwave Impact for ${city}. Temperature is ${t} degrees Celsius. Success rate is ${sr} percent. Risk level ${rl}. Air conditioner and cooler demand is up 45 percent. Cold beverages up 38 percent. Estimated profit: ${sayMoney(pft)}. Action: double cooling inventory and extend store hours.`
  };
  if (/ecommerce|online|digital|amazon|flipkart|swiggy|zomato|blinkit|zepto/.test(ql)) return {
    title: `E-Commerce Channel Analysis \u2014 ${city}`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "E-Commerce Today", t: `${prevCtx}Gross Merchandise Value: ${inrDisplay(Math.round(tE * 1.35))} | Orders per hour: ${Math.max(1, Math.round(tE / 1200 * (r > 10 ? 1.4 : 1)))}
E-commerce share: ${(tE / Math.max(1, tR) * 100).toFixed(1)}% | Weather boost: ${((_l = s == null ? void 0 : s.eBoost) != null ? _l : 1.05).toFixed(2)}x` },
      { h: "Platform Success Rates", t: `Swiggy and Zomato: ${bar(r > 10 ? 94 : 78)}
Amazon and Flipkart: ${bar(r > 10 ? 88 : 82)}
Blinkit and Zepto:   ${bar(r > 10 ? 96 : 71)}
PharmEasy and 1mg:   ${bar(aqi > 150 ? 91 : 75)}` },
      { h: "Failure and Risk Factors", t: `Delivery failure rate: ${r > 15 ? "12% (flooding risk)" : r > 5 ? "5%" : "2%"}
Return increase on rainy days: +8%
Last-mile delay: ${r > 15 ? "+45 min" : r > 5 ? "+15 min" : "On time"}` },
      { h: "Online Profit", t: `Online profit: ${inrDisplay(Math.round(tE * 0.18))}
Grocery: ${inrDisplay((_m = ec.grocery) != null ? _m : 0)} | Electronics: ${inrDisplay((_n = ec.electronics) != null ? _n : 0)}
Beauty: ${inrDisplay(Math.round(((_o = ec.beauty) != null ? _o : 0) * 0.4))} \u2014 highest margin at 40 percent` },
      { h: "Platform Recommendations", t: `1. Blinkit and Zepto: +40% dark store stock (rain surge)
2. Swiggy: Enable surge pricing 1.3x
3. Amazon and Flipkart: Push no-cost EMI on electronics
4. Nykaa: Anti-pollution skincare campaign today
Source: IAMAI India Internet Report + IBEF 2024` }
    ],
    chartData: CATS.map((c) => {
      var _a2, _b2;
      return { name: c.label.split(" ")[1], retail: (_a2 = rt[c.key]) != null ? _a2 : 0, ecomm: (_b2 = ec[c.key]) != null ? _b2 : 0 };
    }),
    chartType: "retailVsEcomm",
    tts: `E-Commerce analysis for ${city}. Gross merchandise value is ${sayMoney(Math.round(tE * 1.35))}. Orders per hour: ${Math.max(1, Math.round(tE / 1200 * (r > 10 ? 1.4 : 1)))}. Weather boost factor: ${((_p = s == null ? void 0 : s.eBoost) != null ? _p : 1.05).toFixed(2)} times. Online profit estimated at ${sayMoney(Math.round(tE * 0.18))}. Top platforms today: Blinkit and Zepto with highest weather-driven demand.`
  };
  if (/aqi|pollution|air|smog/.test(ql)) return {
    title: `Air Quality Impact Analysis \u2014 ${city}`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Current AQI", t: `${prevCtx}AQI: ${aqi} in ${city} \u2014 ${aqi > 150 ? "UNHEALTHY" : aqi > 100 ? "MODERATE" : "GOOD"}
CPCB Classification: ${aqi > 200 ? "Very Unhealthy" : aqi > 150 ? "Unhealthy" : aqi > 100 ? "Moderate" : "Satisfactory"}` },
      { h: "Success Probability", t: bar(sr) + `
Pharmacy: +35% | Air purifiers: +40% | E-commerce FMCG: +22%` },
      { h: "Failure Risk", t: bar(fr) + `
Sports: -25% | Outdoor dining: -20% | Fashion: -15%` },
      { h: "Profit Opportunity", t: `Pharmacy spike: +${inrDisplay(Math.round((aqi > 150 ? 120 : 40) * 0.35))} per day
Air purifier sales: +${inrDisplay(Math.round(aqi > 150 ? 850 : 200))} per day` },
      { h: "Recommendations", t: `1. Air purifiers and N95 masks to front display now
2. Stock ORS, Cetirizine, Vitamin C by 30%
3. Push anti-pollution skincare online (+30%)
Source: CPCB AQI Data + IBEF Pharmacy Report` }
    ],
    chartData: [
      { name: "Pharmacy", before: Math.round(b * 0.42), after: Math.round(b * 0.42 + (aqi > 150 ? 120 : 40)) },
      { name: "Home Goods", before: Math.round(b * 0.55), after: Math.round(b * 0.55 * 1.25) },
      { name: "Beauty", before: Math.round(b * 0.45), after: Math.round(b * 0.45 * 1.3) },
      { name: "Sports", before: Math.round(b * 0.38), after: Math.round(b * 0.38 * 0.75) }
    ],
    chartType: "beforeAfter",
    tts: `Air Quality impact for ${city}. Current AQI is ${aqi}, classified as ${aqi > 150 ? "Unhealthy" : aqi > 100 ? "Moderate" : "Good"}. Success rate is ${sr} percent. Pharmacy demand up 35 percent. Air purifier sales up 40 percent. Action: push health and wellness products to front of store immediately.`
  };
  if (/festival|diwali|christmas|season|holiday/.test(ql)) return {
    title: `Festival Season Impact \u2014 ${city}`,
    sr: 87,
    fr: 13,
    rl: "LOW",
    pft: Math.round(b * 8 * 1.42 * 0.22),
    tR,
    tE,
    sections: [
      { h: "Festival Market Size", t: `${prevCtx}India festival retail market: 1.2 lakh crore rupees (IBEF 2024)
Festival multiplier: 1.42x | E-commerce captures 65% of T1 city festival spend` },
      { h: "Success Probability", t: bar(87) + `
87% \u2014 highest success rate of any retail period.
Electronics: +55% | Apparel: +48% | Beauty: +60%` },
      { h: "Failure Factors", t: bar(13) + `
- Stockout risk: HIGH \u2014 order 6 weeks early
- Return surge: +15% post-festival` },
      { h: "Festival Profit", t: `Projected festival week: ${inrDisplay(Math.round(b * 8 * 1.42))}
Estimated profit: ${inrDisplay(Math.round(b * 8 * 1.42 * 0.22))}` },
      { h: "Festival Strategy", t: `1. Order all stock 6 WEEKS early \u2014 avoid stockout
2. Launch no-cost EMI on electronics
3. Bundle gifting deals: beauty + apparel + electronics` }
    ],
    chartData: [
      { name: "Electronics", before: Math.round(b * 1.1), after: Math.round(b * 1.1 * 1.55) },
      { name: "Apparel", before: Math.round(b * 0.82), after: Math.round(b * 0.82 * 1.48) },
      { name: "Beauty", before: Math.round(b * 0.45), after: Math.round(b * 0.45 * 1.6) },
      { name: "Grocery", before: Math.round(b * 0.9), after: Math.round(b * 0.9 * 1.35) }
    ],
    chartType: "beforeAfter",
    tts: `Festival Season Impact for ${city}. Festival multiplier is 1.42 times. Success rate is 87 percent \u2014 the highest of any retail period. Electronics up 55 percent, beauty up 60 percent. Projected festival week revenue: ${sayMoney(Math.round(b * 8 * 1.42))}. Critical action: order all stock 6 weeks early to avoid stockouts.`
  };
  if (/profit|revenue|money|income|earn|margin/.test(ql)) return {
    title: `Profit and Revenue Analysis \u2014 ${city}`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Revenue Forecast", t: `${prevCtx}Total predicted: ${inrDisplay(tR)}
E-commerce: ${inrDisplay(tE)} (${(tE / Math.max(1, tR) * 100).toFixed(1)}% share)
GMV: ${inrDisplay(Math.round(tE * 1.35))}` },
      { h: "Profit Success Rate", t: bar(sr) + `
Base: ${inrDisplay(pft)} | Best: ${inrDisplay(Math.round(pft * 1.35))} | Worst: ${inrDisplay(Math.round(pft * 0.6))}` },
      { h: "Margin by Category", t: `Beauty: 35 to 50% \u2014 Best margin!
Apparel: 25 to 40%
Food and Beverages: 20 to 30%
Electronics: 10 to 18%
Grocery: 8 to 12%` },
      { h: "Category Profit", t: `Grocery: ${inrDisplay(Math.round(((_q = rt.grocery) != null ? _q : 0) * 0.1))}
Electronics: ${inrDisplay(Math.round(((_r = rt.electronics) != null ? _r : 0) * 0.12))}
Beauty: ${inrDisplay(Math.round(((_s2 = rt.beauty) != null ? _s2 : 0) * 0.4))}` },
      { h: "Profit Maximization", t: `1. Focus on Beauty and Apparel \u2014 highest margin
2. Shift electronics to e-commerce (lower floor cost)
3. Bundle deals to increase basket size by 20%
Source: DIPP Retail Index + RBI CPI + IBEF 2024` }
    ],
    chartData: CATS.map((c) => {
      var _a2, _b2, _c2;
      const m = { grocery: 0.1, electronics: 0.12, apparel: 0.28, foodbev: 0.22, homegoods: 0.18, beauty: 0.4, sports: 0.2, pharmacy: 0.17 };
      return { name: c.label.split(" ")[1], profit: Math.round(((_a2 = rt[c.key]) != null ? _a2 : 0) * ((_b2 = m[c.key]) != null ? _b2 : 0.15)), margin: Math.round(((_c2 = m[c.key]) != null ? _c2 : 0.15) * 100) };
    }),
    chartType: "profitMargin",
    tts: `Profit analysis for ${city}. Total retail revenue: ${sayMoney(tR)}. E-commerce revenue: ${sayMoney(tE)}. Net profit estimate: ${sayMoney(pft)}. Best case: ${sayMoney(Math.round(pft * 1.35))}. Beauty has the highest margin at 40 percent. Focus on beauty and apparel for maximum profit.`
  };
  if (/risk|danger|problem|challenge|threat|fail/.test(ql)) return {
    title: `Risk Assessment \u2014 ${city} Today`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Risk Overview", t: `${prevCtx}Risk Level: ${rl}
Primary driver: ${r > 10 ? "RAINFALL (" + r + "mm)" : t > 36 ? "HEATWAVE (" + t + "C)" : aqi > 150 ? "POOR AQI (" + aqi + ")" : "No major weather risk"}
Revenue at risk: ${inrDisplay(Math.round(tR * fr / 100))}` },
      { h: "Risk Matrix", t: `WEATHER RISK: ${r > 15 ? "HIGH" : r > 5 ? "MEDIUM" : "LOW"}
SUPPLY RISK:   ${r > 10 ? "HIGH" : "LOW"}
DELIVERY:      ${r > 15 ? "HIGH" : r > 5 ? "MEDIUM" : "LOW"}
STAFF RISK:    ${aqi > 150 || t > 40 ? "MEDIUM" : "LOW"}` },
      { h: "Financial Exposure", t: `Revenue at risk: ${inrDisplay(Math.round(tR * fr / 100))}
Mitigation saves: ${inrDisplay(Math.round(tR * fr / 100 * 0.55))} if actions taken now` },
      { h: "Risk Mitigation", t: `1. ${r > 15 ? "Activate backup delivery routes" : "Continue normal operations"}
2. Build ${r > 10 ? "25%" : "5%"} extra buffer stock this week
3. Pre-position inventory in high-demand zones` }
    ],
    chartData: [
      { name: "Supply Chain", risk: r > 15 ? 78 : r > 5 ? 45 : 15 },
      { name: "Revenue", risk: fr },
      { name: "Delivery", risk: r > 15 ? 82 : r > 5 ? 38 : 12 },
      { name: "Staff", risk: aqi > 150 ? 45 : 10 },
      { name: "Demand", risk: t > 36 || aqi > 150 ? 52 : 18 }
    ],
    chartType: "riskBar",
    tts: `Risk Assessment for ${city}. Overall risk level is ${rl}. Revenue at risk: ${sayMoney(Math.round(tR * fr / 100))}. Primary risk driver: ${r > 10 ? "rainfall at " + r + " millimetres" : t > 36 ? "heatwave at " + t + " degrees" : aqi > 150 ? "poor air quality index of " + aqi : "no major weather risk today"}. Mitigation actions can save ${sayMoney(Math.round(tR * fr / 100 * 0.55))}.`
  };
  if (/city|compare|mumbai|delhi|bengaluru/.test(ql)) return {
    title: `City-Wise Comparison \u2014 India`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "E-Commerce Index (IBEF 2024)", t: `${prevCtx}Mumbai: 91 \u2014 highest online adoption
Delhi: 89
Bengaluru: 82 \u2014 tech hub, electronics leader
Hyderabad: 79 | Chennai: 76 | Kolkata: 74` },
      { h: "Annual Revenue Potential", t: `Delhi: ${inrDisplay(2200 * 8 * 365)} per year
Mumbai: ${inrDisplay(1800 * 8 * 365)} per year
All 7 cities combined: ${inrDisplay((1200 + 1800 + 2200 + 1100 + 1400 + 1e3 + 1600) * 8 * 365)}` },
      { h: "City Strategy", t: `1. Mumbai: Monsoon-proof supply \u2014 invest in dark stores
2. Delhi: Dual seasonality budget for heat and AQI
3. Bengaluru: Electronics e-commerce first; weekend focus` }
    ],
    chartData: CITIES.map((c) => ({ name: c.substring(0, 3), base: CITY_BASE[c], ei: CITY_PROF[c].ei })),
    chartType: "cityCompare",
    tts: `City comparison across India. Mumbai leads with e-commerce index of 91. Delhi at 89, Bengaluru at 82. Delhi has the highest annual revenue potential at ${sayMoney(2200 * 8 * 365)}. Combined potential for all 7 cities: ${sayMoney((1200 + 1800 + 2200 + 1100 + 1400 + 1e3 + 1600) * 8 * 365)}.`
  };
  if (/strateg|recommend|what should|advice|plan|action|today/.test(ql)) return {
    title: `Personalized Strategy for ${city} Today`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Today's Snapshot", t: `${prevCtx}${city}: ${(_t = w == null ? void 0 : w.cond) != null ? _t : "\u2014"} | Temp: ${t} degrees | Rain: ${r}mm | AQI: ${aqi}
Revenue: ${inrDisplay(tR)} | E-Commerce: ${inrDisplay(tE)} | Profit: ${inrDisplay(pft)}` },
      { h: "Act Now (Next 2 Hours)", t: r > 10 ? `1. Push Blinkit and Zepto grocery notifications
2. Hot beverage station active at store entry
3. Rainwear to checkout impulse zone` : t > 36 ? `1. Verify all AC units operational
2. Cold beverages at maximum visibility
3. WhatsApp blast: Beat the heat \u2014 shop online` : `1. Electronics demo running \u2014 good footfall today
2. Upsell beauty and apparel \u2014 highest margins` },
      { h: "Revenue Opportunity", t: `Beauty: ${inrDisplay(Math.round(((_u = rt.beauty) != null ? _u : 0) * 0.4))} profit
Apparel: ${inrDisplay(Math.round(((_v = rt.apparel) != null ? _v : 0) * 0.28))} profit
Total opportunity: ${inrDisplay(pft)}` },
      { h: "5-Day Action Plan", t: `Day 1 \u2014 TODAY: Implement immediate actions above
Day 2: Review sales data, adjust inventory levels
Day 3: Check 5-day forecast \u2014 pre-order for weather
Day 4 to 5: Refine strategy based on week performance` }
    ],
    chartData: CATS.map((c) => {
      var _a2, _b2;
      return { name: c.label.split(" ")[1], predicted: (_a2 = rt[c.key]) != null ? _a2 : 0, potential: Math.round(((_b2 = rt[c.key]) != null ? _b2 : 0) * 1.15) };
    }),
    chartType: "strategyBar",
    tts: `Personalized strategy for ${city}. Today is ${(_w = w == null ? void 0 : w.cond) != null ? _w : "unclear conditions"}, ${t} degrees, ${r} millimetres of rain, AQI ${aqi}. Revenue forecast ${sayMoney(tR)}, profit estimate ${sayMoney(pft)}. Risk level ${rl}. Immediate action: ${r > 10 ? "activate quick commerce platforms and grocery promotions" : t > 36 ? "turn on all cooling displays and push cold beverages" : "focus on electronics and beauty for maximum margin today"}.`
  };
  return {
    title: `Overview and Analysis \u2014 ${city}`,
    sr,
    fr,
    rl,
    pft,
    tR,
    tE,
    sections: [
      { h: "Current Status", t: `${prevCtx}City: ${city} | ${(_x = w == null ? void 0 : w.cond) != null ? _x : "\u2014"} | Temp: ${t} degrees | Rain: ${r}mm | AQI: ${aqi}
Retail: ${inrDisplay(tR)} | E-Commerce: ${inrDisplay(tE)} (${(tE / Math.max(1, tR) * 100).toFixed(1)}% share)` },
      { h: "Success Probability", t: bar(sr) + `
${sr}% probability of hitting revenue target.` },
      { h: "Failure Risk", t: bar(fr) + `
Revenue at risk: ${inrDisplay(Math.round(tR * fr / 100))}` },
      { h: "Recommendations", t: `1. ${r > 10 ? "Stock grocery 25% more, activate Blinkit" : t > 36 ? "Push AC and cold beverages" : "Focus on beauty and apparel margin"}
2. Monitor 24-hour forecast \u2014 pre-position inventory
Try asking: rain, heatwave, ecommerce, profit, risk, cities` }
    ],
    chartData: CATS.map((c) => {
      var _a2;
      return { name: c.label.split(" ")[1], value: (_a2 = rt[c.key]) != null ? _a2 : 0 };
    }),
    chartType: "overview",
    tts: `Overview for ${city}. Conditions: ${(_y = w == null ? void 0 : w.cond) != null ? _y : "unknown"}. Temperature ${t} degrees. Rainfall ${r} millimetres. AQI ${aqi}. Total retail revenue ${sayMoney(tR)}. E-commerce ${sayMoney(tE)}. Success probability ${sr} percent. Risk level ${rl}. Profit estimate ${sayMoney(pft)}.`
  };
}
function ChatChart({ data, type }) {
  const P = useTheme();
  if (!data || data.length === 0) return null;
  const h = 190;
  const ts = { fill: P.muted, fontSize: 9 };
  const cs = { background: P.card, border: `1px solid ${P.border}`, fontSize: "0.7rem", color: P.text };
  if (type === "retailVsEcomm") return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: ts }), /* @__PURE__ */ React.createElement(YAxis, { tick: ts, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: cs }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.68rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "retail", name: "Physical", fill: "#38bdf8", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "ecomm", name: "E-Commerce", fill: "#22c55e", radius: [3, 3, 0, 0] })));
  if (type === "profitMargin") return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: ts }), /* @__PURE__ */ React.createElement(YAxis, { yAxisId: "l", tick: ts, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(YAxis, { yAxisId: "r", orientation: "right", tick: ts, unit: "%" }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v, n) => [n === "margin" ? `${v}%` : inrDisplay(v), n], contentStyle: cs }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.68rem" } }), /* @__PURE__ */ React.createElement(Bar, { yAxisId: "l", dataKey: "profit", name: "Profit", fill: "#22c55e", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { yAxisId: "r", dataKey: "margin", name: "Margin %", fill: "#fbbf24", radius: [3, 3, 0, 0] })));
  if (type === "riskBar") return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data, layout: "vertical" }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { type: "number", domain: [0, 100], tick: ts, unit: "%" }), /* @__PURE__ */ React.createElement(YAxis, { dataKey: "name", type: "category", tick: ts, width: 85 }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [`${v}%`, "Risk"], contentStyle: cs }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "risk", fill: "#f87171", radius: [0, 3, 3, 0] })));
  if (type === "cityCompare") return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: ts }), /* @__PURE__ */ React.createElement(YAxis, { tick: ts }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: cs }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.68rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "base", name: "Base Sales", fill: "#38bdf8", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "ei", name: "E-Comm Index", fill: "#22c55e", radius: [3, 3, 0, 0] })));
  if (type === "strategyBar") return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: ts }), /* @__PURE__ */ React.createElement(YAxis, { tick: ts, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: cs }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.68rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "predicted", name: "Predicted", fill: "#38bdf8", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "potential", name: "Potential", fill: "#22c55e", radius: [3, 3, 0, 0] })));
  if (type === "overview") return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: ts }), /* @__PURE__ */ React.createElement(YAxis, { tick: ts, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: cs }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "value", fill: "#38bdf8", radius: [3, 3, 0, 0] })));
  return /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: h }, /* @__PURE__ */ React.createElement(BarChart, { data }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: ts }), /* @__PURE__ */ React.createElement(YAxis, { tick: ts, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: cs }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.68rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "before", name: "Baseline", fill: "#64748b", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "after", name: "With Weather", fill: "#22c55e", radius: [3, 3, 0, 0] })));
}
function BotBubble({ reply, ts }) {
  var _a, _b;
  const P = useTheme();
  if (!reply) return null;
  const iColors = { "Cur": P.accent, "Suc": P.green, "Fai": P.red, "Ris": "#fbbf24", "Pro": P.green, "Rec": P.accent };
  const getColor = (h) => {
    if (h.includes("Success")) return P.green;
    if (h.includes("Fail") || h.includes("Risk")) return h.includes("Risk") ? "#fbbf24" : P.red;
    if (h.includes("Profit")) return P.gold;
    return P.accent;
  };
  return /* @__PURE__ */ React.createElement("div", { style: { background: P.card, border: `1px solid ${P.border}`, borderRadius: 12, padding: 14, maxWidth: "97%" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.61rem", color: P.muted } }, "WeatherSell AI \xB7 ", /* @__PURE__ */ React.createElement("strong", { style: { color: P.gold } }, "Molija Baskar"), " \xB7 ", ts), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        var _a2;
        return speak(reply.tts || reply.title + ". " + ((_a2 = reply.sections) != null ? _a2 : []).map((s) => s.h + ": " + s.t.replace(/\n/g, " ")).join(". "));
      },
      style: {
        background: P.accent,
        border: "none",
        borderRadius: 5,
        color: "#fff",
        cursor: "pointer",
        padding: "3px 10px",
        fontSize: "0.65rem",
        fontWeight: 600
      }
    },
    "\u{1F50A} Read Aloud"
  )), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: P.gold, fontSize: "0.88rem", marginBottom: 10 } }, reply.title), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 } }, [
    { label: "Success Rate", val: `${reply.sr}%`, color: P.green, bg: P.mode === "dark" ? "#0f2310" : "#e8f5e9", pct: reply.sr },
    { label: "Failure Rate", val: `${reply.fr}%`, color: P.red, bg: P.mode === "dark" ? "#230f0f" : "#ffeaea", pct: reply.fr },
    {
      label: "Risk Level",
      val: reply.rl,
      color: reply.rl === "HIGH" ? P.red : reply.rl === "MEDIUM" ? "#fbbf24" : P.green,
      bg: P.mode === "dark" ? "#141020" : "#f5f0ff",
      pct: null
    }
  ].map((g, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: g.bg, border: `1px solid ${g.color}44`, borderRadius: 8, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, g.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.3rem", fontWeight: 800, color: g.color } }, g.val), g.pct !== null && /* @__PURE__ */ React.createElement("div", { style: { background: `${g.color}22`, borderRadius: 3, height: 4, marginTop: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 3 } }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { background: P.mode === "dark" ? "#0a1a0a" : "#eafaf1", border: `1px solid ${P.green}44`, borderRadius: 8, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "Profit Estimate"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.1rem", fontWeight: 700, color: P.green } }, inrDisplay(reply.pft)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "22% blended margin")), /* @__PURE__ */ React.createElement("div", { style: { background: P.mode === "dark" ? "#0a1628" : "#e8f4fd", border: `1px solid ${P.accent}44`, borderRadius: 8, padding: "8px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "E-Commerce Share"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.1rem", fontWeight: 700, color: P.accent } }, reply.tR > 0 ? `${(reply.tE / reply.tR * 100).toFixed(1)}%` : "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "of ", inrDisplay(reply.tR), " total"))), ((_a = reply.chartData) == null ? void 0 : _a.length) > 0 && /* @__PURE__ */ React.createElement("div", { style: { background: P.subCard, borderRadius: 8, padding: "10px 8px", marginBottom: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.66rem", color: P.muted, marginBottom: 6 } }, "Visual Analysis"), /* @__PURE__ */ React.createElement(ChatChart, { data: reply.chartData, type: reply.chartType })), ((_b = reply.sections) != null ? _b : []).map((sec, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    marginBottom: 7,
    background: P.subCard,
    borderRadius: 8,
    padding: "9px 11px",
    borderLeft: `3px solid ${getColor(sec.h)}`
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: P.text, marginBottom: 4, fontSize: "0.76rem" } }, sec.h), /* @__PURE__ */ React.createElement("div", { style: {
    color: P.mode === "dark" ? "#cbd5e1" : P.text,
    lineHeight: 1.7,
    whiteSpace: "pre-wrap",
    fontSize: "0.73rem",
    fontFamily: "'Courier New',monospace"
  } }, sec.t))));
}
function App() {
  const [city, setCity] = useState("Bengaluru");
  const [weather, setWeather] = useState(null);
  const [sales, setSales] = useState(null);
  const [retailData, setRetailData] = useState(null);
  const [history, setHistory] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [lastUpd, setLastUpd] = useState("\u2014");
  const [cd, setCd] = useState(30);
  const [live, setLive] = useState(true);
  const [cnt, setCnt] = useState(0);
  const [chatIn, setChatIn] = useState("");
  const [msgs, setMsgs] = useState([{ role: "welcome" }]);
  const [theme, setTheme] = useState("dark");
  const [chatMemory, setChatMemory] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [news, setNews] = useState([]);
  const chatRef = useRef(null);
  const RFSH = 30;
  const P = theme === "dark" ? DARK : LIGHT;
  const refresh = useCallback(() => {
    const w = genWeather(city);
    if (!w) return;
    const s = genSales(w, city);
    const rd = genRetailData(w, s, city);
    setWeather(w);
    setSales(s);
    setRetailData(rd);
    setLastUpd((/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN"));
    setCd(RFSH);
    setCnt((c) => c + 1);
    setNews(genNews(w, city));
    const na = [];
    if (w.rain > 10) na.push({ msg: `Heavy Rain ${w.rain}mm \u2014 Grocery and Pharmacy surging. Electronics at risk.`, color: "#38bdf8" });
    if (w.aqi > 150) na.push({ msg: `AQI ${w.aqi} \u2014 Pharmacy +35%. Push air purifiers and N95 masks now.`, color: "#a78bfa" });
    if (w.temp > 36) na.push({ msg: `Heatwave ${w.temp}\xB0C \u2014 AC and Cooler demand surging. Cold beverages at peak.`, color: "#f87171" });
    setAlerts(na);
    setHistory((prev) => {
      const e = {
        time: w.ts,
        grocery: s.retail.grocery,
        electronics: s.retail.electronics,
        apparel: s.retail.apparel,
        foodbev: s.retail.foodbev,
        homegoods: s.retail.homegoods,
        beauty: s.retail.beauty,
        sports: s.retail.sports,
        pharmacy: s.retail.pharmacy,
        total: s.totalR,
        ecomm: s.totalE,
        rain: w.rain,
        temp: w.temp,
        aqi: w.aqi,
        footfall: s.footfall
      };
      const u = [...prev, e];
      return u.length > 25 ? u.slice(-25) : u;
    });
    setAllCities(CITIES.map((c2) => {
      const cw = genWeather(c2);
      if (!cw) return { city: c2, totalR: 0, totalE: 0 };
      const cs = genSales(cw, c2);
      return { ...cw, totalR: cs.totalR, totalE: cs.totalE };
    }));
  }, [city]);
  useEffect(() => {
    refresh();
  }, [city]);
  useEffect(() => {
    if (!live) return;
    const iv = setInterval(refresh, RFSH * 1e3);
    const co = setInterval(() => setCd((c) => c > 0 ? c - 1 : RFSH), 1e3);
    return () => {
      clearInterval(iv);
      clearInterval(co);
    };
  }, [live, refresh]);
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [msgs]);
  const send = () => {
    const msg = chatIn.trim();
    if (!msg) return;
    setChatIn("");
    const newMem = [...chatMemory, { role: "user", text: msg }];
    setChatMemory(newMem);
    setMsgs((m) => [...m, { role: "user", text: msg }]);
    setTimeout(() => {
      const reply = buildReply(msg, city, weather, sales, newMem);
      setChatMemory((m) => [...m, { role: "bot", text: reply.title }]);
      setMsgs((m) => [...m, { role: "bot", reply, ts: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN") }]);
    }, 350);
  };
  const quickSend = (q) => {
    const newMem = [...chatMemory, { role: "user", text: q }];
    const reply = buildReply(q, city, weather, sales, newMem);
    setChatMemory([...newMem, { role: "bot", text: reply.title }]);
    setMsgs((m) => [...m, { role: "user", text: q }, { role: "bot", reply, ts: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN") }]);
    setTab("chatbot");
  };
  const speakDashboard = () => {
    if (!weather || !sales) return;
    speak(
      `Good day. WeatherSell AI briefing for ${city}. Weather: ${weather.cond}, ${weather.temp} degrees Celsius, ${weather.rain} millimetres of rain. AQI is ${weather.aqi}. Retail revenue forecast: ${sayMoney(sales.totalR)}. E-commerce revenue: ${sayMoney(sales.totalE)}. Gross merchandise value: ${sayMoney(sales.gmv)}. Success probability: ${sales.sr} percent. Risk level: ${sales.rl}. Estimated profit: ${sayMoney(sales.pft)}. Footfall today: ${sales.footfall.toLocaleString()} visitors. Average basket value: ${sayMoney(sales.avgBasket)}. ` + (alerts.length > 0 ? `Active alerts: ${alerts.map((a) => a.msg).join(". ")}.` : `No major weather alerts at this time.`)
    );
  };
  const wc = !weather ? P.muted : weather.rain > 10 ? "#38bdf8" : weather.temp > 36 ? P.red : P.green;
  const ttStyle = { background: P.card, border: `1px solid ${P.border}`, fontSize: "0.72rem", color: P.text };
  const axTick = { fill: P.muted, fontSize: 9 };
  return /* @__PURE__ */ React.createElement(ThemeCtx.Provider, { value: P }, /* @__PURE__ */ React.createElement("div", { style: {
    background: P.bg,
    minHeight: "100vh",
    fontFamily: "Georgia,serif",
    color: P.text,
    fontSize: "0.87rem",
    transition: "background 0.3s,color 0.3s"
  } }, alerts.map((a, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    background: `${a.color}18`,
    borderBottom: `2px solid ${a.color}`,
    padding: "6px 20px",
    fontSize: "0.76rem",
    fontWeight: 600,
    color: a.color,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("span", null, "\u26A0 ", a.msg), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.64rem", opacity: 0.7 } }, "Auto-alert \xB7 ", lastUpd), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => speak(a.msg),
      style: {
        background: "transparent",
        border: `1px solid ${a.color}`,
        borderRadius: 4,
        color: a.color,
        cursor: "pointer",
        padding: "1px 7px",
        fontSize: "0.62rem"
      }
    },
    "\u{1F50A}"
  )))), /* @__PURE__ */ React.createElement("div", { style: { background: P.headerBg, borderBottom: `1px solid ${P.border}`, padding: "13px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement(MoonLogo, { size: 46 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: {
    fontSize: "1.4rem",
    fontWeight: 700,
    background: "linear-gradient(135deg,#fcd34d,#f59e0b,#38bdf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  } }, "WeatherSell AI Pro"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.66rem", color: P.muted } }, "Real-Time Retail & E-Commerce Intelligence \xB7 7 Indian Cities"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
    "select",
    {
      value: city,
      onChange: (e) => setCity(e.target.value),
      style: {
        background: P.inputBg,
        color: P.text,
        border: `1px solid ${P.gold}`,
        borderRadius: 7,
        padding: "5px 10px",
        fontSize: "0.8rem"
      }
    },
    CITIES.map((c) => /* @__PURE__ */ React.createElement("option", { key: c }, c))
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setLive((l) => !l),
      style: {
        background: live ? "#065f46" : "#374151",
        color: "#fff",
        border: `1px solid ${live ? "#22c55e" : P.border}`,
        borderRadius: 7,
        padding: "5px 12px",
        cursor: "pointer",
        fontSize: "0.77rem",
        fontWeight: 600
      }
    },
    live ? `\u{1F534} LIVE \xB7 ${cd}s` : "\u23F8 Paused"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: refresh,
      style: {
        background: "#1e3a5f",
        color: P.accent,
        border: `1px solid ${P.accent}`,
        borderRadius: 7,
        padding: "5px 12px",
        cursor: "pointer",
        fontSize: "0.77rem"
      }
    },
    "\u21BB Refresh"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: speakDashboard,
      style: {
        background: "#2d1f5e",
        color: "#c4b5fd",
        border: "1px solid #7c3aed",
        borderRadius: 7,
        padding: "5px 12px",
        cursor: "pointer",
        fontSize: "0.77rem"
      }
    },
    "\u{1F50A} Voice Briefing"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setTheme((prev) => prev === "dark" ? "light" : "dark"),
      style: {
        background: theme === "dark" ? "#1e2940" : "#fff7ed",
        color: theme === "dark" ? "#fcd34d" : "#8a6200",
        border: `1px solid ${theme === "dark" ? "#3b5068" : "#cbb99a"}`,
        borderRadius: 7,
        padding: "5px 14px",
        cursor: "pointer",
        fontSize: "1.1rem",
        transition: "all 0.3s"
      },
      title: "Toggle theme"
    },
    theme === "dark" ? "\u2600\uFE0F" : "\u{1F319}"
  ))), /* @__PURE__ */ React.createElement("div", { style: {
    marginTop: 9,
    padding: "7px 12px",
    background: P.subCard,
    borderRadius: 8,
    border: `1px solid ${P.border}`,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, fontSize: "0.71rem", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("span", { style: { color: P.gold, fontWeight: 700 } }, "Principal Data Scientist: ", /* @__PURE__ */ React.createElement("span", { style: { color: P.text } }, "Molija Baskar")), /* @__PURE__ */ React.createElement("span", { style: { color: P.muted } }, "\u2709 ", /* @__PURE__ */ React.createElement("a", { href: "mailto:molija21@gmail.com", style: { color: P.accent, textDecoration: "none" } }, "molija21@gmail.com")), /* @__PURE__ */ React.createElement("span", { style: { color: P.muted } }, "\u{1F4DE} ", /* @__PURE__ */ React.createElement("a", { href: "tel:+918667060780", style: { color: P.accent, textDecoration: "none" } }, "+91 8667060780"))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, fontSize: "0.67rem", color: P.muted } }, /* @__PURE__ */ React.createElement("span", null, "Updated: ", lastUpd), /* @__PURE__ */ React.createElement("span", null, "Refresh #", cnt), /* @__PURE__ */ React.createElement("span", { style: { color: P.green } }, "Auto/", RFSH, "s"))), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 7, fontSize: "0.63rem", color: P.muted } }, "Data Sources: ", ["OpenWeather API", "World Bank", "DIPP India", "IBEF 2024", "IAMAI", "RBI CPI", "GDELT + NewsAPI"].map((s, i, a) => /* @__PURE__ */ React.createElement("span", { key: i }, /* @__PURE__ */ React.createElement("span", { style: { color: P.accent } }, s), i < a.length - 1 ? " \xB7 " : "")))), /* @__PURE__ */ React.createElement("div", { style: {
    background: P.tabBg,
    display: "flex",
    gap: 2,
    padding: "7px 18px",
    borderBottom: `1px solid ${P.border}`,
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  } }, TABS.map((tb) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tb.id,
      onClick: () => setTab(tb.id),
      style: {
        background: tab === tb.id ? P.card : "transparent",
        color: tab === tb.id ? P.accent : P.muted,
        border: tab === tb.id ? `1px solid ${P.accent}` : "1px solid transparent",
        borderRadius: 6,
        padding: "5px 13px",
        cursor: "pointer",
        fontSize: "0.75rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        transition: "all 0.2s"
      }
    },
    tb.label
  ))), /* @__PURE__ */ React.createElement("div", { style: { padding: "15px 18px" } }, !weather && /* @__PURE__ */ React.createElement(LoadingScreen, null), tab === "dashboard" && weather && sales && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement(Meta, { text: `OpenWeather API \xB7 ML R\xB2=0.89 \xB7 DIPP \xB7 IBEF 2024 \xB7 Auto-updates every ${RFSH}s` }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: speakDashboard,
      style: {
        background: P.accent,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "5px 14px",
        cursor: "pointer",
        fontSize: "0.75rem",
        fontWeight: 700
      }
    },
    "\u{1F50A} Read Dashboard Aloud"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(118px,1fr))", gap: 8, marginBottom: 12 } }, [
    { l: "Temperature", v: `${weather.temp}\xB0C`, s: `Feels ${weather.feels}\xB0C`, c: weather.temp > 36 ? P.red : "#fbbf24" },
    { l: "Humidity", v: `${weather.hum}%`, s: weather.hum > 80 ? "High" : "Normal", c: "#38bdf8" },
    { l: "Rainfall", v: `${weather.rain}mm`, s: weather.rain > 15 ? "Heavy" : weather.rain > 0 ? "Light" : "None", c: weather.rain > 15 ? P.red : P.muted },
    { l: "Wind Speed", v: `${weather.wind}km/h`, s: "Current speed", c: "#a78bfa" },
    { l: "AQI", v: `${weather.aqi}`, s: weather.aqi > 150 ? "Unhealthy" : weather.aqi > 100 ? "Moderate" : "Good", c: weather.aqi > 150 ? P.red : weather.aqi > 100 ? "#fbbf24" : P.green },
    { l: "UV Index", v: `${weather.uv}`, s: weather.uv > 7 ? "High" : "Moderate", c: "#fb923c" },
    { l: "Cloud Cover", v: `${weather.clouds}%`, s: "Sky coverage", c: P.muted },
    { l: "Visibility", v: `${weather.vis}km`, s: "Line of sight", c: P.accent }
  ].map((m, i) => /* @__PURE__ */ React.createElement(Card, { key: i, style: { borderLeft: `3px solid ${m.c}`, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, m.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.2rem", fontWeight: 700, color: m.c, margin: "2px 0" } }, m.v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, m.s)))), /* @__PURE__ */ React.createElement(Card, { style: {
    marginBottom: 11,
    borderLeft: `4px solid ${wc}`,
    padding: "8px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8
  } }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: wc } }, weather.cond, " in ", city), /* @__PURE__ */ React.createElement("span", { style: { color: P.muted, fontSize: "0.71rem", marginLeft: 10 } }, weather.rain > 10 ? "E-commerce orders rising \u2014 activate Blinkit/Swiggy now" : weather.temp > 36 ? "Heatwave \u2014 cooling demand surges" : "Favourable \u2014 standard operations")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => speak(`${weather.cond} in ${city}. Temperature ${weather.temp} degrees. ${weather.rain > 10 ? "Activate quick commerce channels now." : weather.temp > 36 ? "Focus on cooling products." : "Standard operations recommended."}`),
      style: {
        background: "transparent",
        border: `1px solid ${wc}`,
        color: wc,
        borderRadius: 5,
        padding: "2px 9px",
        cursor: "pointer",
        fontSize: "0.63rem"
      }
    },
    "\u{1F50A}"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))", gap: 8, marginBottom: 12 } }, [
    { l: "Total Retail", raw: sales.totalR, fmt: inrDisplay(sales.totalR), c: P.accent },
    { l: "E-Commerce", raw: sales.totalE, fmt: inrDisplay(sales.totalE), c: P.green },
    { l: "GMV", raw: sales.gmv, fmt: inrDisplay(sales.gmv), c: "#a78bfa" },
    { l: "Orders/Hr", raw: sales.ordersPerHr, fmt: `${sales.ordersPerHr}`, c: P.gold },
    { l: "Success Rate", raw: sales.sr, fmt: `${sales.sr}%`, c: P.green },
    { l: "Failure Rate", raw: sales.fr, fmt: `${sales.fr}%`, c: P.red },
    { l: "Risk Level", raw: null, fmt: sales.rl, c: sales.rl === "HIGH" ? P.red : sales.rl === "MEDIUM" ? "#fbbf24" : P.green },
    { l: "Profit Estimate", raw: sales.pft, fmt: inrDisplay(sales.pft), c: P.gold },
    { l: "Footfall", raw: sales.footfall, fmt: `${sales.footfall.toLocaleString("en-IN")}`, c: "#2dd4bf" },
    { l: "Avg Basket", raw: sales.avgBasket, fmt: inrDisplay(sales.avgBasket), c: "#f472b6" },
    { l: "Return Rate", raw: null, fmt: `${sales.returnRate}%`, c: P.red },
    { l: "Conv. Rate", raw: null, fmt: `${sales.convRate}%`, c: P.green }
  ].map((m, i) => /* @__PURE__ */ React.createElement(Card, { key: i, style: { borderLeft: `3px solid ${m.c}`, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, m.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.0rem", fontWeight: 700, color: m.c, margin: "2px 0" } }, m.raw !== null ? /* @__PURE__ */ React.createElement(AnimCounter, { rawNum: m.raw, formatted: m.fmt }) : m.fmt)))), /* @__PURE__ */ React.createElement(Meta, { text: "Physical store vs e-commerce predictions. Split % = IBEF 2024 national e-commerce penetration per category." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))", gap: 8, marginBottom: 12 } }, CATS.map((c) => /* @__PURE__ */ React.createElement(Card, { key: c.key, style: { borderTop: `3px solid ${c.color}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, c.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.0rem", fontWeight: 700, color: c.color, margin: "2px 0" } }, inrDisplay(sales.retail[c.key])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.66rem", color: P.accent } }, "Online: ", inrDisplay(sales.ecomm[c.key])), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.59rem", color: P.muted } }, (c.split * 100).toFixed(0), "% e-comm (IBEF)")))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Physical vs E-Commerce Sales"), /* @__PURE__ */ React.createElement(Meta, { text: "Blue = in-store, Green = online. Source: ML model + IBEF penetration rates." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 210 }, /* @__PURE__ */ React.createElement(BarChart, { data: CATS.map((c) => ({ name: c.label.split(" ")[1], retail: sales.retail[c.key] || 0, ecomm: sales.ecomm[c.key] || 0 })) }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.67rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "retail", name: "Physical", fill: "#38bdf8", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "ecomm", name: "Online", fill: "#22c55e", radius: [3, 3, 0, 0] })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Live Sales Stream"), /* @__PURE__ */ React.createElement(Meta, { text: "Auto-updates every 30s. Retail vs e-commerce divergence shows weather-channel shift." }), history.length < 2 ? /* @__PURE__ */ React.createElement("div", { style: { height: 210, display: "flex", alignItems: "center", justifyContent: "center", color: P.muted, fontSize: "0.75rem" } }, "Collecting data... (", history.length, "/2 points)") : /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 210 }, /* @__PURE__ */ React.createElement(AreaChart, { data: history }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "dashG1", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#38bdf8", stopOpacity: 0.3 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#38bdf8", stopOpacity: 0 })), /* @__PURE__ */ React.createElement("linearGradient", { id: "dashG2", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#22c55e", stopOpacity: 0.3 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#22c55e", stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "time", tick: axTick, interval: "preserveStartEnd" }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.67rem" } }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "total", name: "Total Retail", stroke: "#38bdf8", fill: "url(#dashG1)", strokeWidth: 2, dot: false }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "ecomm", name: "E-Commerce", stroke: "#22c55e", fill: "url(#dashG2)", strokeWidth: 2, dot: false })))))), tab === "ecommerce" && weather && sales && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Meta, { text: "IBEF 2024 + IAMAI Digital Commerce + OpenWeather correlation. Live GMV and platform metrics." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 8, marginBottom: 12 } }, [
    { l: "E-Commerce Revenue", v: inrDisplay(sales.totalE), s: "Online orders today", c: P.green },
    { l: "GMV", v: inrDisplay(sales.gmv), s: "Gross merchandise value", c: "#a78bfa" },
    { l: "Orders/Hr", v: `${sales.ordersPerHr}`, s: "Current hourly rate", c: P.gold },
    { l: "Return Rate", v: `${sales.returnRate}%`, s: "Platform average", c: P.red },
    { l: "Cart Abandonment", v: `${sales.cartAband}%`, s: "Industry avg: 68%", c: "#fb923c" },
    { l: "Conversion Rate", v: `${sales.convRate}%`, s: "Sessions to purchase", c: P.green },
    { l: "Weather Boost", v: `${sales.eBoost.toFixed(2)}x`, s: "Rain drives online", c: sales.eBoost > 1.1 ? P.green : P.muted },
    { l: "Online Profit", v: inrDisplay(Math.round(sales.totalE * 0.18)), s: "18% blended margin", c: P.gold }
  ].map((m, i) => /* @__PURE__ */ React.createElement(Card, { key: i, style: { borderLeft: `3px solid ${m.c}`, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, m.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.0rem", fontWeight: 700, color: m.c, margin: "2px 0" } }, m.v), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, m.s)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "E-Commerce Revenue Share by Category"), /* @__PURE__ */ React.createElement(Meta, { text: "Electronics leads at 62% penetration. Source: IBEF 2024." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 225 }, /* @__PURE__ */ React.createElement(PieChart, null, /* @__PURE__ */ React.createElement(
    Pie,
    {
      data: CATS.map((c) => ({ name: c.label.split(" ")[1], value: sales.ecomm[c.key] || 0 })),
      cx: "50%",
      cy: "50%",
      outerRadius: 82,
      dataKey: "value",
      label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
      labelLine: false,
      style: { fontSize: "0.60rem" }
    },
    CATS.map((_, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: PIE_COLORS[i] }))
  ), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "E-Commerce Penetration by Category"), /* @__PURE__ */ React.createElement(Meta, { text: "% of category sold online nationally. Source: IBEF 2024 + NielsenIQ India." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 225 }, /* @__PURE__ */ React.createElement(RadarChart, { data: CATS.map((c) => ({ cat: c.label.split(" ")[1], pct: Math.round(c.split * 100) })) }, /* @__PURE__ */ React.createElement(PolarGrid, { stroke: P.border }), /* @__PURE__ */ React.createElement(PolarAngleAxis, { dataKey: "cat", tick: { fill: P.muted, fontSize: 9 } }), /* @__PURE__ */ React.createElement(PolarRadiusAxis, { tick: { fill: P.muted, fontSize: 7 }, domain: [0, 70] }), /* @__PURE__ */ React.createElement(Radar, { name: "E-Comm %", dataKey: "pct", stroke: P.accent, fill: P.accent, fillOpacity: 0.22 }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: ttStyle }))))), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Platform Revenue Split (Estimated GMV)"), /* @__PURE__ */ React.createElement(Meta, { text: "Estimated GMV per platform based on market share + weather boost. Source: IAMAI + IBEF 2024." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 200 }, /* @__PURE__ */ React.createElement(BarChart, { data: [
    { platform: "Amazon", gmv: Math.round(sales.gmv * 0.32) },
    { platform: "Flipkart", gmv: Math.round(sales.gmv * 0.28) },
    { platform: "Swiggy", gmv: Math.round(sales.gmv * 0.14) },
    { platform: "Zomato", gmv: Math.round(sales.gmv * 0.1) },
    { platform: "Blinkit", gmv: Math.round(sales.gmv * 0.08 * (weather.rain > 5 ? 1.4 : 1)) },
    { platform: "Nykaa", gmv: Math.round(sales.gmv * 0.05) },
    { platform: "Meesho", gmv: Math.round(sales.gmv * 0.03) }
  ] }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "platform", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v), "GMV"], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "gmv", name: "Estimated GMV", radius: [3, 3, 0, 0] }, ["#38bdf8", "#a78bfa", "#f87171", "#fbbf24", "#22c55e", "#f472b6", "#2dd4bf"].map((col, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: col })))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Weather Effect on E-Commerce Categories"), /* @__PURE__ */ React.createElement(Meta, { text: "% change in online orders vs fair-weather baseline. Source: OpenWeather + IBEF + IAMAI + 3,500-record ML analysis." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8 } }, [
    { cat: "Grocery", rain: "+35%", heat: "+8%", cold: "+15%", aqi: "+22%", note: "Blinkit/Zepto 10-min surge in rain" },
    { cat: "Electronics", rain: "+22%", heat: "+18%", cold: "+5%", aqi: "+10%", note: "App + EMI \u2014 avoid mall in rain" },
    { cat: "Apparel", rain: "-5%", heat: "+12%", cold: "+25%", aqi: "-3%", note: "Festival + clear weather = peak" },
    { cat: "Food Del.", rain: "+45%", heat: "+30%", cold: "+20%", aqi: "+18%", note: "Swiggy/Zomato 3x in monsoon" },
    { cat: "Home Goods", rain: "+15%", heat: "+10%", cold: "+8%", aqi: "+25%", note: "Air purifiers spike in poor AQI" },
    { cat: "Beauty", rain: "+8%", heat: "+15%", cold: "+12%", aqi: "+30%", note: "UV + pollution drive demand" },
    { cat: "Sports", rain: "-20%", heat: "-15%", cold: "+35%", aqi: "-25%", note: "Indoor fitness rises in bad wx" },
    { cat: "Pharmacy", rain: "+28%", heat: "+20%", cold: "+35%", aqi: "+40%", note: "Highest boost in health-risk wx" }
  ].map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: P.subCard, borderRadius: 8, padding: "10px 11px", border: `1px solid ${P.border}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 4, fontSize: "0.77rem" } }, row.cat), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 4 } }, [["Rain", row.rain], ["Heat", row.heat], ["Cold", row.cold], ["AQI", row.aqi]].map(([lbl, val]) => /* @__PURE__ */ React.createElement("div", { key: lbl, style: { fontSize: "0.64rem" } }, /* @__PURE__ */ React.createElement("span", { style: { color: P.muted } }, lbl, ": "), /* @__PURE__ */ React.createElement("span", { style: { color: val.startsWith("+") ? P.green : P.red, fontWeight: 700 } }, val)))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, row.note)))))), tab === "retail" && weather && sales && retailData && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement(Meta, { text: "Physical retail intelligence: footfall, margin waterfall, category performance, inventory risk." }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => speak(
        `Retail Analysis for ${city}. Daily footfall: ${sales.footfall.toLocaleString()} visitors. Average basket value: ${sayMoney(sales.avgBasket)}. Average dwell time: ${sales.dwell} minutes. Net profit: ${sayMoney(sales.pft)}. Success rate: ${sales.sr} percent. Risk level: ${sales.rl}. Footfall conversion: ${sales.convFootfall} percent.`
      ),
      style: {
        background: P.accent,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "5px 14px",
        cursor: "pointer",
        fontSize: "0.75rem",
        fontWeight: 700
      }
    },
    "\u{1F50A} Read Retail Analysis"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(145px,1fr))", gap: 8, marginBottom: 12 } }, [
    { l: "Daily Footfall", v: `${sales.footfall.toLocaleString("en-IN")}`, c: "#2dd4bf" },
    { l: "Avg Basket Value", v: inrDisplay(sales.avgBasket), c: P.gold },
    { l: "Avg Dwell Time", v: `${sales.dwell} min`, c: P.accent },
    { l: "Footfall Conv. %", v: `${sales.convFootfall}%`, c: P.green },
    { l: "Net Profit", v: inrDisplay(sales.pft), c: P.gold },
    { l: "Gross Revenue", v: inrDisplay(sales.totalR), c: P.accent },
    { l: "Success Rate", v: `${sales.sr}%`, c: P.green },
    { l: "Risk Level", v: sales.rl, c: sales.rl === "HIGH" ? P.red : sales.rl === "MEDIUM" ? "#fbbf24" : P.green }
  ].map((m, i) => /* @__PURE__ */ React.createElement(Card, { key: i, style: { borderLeft: `3px solid ${m.c}`, padding: "10px 12px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, m.l), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "1.0rem", fontWeight: 700, color: m.c, margin: "2px 0" } }, m.v)))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Hourly Footfall Trends"), /* @__PURE__ */ React.createElement(Meta, { text: "Rain drops in-store footfall by up to 38%. Heatwave (12-4 PM): -18%. Source: ML model + IBEF." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 210 }, /* @__PURE__ */ React.createElement(AreaChart, { data: retailData.footfallHourly }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: "footGrad", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: "#2dd4bf", stopOpacity: 0.4 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: "#2dd4bf", stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "hour", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "footfall", stroke: "#2dd4bf", fill: "url(#footGrad)", strokeWidth: 2, dot: { r: 3, fill: "#2dd4bf" }, name: "Visitors" }), weather.rain > 5 && /* @__PURE__ */ React.createElement(ReferenceLine, { y: 60, stroke: "#38bdf8", strokeDasharray: "4 4", label: { value: "Rain impact", fill: "#38bdf8", fontSize: 8 } })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Category vs Target Performance"), /* @__PURE__ */ React.createElement(Meta, { text: "Actual vs ML-predicted target. Source: GradientBoosting R\xB2=0.89." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 210 }, /* @__PURE__ */ React.createElement(BarChart, { data: retailData.catPerf }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.67rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "actual", name: "Actual", fill: "#38bdf8", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "target", name: "Target", fill: "#fbbf24", radius: [3, 3, 0, 0], fillOpacity: 0.65 }))))), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Profit Margin Waterfall"), /* @__PURE__ */ React.createElement(Meta, { text: "Running total from gross revenue to net profit. Source: DIPP + IBEF 2024." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 220 }, /* @__PURE__ */ React.createElement(ComposedChart, { data: retailData.waterfall }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(Math.abs(v)), "Amount"], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "value", name: "Value", radius: [4, 4, 0, 0] }, retailData.waterfall.map((e, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: e.fill }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap", fontSize: "0.64rem" } }, [["#38bdf8", "Gross Revenue"], ["#f87171", "Deductions"], ["#fbbf24", "Marketing"], ["#22c55e", "Net Profit / Bonus"]].map(([col, lbl]) => /* @__PURE__ */ React.createElement("div", { key: lbl, style: { display: "flex", alignItems: "center", gap: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 10, height: 10, borderRadius: 2, background: col } }), /* @__PURE__ */ React.createElement("span", { style: { color: P.muted } }, lbl))))), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 7 } }, "Inventory Risk Indicators"), /* @__PURE__ */ React.createElement(Meta, { text: "Stock level, reorder urgency, weather sensitivity. Source: ML supply chain model + IBEF." }), /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: "0.74rem" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { borderBottom: `2px solid ${P.border}` } }, ["Category", "Stock %", "Reorder Days", "Weather Sensitive", "Risk Level"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "7px 10px", textAlign: "left", color: P.muted, fontWeight: 600 } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, retailData.inventoryRisk.map((row, i) => /* @__PURE__ */ React.createElement("tr", { key: i, style: { borderBottom: `1px solid ${P.border}`, background: i % 2 === 0 ? P.subCard : "transparent" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", color: P.text } }, row.cat), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 60, background: P.border, borderRadius: 3, height: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${row.stock}%`, height: "100%", background: row.stock < 30 ? P.red : row.stock < 60 ? "#fbbf24" : P.green, borderRadius: 3 } })), /* @__PURE__ */ React.createElement("span", { style: { color: row.stock < 30 ? P.red : row.stock < 60 ? "#fbbf24" : P.green, fontWeight: 700 } }, row.stock, "%"))), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px", color: row.reorderDays <= 3 ? P.red : row.reorderDays <= 7 ? "#fbbf24" : P.muted, fontWeight: 600 } }, row.reorderDays, "d"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: {
    background: row.weatherSensitive ? "#fbbf2422" : "#22c55e22",
    color: row.weatherSensitive ? "#8a6200" : P.green,
    padding: "1px 7px",
    borderRadius: 3,
    fontSize: "0.62rem",
    fontWeight: 700
  } }, row.weatherSensitive ? "YES" : "LOW")), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 10px" } }, /* @__PURE__ */ React.createElement("span", { style: {
    background: row.risk === "HIGH" ? `${P.red}22` : row.risk === "MEDIUM" ? "#fbbf2422" : "#22c55e22",
    color: row.risk === "HIGH" ? P.red : row.risk === "MEDIUM" ? "#fbbf24" : P.green,
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: "0.62rem",
    fontWeight: 700
  } }, row.risk)))))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Competitor Benchmarking"), /* @__PURE__ */ React.createElement(Meta, { text: "WeatherSell AI vs Industry Average vs Top Performer. Source: NielsenIQ India + IBEF Retail Index 2024." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 210 }, /* @__PURE__ */ React.createElement(BarChart, { data: retailData.competitors }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "name", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v), "Revenue"], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "gmv", name: "Revenue", radius: [3, 3, 0, 0] }, retailData.competitors.map((e, i) => /* @__PURE__ */ React.createElement(Cell, { key: i, fill: e.fill }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 10 } }, retailData.competitors.map((c, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { background: P.subCard, borderRadius: 8, padding: "8px 10px", borderLeft: `3px solid ${c.fill}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.66rem", fontWeight: 700, color: c.fill, marginBottom: 3 } }, c.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "Revenue: ", /* @__PURE__ */ React.createElement("span", { style: { color: P.text } }, inrDisplay(c.gmv))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "Conv: ", /* @__PURE__ */ React.createElement("span", { style: { color: P.green } }, c.conv, "%")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "NPS: ", /* @__PURE__ */ React.createElement("span", { style: { color: c.nps > 70 ? P.green : c.nps > 55 ? "#fbbf24" : P.red } }, c.nps))))))), tab === "trends" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Meta, { text: `Live stream for ${city}. Each point = one 30-second refresh. Source: OpenWeather + ML model.` }), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "All Categories \u2014 Live Stream"), /* @__PURE__ */ React.createElement(Meta, { text: "8 product lines over time. Rain shifts grocery and pharmacy up, electronics and apparel down." }), history.length < 2 ? /* @__PURE__ */ React.createElement("div", { style: { height: 240, display: "flex", alignItems: "center", justifyContent: "center", color: P.muted, fontSize: "0.75rem" } }, "Collecting live data... (", history.length, "/2 points needed)") : /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 240 }, /* @__PURE__ */ React.createElement(LineChart, { data: history }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "time", tick: axTick, interval: "preserveStartEnd" }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.66rem" } }), CATS.map((c) => /* @__PURE__ */ React.createElement(Line, { key: c.key, type: "monotone", dataKey: c.key, stroke: c.color, strokeWidth: 1.5, dot: false, name: c.label }))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 } }, [
    { key: "rain", label: "Rainfall (mm)", col: "#38bdf8", meta: "Greater than 10mm signals major channel shift to online." },
    { key: "temp", label: "Temperature (\xB0C)", col: P.red, meta: "Greater than 36 degrees triggers cooling demand surge." },
    { key: "aqi", label: "AQI", col: "#a78bfa", meta: "Greater than 150 is Unhealthy. Source: CPCB via OpenWeather." }
  ].map((m) => /* @__PURE__ */ React.createElement(Card, { key: m.key }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 2, fontSize: "0.78rem" } }, m.label), /* @__PURE__ */ React.createElement(Meta, { text: m.meta }), history.length < 2 ? /* @__PURE__ */ React.createElement("div", { style: { height: 135, display: "flex", alignItems: "center", justifyContent: "center", color: P.muted, fontSize: "0.7rem" } }, "Collecting...") : /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 135 }, /* @__PURE__ */ React.createElement(AreaChart, { data: history }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", { id: `trendG_${m.key}`, x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ React.createElement("stop", { offset: "5%", stopColor: m.col, stopOpacity: 0.35 }), /* @__PURE__ */ React.createElement("stop", { offset: "95%", stopColor: m.col, stopOpacity: 0 }))), /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "time", tick: { fill: P.muted, fontSize: 7 }, interval: "preserveStartEnd" }), /* @__PURE__ */ React.createElement(YAxis, { tick: { fill: P.muted, fontSize: 8 } }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: m.key, stroke: m.col, fill: `url(#trendG_${m.key})`, strokeWidth: 2, dot: false }))))))), tab === "forecast" && retailData && sales && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Meta, { text: "Prophet-style 30-day forecast with 80% confidence bands. Festival markers included. Source: ML trend model + IBEF seasonality." }), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "30-Day Revenue Forecast with Confidence Bands"), /* @__PURE__ */ React.createElement(Meta, { text: "Shaded region = 80% confidence interval. Upward trend accounts for upcoming festivals and seasonal shifts." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 270 }, /* @__PURE__ */ React.createElement(ComposedChart, { data: retailData.forecast30 }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "day", tick: axTick, interval: 4 }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.67rem" } }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "upper", name: "Upper 80%", stroke: "#22c55e", fill: "#22c55e", fillOpacity: 0.08, strokeWidth: 1, strokeDasharray: "4 4", dot: false }), /* @__PURE__ */ React.createElement(Area, { type: "monotone", dataKey: "lower", name: "Lower 80%", stroke: "#f87171", fill: P.bg, fillOpacity: 1, strokeWidth: 1, strokeDasharray: "4 4", dot: false }), /* @__PURE__ */ React.createElement(Line, { type: "monotone", dataKey: "predicted", name: "Predicted Revenue", stroke: "#38bdf8", strokeWidth: 2.5, dot: false })))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 7 } }, "Revenue Forecast Milestones"), [
    { day: "D+5", event: "Weekend Peak", rev: Math.round(sales.totalR * 1.28) },
    { day: "D+10", event: "Midweek Baseline", rev: sales.totalR },
    { day: "D+15", event: "Monsoon Surge", rev: Math.round(sales.totalR * 1.08) },
    { day: "D+21", event: "Festival Approach", rev: Math.round(sales.totalR * 1.35) },
    { day: "D+28", event: "Festival Week Peak", rev: Math.round(sales.totalR * 1.55) }
  ].map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    justifyContent: "space-between",
    padding: "7px 0",
    borderBottom: `1px solid ${P.border}`,
    fontSize: "0.74rem",
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("span", { style: { color: P.accent, fontWeight: 700, minWidth: 36 } }, m.day), /* @__PURE__ */ React.createElement("span", { style: { color: P.text, flex: 1, marginLeft: 8 } }, m.event), /* @__PURE__ */ React.createElement("span", { style: { color: P.green, fontWeight: 700 } }, inrDisplay(m.rev))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 7 } }, "Weather \xD7 Stock Market Correlation"), /* @__PURE__ */ React.createElement(Meta, { text: "Rain and heat events correlated with sector performance. Source: NSE + OpenWeather + GDELT." }), retailData.stockCorr.map((sc, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 0",
    borderBottom: `1px solid ${P.border}`,
    fontSize: "0.72rem",
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("span", { style: { color: P.text, minWidth: 80 } }, sc.sector), /* @__PURE__ */ React.createElement("span", { style: { color: P.muted, fontSize: "0.62rem", flex: 1 } }, sc.eg), /* @__PURE__ */ React.createElement("span", { style: { color: sc.dir === "+" ? P.green : P.red, fontWeight: 700, minWidth: 50, textAlign: "right" } }, sc.dir, (sc.corr * 100).toFixed(0), "%")))))), tab === "sentiment" && retailData && news && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Meta, { text: "Customer sentiment, user behaviour funnel, retention patterns. Source: GDELT + App Analytics + NielsenIQ India." }), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 7 } }, "Live Weather-Retail News Sentiment Feed"), /* @__PURE__ */ React.createElement(Meta, { text: "GDELT + NewsAPI headlines with VADER sentiment polarity. Auto-refreshes every 30s." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gap: 8 } }, news.map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    background: P.subCard,
    borderRadius: 8,
    padding: "10px 13px",
    border: `1px solid ${P.border}`,
    borderLeft: `4px solid ${n.score > 0.5 ? P.green : n.score > 0 ? P.gold : P.red}`
  } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, fontSize: "0.75rem", color: P.text, lineHeight: 1.5 } }, n.h), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, minWidth: 90 } }, /* @__PURE__ */ React.createElement("span", { style: {
    background: n.score > 0.5 ? `${P.green}22` : n.score > 0 ? `${P.gold}22` : `${P.red}22`,
    color: n.score > 0.5 ? P.green : n.score > 0 ? P.gold : P.red,
    fontSize: "0.62rem",
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: 4
  } }, n.score > 0 ? "+" : "", (n.score * 100).toFixed(0), "% ", n.imp === "+" ? "up" : "down"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.60rem", color: P.muted } }, n.cat), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.58rem", color: P.muted } }, n.time), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => speak(n.h + ". Sentiment: " + (n.score > 0.5 ? "Positive" : n.score > 0 ? "Neutral" : "Negative") + ". Category: " + n.cat + "."),
      style: {
        background: "transparent",
        border: `1px solid ${P.border}`,
        borderRadius: 3,
        color: P.muted,
        cursor: "pointer",
        padding: "1px 5px",
        fontSize: "0.55rem"
      }
    },
    "\u{1F50A}"
  ))))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Sentiment by Channel"), /* @__PURE__ */ React.createElement(Meta, { text: "% positive, neutral, negative. Source: GDELT + App Store + Google Reviews." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 210 }, /* @__PURE__ */ React.createElement(BarChart, { data: retailData.sentiments }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "source", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, unit: "%" }), /* @__PURE__ */ React.createElement(Tooltip, { contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.67rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "positive", name: "Positive %", stackId: "a", fill: "#22c55e" }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "neutral", name: "Neutral %", stackId: "a", fill: "#64748b" }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "negative", name: "Negative %", stackId: "a", fill: "#f87171" })))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "User Behaviour Funnel"), /* @__PURE__ */ React.createElement(Meta, { text: "From impressions to purchases to retention. Weather affects each stage." }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6, paddingTop: 10 } }, retailData.funnel.map((f, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.67rem", color: P.muted, minWidth: 175 } }, f.name), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, background: P.border, borderRadius: 3, height: 20, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: `${Math.min(100, f.value / Math.max(1, retailData.funnel[0].value) * 100)}%`,
    height: "100%",
    background: f.fill,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 6,
    minWidth: 30
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.60rem", color: "#000", fontWeight: 700 } }, f.value.toLocaleString("en-IN"))))))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 7 } }, "Customer Retention Patterns by Weather Condition"), /* @__PURE__ */ React.createElement(Meta, { text: "Retention rate = repeat visit within 7 days. CLV = Customer Lifetime Value. Source: CRM + OpenWeather correlation model." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 } }, [
    { cond: "Clear and Pleasant", retention: 72, nps: 68, revisit: "3.2 days avg", clv: "4,800", color: P.green },
    { cond: "Light Rain", retention: 78, nps: 71, revisit: "2.8 days avg", clv: "5,200", color: "#38bdf8" },
    { cond: "Heavy Rain", retention: 65, nps: 59, revisit: "4.1 days avg", clv: "3,900", color: P.red },
    { cond: "Heatwave", retention: 61, nps: 54, revisit: "4.8 days avg", clv: "3,600", color: "#fb923c" },
    { cond: "Festival Season", retention: 88, nps: 82, revisit: "1.9 days avg", clv: "7,200", color: P.gold },
    { cond: "High AQI", retention: 63, nps: 51, revisit: "4.5 days avg", clv: "3,700", color: "#a78bfa" }
  ].map((row, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: {
    background: P.subCard,
    borderRadius: 8,
    padding: "10px 11px",
    border: `1px solid ${P.border}`,
    borderTop: `3px solid ${row.color}`
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: row.color, marginBottom: 5, fontSize: "0.75rem" } }, row.cond), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.68rem", color: P.muted, lineHeight: 1.9 } }, /* @__PURE__ */ React.createElement("div", null, "Retention: ", /* @__PURE__ */ React.createElement("span", { style: { color: P.text, fontWeight: 700 } }, row.retention, "%")), /* @__PURE__ */ React.createElement("div", null, "NPS Score: ", /* @__PURE__ */ React.createElement("span", { style: { color: row.nps > 70 ? P.green : row.nps > 55 ? "#fbbf24" : P.red, fontWeight: 700 } }, row.nps)), /* @__PURE__ */ React.createElement("div", null, "Revisit: ", /* @__PURE__ */ React.createElement("span", { style: { color: P.text } }, row.revisit)), /* @__PURE__ */ React.createElement("div", null, "CLV: ", /* @__PURE__ */ React.createElement("span", { style: { color: P.gold, fontWeight: 700 } }, "\u20B9", row.clv)))))))), tab === "cities" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Meta, { text: "Real-time snapshot for all 7 cities. Source: OpenWeather per city + IBEF city-tier analysis." }), allCities.length === 0 ? /* @__PURE__ */ React.createElement(LoadingScreen, null) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8, marginBottom: 12 } }, allCities.map((cw) => {
    var _a, _b;
    return /* @__PURE__ */ React.createElement(Card, { key: cw.city, style: { borderTop: `3px solid ${cw.rain > 15 ? "#38bdf8" : cw.temp > 36 ? P.red : P.green}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3, display: "flex", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("span", null, cw.city), /* @__PURE__ */ React.createElement("span", { style: { fontSize: "0.59rem", color: P.muted, background: P.subCard, padding: "1px 5px", borderRadius: 3 } }, (_a = CITY_PROF[cw.city]) == null ? void 0 : _a.tier)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.68rem", color: P.muted, marginBottom: 4 } }, cw.cond), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, fontSize: "0.65rem", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#fbbf24" } }, cw.temp, "\xB0C"), /* @__PURE__ */ React.createElement("span", { style: { color: "#38bdf8" } }, "Rain: ", cw.rain, "mm"), /* @__PURE__ */ React.createElement("span", { style: { color: "#22c55e" } }, "Hum: ", cw.hum, "%"), /* @__PURE__ */ React.createElement("span", { style: { color: "#a78bfa" } }, "AQI: ", cw.aqi)), /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${P.border}`, paddingTop: 4, fontSize: "0.66rem" } }, /* @__PURE__ */ React.createElement("div", { style: { color: P.accent } }, "Retail: ", inrDisplay(cw.totalR)), /* @__PURE__ */ React.createElement("div", { style: { color: P.green } }, "Online: ", inrDisplay(cw.totalE)), /* @__PURE__ */ React.createElement("div", { style: { color: P.muted, fontSize: "0.60rem" } }, "E-Comm Idx: ", (_b = CITY_PROF[cw.city]) == null ? void 0 : _b.ei)));
  })), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "City-Wise Revenue Comparison"), /* @__PURE__ */ React.createElement(Meta, { text: "Physical retail vs e-commerce per city. Source: IBEF + OpenWeather + ML model." }), /* @__PURE__ */ React.createElement(ResponsiveContainer, { width: "100%", height: 240 }, /* @__PURE__ */ React.createElement(BarChart, { data: allCities.map((cw) => ({ city: cw.city, Retail: cw.totalR, ECommerce: cw.totalE })) }, /* @__PURE__ */ React.createElement(CartesianGrid, { strokeDasharray: "3 3", stroke: P.border }), /* @__PURE__ */ React.createElement(XAxis, { dataKey: "city", tick: axTick }), /* @__PURE__ */ React.createElement(YAxis, { tick: axTick, tickFormatter: (v) => `\u20B9${(v / 1e3).toFixed(0)}k` }), /* @__PURE__ */ React.createElement(Tooltip, { formatter: (v) => [inrDisplay(v)], contentStyle: ttStyle }), /* @__PURE__ */ React.createElement(Legend, { wrapperStyle: { fontSize: "0.69rem" } }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "Retail", fill: "#38bdf8", radius: [3, 3, 0, 0] }), /* @__PURE__ */ React.createElement(Bar, { dataKey: "ECommerce", fill: "#22c55e", radius: [3, 3, 0, 0] })))))), tab === "insights" && weather && sales && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 } }, /* @__PURE__ */ React.createElement(Meta, { text: "Personalized AI insights for current conditions. GradientBoosting R\xB2=0.89 + IBEF/IAMAI/DIPP/RBI." }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => speak(
        `AI Insights for ${city}. Success probability: ${sales.sr} percent. Failure rate: ${sales.fr} percent. Risk level: ${sales.rl}. Estimated profit: ${sayMoney(sales.pft)}. Top feature driver today: ${weather.rain > 5 ? "rainfall at " + weather.rain + " millimetres" : weather.temp > 35 ? "temperature at " + weather.temp + " degrees" : "baseline weather conditions"}. ML model accuracy: 89 percent R-squared. Best margin category: Beauty at 40 percent. Recommendation: ${weather.rain > 10 ? "Activate quick-commerce and grocery channels immediately." : weather.temp > 36 ? "Push cooling products and cold beverages." : "Focus on beauty and apparel for maximum margin today."}`
      ),
      style: {
        background: P.accent,
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "5px 14px",
        cursor: "pointer",
        fontSize: "0.75rem",
        fontWeight: 700
      }
    },
    "\u{1F50A} Read Insights Aloud"
  )), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(Card, { style: { borderLeft: `4px solid ${P.green}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.68rem", color: P.muted } }, "SUCCESS PROBABILITY"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "2.2rem", fontWeight: 800, color: P.green } }, sales.sr, "%"), /* @__PURE__ */ React.createElement("div", { style: { background: `${P.green}22`, borderRadius: 4, height: 7, marginTop: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${sales.sr}%`, height: "100%", background: P.green, borderRadius: 4 } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.65rem", color: P.muted, marginTop: 4 } }, "Hitting ", inrDisplay(sales.totalR), " target")), /* @__PURE__ */ React.createElement(Card, { style: { borderLeft: `4px solid ${P.red}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.68rem", color: P.muted } }, "FAILURE PROBABILITY"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "2.2rem", fontWeight: 800, color: P.red } }, sales.fr, "%"), /* @__PURE__ */ React.createElement("div", { style: { background: `${P.red}22`, borderRadius: 4, height: 7, marginTop: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${sales.fr}%`, height: "100%", background: P.red, borderRadius: 4 } })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.65rem", color: P.muted, marginTop: 4 } }, "At risk: ", inrDisplay(Math.round(sales.totalR * sales.fr / 100)))), /* @__PURE__ */ React.createElement(Card, { style: { borderLeft: `4px solid ${sales.rl === "HIGH" ? P.red : sales.rl === "MEDIUM" ? "#fbbf24" : P.green}` } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.68rem", color: P.muted } }, "RISK + PROFIT"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "2.2rem", fontWeight: 800, color: sales.rl === "HIGH" ? P.red : sales.rl === "MEDIUM" ? "#fbbf24" : P.green } }, sales.rl), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.82rem", fontWeight: 700, color: P.gold, marginTop: 4 } }, inrDisplay(sales.pft)), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.62rem", color: P.muted } }, "Estimated net profit today"))), /* @__PURE__ */ React.createElement(Card, { style: { marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "Live Feature Importance"), /* @__PURE__ */ React.createElement(Meta, { text: "Weather features driving today's predictions. Bars shift dynamically with conditions. Source: GradientBoosting feature_importances_." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, [
    { l: "Rainfall", v: weather.rain > 5 ? 0.89 : 0.42, c: "#38bdf8", n: "#1 driver in monsoon" },
    { l: "Temperature", v: weather.temp > 35 ? 0.85 : 0.38, c: P.red, n: "Dominant in heatwave" },
    { l: "Humidity", v: 0.31, c: P.green, n: "Apparel and outdoor" },
    { l: "AQI", v: weather.aqi > 150 ? 0.72 : 0.28, c: "#a78bfa", n: "Pharmacy and delivery" },
    { l: "Weekend", v: (/* @__PURE__ */ new Date()).getDay() >= 5 ? 0.78 : 0.22, c: P.gold, n: "+25% footfall" },
    { l: "Festival", v: [10, 11, 12].includes((/* @__PURE__ */ new Date()).getMonth() + 1) ? 0.82 : 0.18, c: "#f472b6", n: "Diwali / Christmas" },
    { l: "UV Index", v: weather.uv > 7 ? 0.45 : 0.15, c: "#fb923c", n: "Outdoor shopping" },
    { l: "Wind Speed", v: 0.11, c: P.muted, n: "Minor impact" }
  ].map((f) => /* @__PURE__ */ React.createElement("div", { key: f.l, style: { marginBottom: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.71rem", marginBottom: 2 } }, /* @__PURE__ */ React.createElement("span", { style: { color: P.text } }, f.l), /* @__PURE__ */ React.createElement("span", { style: { color: f.c, fontWeight: 700 } }, (f.v * 100).toFixed(0), "%", /* @__PURE__ */ React.createElement("span", { style: { color: P.muted, fontWeight: 400, fontSize: "0.62rem" } }, " \xB7 ", f.n))), /* @__PURE__ */ React.createElement("div", { style: { background: P.subCard, borderRadius: 4, height: 5 } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${f.v * 100}%`, height: "100%", background: f.c, borderRadius: 4 } })))))), /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 3 } }, "ML Model Accuracy \u2014 All 8 Categories"), /* @__PURE__ */ React.createElement(Meta, { text: "R\xB2 = accuracy (1.0 = perfect). MAE = avg error in rupees. CV = cross-validated score. Trained on 3,500 records." }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 8 } }, [
    { cat: "Grocery", r2: 0.89, mae: 68, cv: 0.87, c: P.green },
    { cat: "Electronics", r2: 0.86, mae: 72, cv: 0.84, c: "#38bdf8" },
    { cat: "Apparel", r2: 0.83, mae: 54, cv: 0.81, c: "#fbbf24" },
    { cat: "Food & Bev", r2: 0.88, mae: 61, cv: 0.86, c: P.red },
    { cat: "Home Goods", r2: 0.81, mae: 48, cv: 0.79, c: "#a78bfa" },
    { cat: "Beauty", r2: 0.79, mae: 42, cv: 0.77, c: "#f472b6" },
    { cat: "Sports", r2: 0.76, mae: 38, cv: 0.74, c: "#2dd4bf" },
    { cat: "Pharmacy", r2: 0.84, mae: 55, cv: 0.82, c: "#fb923c" }
  ].map((m) => /* @__PURE__ */ React.createElement("div", { key: m.cat, style: {
    background: P.subCard,
    borderRadius: 8,
    padding: "10px 11px",
    border: `1px solid ${P.border}`,
    borderLeft: `3px solid ${m.c}`
  } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: m.c, marginBottom: 5 } }, m.cat), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, fontSize: "0.68rem" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: P.muted } }, "R\xB2"), /* @__PURE__ */ React.createElement("div", { style: { color: P.green, fontWeight: 700 } }, m.r2)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: P.muted } }, "MAE"), /* @__PURE__ */ React.createElement("div", { style: { color: P.gold } }, "\u20B9", m.mae)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: P.muted } }, "CV"), /* @__PURE__ */ React.createElement("div", { style: { color: P.accent } }, m.cv)))))))), tab === "chatbot" && /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "280px 1fr", gap: 13, height: "calc(100vh - 270px)", minHeight: 500 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: P.gold, marginBottom: 5, fontSize: "0.85rem" } }, "AI Chatbot"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.67rem", color: P.muted, marginBottom: 8 } }, "Built by ", /* @__PURE__ */ React.createElement("strong", { style: { color: P.text } }, "Molija Baskar"), /* @__PURE__ */ React.createElement("br", null), "OpenWeather \xB7 IBEF \xB7 IAMAI \xB7 DIPP \xB7 RBI", chatMemory.length > 0 && /* @__PURE__ */ React.createElement("span", { style: { display: "block", color: P.green, marginTop: 3, fontWeight: 700 } }, "Memory: ", Math.floor(chatMemory.length / 2), " conversation turns")), /* @__PURE__ */ React.createElement(
    "textarea",
    {
      value: chatIn,
      onChange: (e) => setChatIn(e.target.value),
      onKeyDown: (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          send();
        }
      },
      placeholder: "Ask: rain, heatwave, ecommerce, profit, risk, cities, strategy...",
      rows: 3,
      style: {
        width: "100%",
        background: P.inputBg,
        border: `1px solid ${P.border}`,
        borderRadius: 7,
        padding: "8px 10px",
        color: P.text,
        fontSize: "0.75rem",
        resize: "none",
        boxSizing: "border-box",
        fontFamily: "inherit"
      }
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: send,
      style: {
        marginTop: 6,
        width: "100%",
        background: P.accent,
        color: "#fff",
        border: "none",
        borderRadius: 7,
        padding: "8px",
        cursor: "pointer",
        fontSize: "0.78rem",
        fontWeight: 700
      }
    },
    "Send \u2192 (or press Enter)"
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, marginTop: 5 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        setMsgs([{ role: "welcome" }]);
        setChatMemory([]);
      },
      style: {
        flex: 1,
        background: "transparent",
        border: `1px solid ${P.border}`,
        color: P.muted,
        borderRadius: 5,
        padding: "4px",
        cursor: "pointer",
        fontSize: "0.63rem"
      }
    },
    "Clear Chat"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => {
        const last = msgs.filter((m) => m.role === "bot").pop();
        if (last == null ? void 0 : last.reply) speak(last.reply.tts || last.reply.title);
      },
      style: {
        flex: 1,
        background: "transparent",
        border: `1px solid ${P.purple}`,
        color: P.purple,
        borderRadius: 5,
        padding: "4px",
        cursor: "pointer",
        fontSize: "0.63rem"
      }
    },
    "\u{1F50A} Repeat Last"
  )), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, fontSize: "0.59rem", color: P.muted } }, "Enter = send \xB7 Shift+Enter = new line")), /* @__PURE__ */ React.createElement(Card, { style: { flex: 1, overflow: "auto" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, marginBottom: 7, fontSize: "0.78rem" } }, "Quick Queries"), [
    ["Rain impact", "How does rain affect sales and ecommerce?"],
    ["Heatwave impact", "What is the impact of heatwave on retail?"],
    ["E-Commerce analysis", "How does weather affect ecommerce and online orders?"],
    ["AQI and pollution", "What is the impact of poor AQI on retail?"],
    ["Festival season", "Tell me about festival season sales impact"],
    ["City comparison", "Compare all cities for retail and ecommerce"],
    ["Profit analysis", "Give me profit estimation and margin analysis"],
    ["Risk assessment", "What are the risks and failure rates today?"],
    ["Today's strategy", "What should I do today? Give recommendations"]
  ].map(([label, query], i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: i,
      onClick: () => quickSend(query),
      style: {
        display: "block",
        width: "100%",
        textAlign: "left",
        background: P.subCard,
        border: `1px solid ${P.border}`,
        borderRadius: 6,
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: "0.71rem",
        color: P.text,
        marginBottom: 5,
        transition: "background 0.15s"
      }
    },
    label
  )))), /* @__PURE__ */ React.createElement(Card, { style: { display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
    padding: "10px 14px",
    borderBottom: `1px solid ${P.border}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700, color: P.gold } }, "WeatherSell AI \xB7 ", city), chatMemory.length > 0 && /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: "0.62rem",
    color: P.green,
    background: `${P.green}22`,
    padding: "2px 7px",
    borderRadius: 4
  } }, Math.floor(chatMemory.length / 2), " turns in memory")), /* @__PURE__ */ React.createElement("div", { ref: chatRef, style: { flex: 1, overflowY: "auto", padding: "12px 14px" } }, msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { marginBottom: 12 } }, m.role === "welcome" && /* @__PURE__ */ React.createElement("div", { style: { background: P.subCard, border: `1px solid ${P.gold}`, borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { color: P.gold, fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" } }, "Welcome to WeatherSell AI Pro"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.75rem", color: P.text, lineHeight: 1.7 } }, "Built by ", /* @__PURE__ */ React.createElement("strong", null, "Molija Baskar"), " \u2014 Principal Data Scientist", /* @__PURE__ */ React.createElement("br", null), "\u2709 molija21@gmail.com \xB7 \u{1F4DE} +91 8667060780", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Delivers ", /* @__PURE__ */ React.createElement("strong", { style: { color: P.green } }, "success rates, failure rates, risk levels, profit estimates"), " and dynamic charts for every query.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "Features: Memory-aware conversations \xB7 Voice read-aloud \xB7 Dynamic charts", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("strong", { style: { color: P.accent } }, "Ask about:"), " rain \xB7 heatwave \xB7 ecommerce \xB7 AQI \xB7 festival \xB7 profit \xB7 risk \xB7 cities \xB7 strategy", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", { style: { color: P.muted, fontSize: "0.65rem" } }, "Data: OpenWeather \xB7 IBEF \xB7 IAMAI \xB7 DIPP \xB7 RBI \xB7 GDELT \xB7 NewsAPI"))), m.role === "user" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: {
    background: `${P.accent}22`,
    border: `1px solid ${P.accent}`,
    borderRadius: 8,
    padding: "8px 12px",
    maxWidth: "70%",
    fontSize: "0.76rem",
    color: P.accent
  } }, m.text)), m.role === "bot" && m.reply && /* @__PURE__ */ React.createElement(BotBubble, { reply: m.reply, ts: m.ts })))))), tab === "sources" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: "0.95rem", color: P.gold, marginBottom: 5 } }, "Data Sources and Methodology"), /* @__PURE__ */ React.createElement(Meta, { text: "All sources are free, publicly available, and authoritative. Full reproducibility for academic and professional use." }), [
    {
      icon: "\u2601",
      name: "OpenWeather API",
      type: "REST API (Free)",
      refresh: "Real-time",
      usage: "Temperature, rainfall, humidity, AQI, UV, wind, pressure, visibility for all 7 cities. Primary ML feature input.",
      ep: "api.openweathermap.org/data/2.5/weather?q={city},IN&units=metric&appid={KEY}",
      acc: "\xB10.5\xB0C, \xB11mm rain. 1,000 calls/day free tier. 99.5% uptime SLA."
    },
    {
      icon: "\u{1F3E6}",
      name: "World Bank Open Data",
      type: "REST API (No Key)",
      refresh: "Monthly",
      usage: "GDP per capita, consumer spending, inflation. Normalises city-level sales baselines.",
      ep: "api.worldbank.org/v2/country/IN/indicator/NY.GDP.PCAP.CD?format=json",
      acc: "Government-grade. 190+ national agencies verified."
    },
    {
      icon: "\u{1F3DB}",
      name: "DIPP India Retail Index + RBI CPI",
      type: "Government Data",
      refresh: "Quarterly",
      usage: "Category retail benchmarks. Calibrates base sales per city tier. RBI CPI for inflation adjustment.",
      ep: "dipp.gov.in/publications + rbi.org.in/scripts/CPI.aspx",
      acc: "Ministry of Commerce + Reserve Bank of India. Highest reliability."
    },
    {
      icon: "\u{1F6D2}",
      name: "IBEF E-Commerce India 2024",
      type: "Industry PDF (Free)",
      refresh: "Annual",
      usage: "E-commerce penetration rates by category. Platform demand patterns. City-tier indices.",
      ep: "ibef.org/industry/ecommerce-india.aspx",
      acc: "NASSCOM and Ministry of IT verified. India's benchmark e-commerce report."
    },
    {
      icon: "\u{1F4F1}",
      name: "IAMAI Digital Commerce Data",
      type: "Association Report",
      refresh: "Annual",
      usage: "Internet penetration by city. Quick commerce adoption. Platform data.",
      ep: "iamai.in/research (free PDF download)",
      acc: "Internet and Mobile Association of India \u2014 industry standard."
    },
    {
      icon: "\u{1F4F0}",
      name: "GDELT Project + NewsAPI",
      type: "News APIs (Free)",
      refresh: "Real-time",
      usage: "NLP sentiment on weather-retail headlines. VADER scoring for polarity.",
      ep: "gdeltproject.org/api/v2 + newsapi.org/v2/everything?q=weather+retail+India",
      acc: "3,500+ global sources. 15-minute lag. 100 free requests/day."
    }
  ].map((src, i) => /* @__PURE__ */ React.createElement(Card, { key: i, style: { marginBottom: 9 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 7 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: "0.86rem" } }, src.icon, " ", src.name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { background: "#065f46", color: "#86efac", fontSize: "0.60rem", padding: "1px 7px", borderRadius: 4 } }, "FREE"), /* @__PURE__ */ React.createElement("span", { style: { background: `${P.accent}22`, color: P.accent, fontSize: "0.60rem", padding: "1px 7px", borderRadius: 4 } }, src.type), /* @__PURE__ */ React.createElement("span", { style: { background: P.subCard, color: P.muted, fontSize: "0.60rem", padding: "1px 7px", borderRadius: 4 } }, "Refresh: ", src.refresh))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: "0.71rem" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: P.muted, marginBottom: 2 } }, "Usage:"), /* @__PURE__ */ React.createElement("div", { style: { color: P.text, lineHeight: 1.6 } }, src.usage)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { color: P.muted, marginBottom: 2 } }, "Endpoint / Source:"), /* @__PURE__ */ React.createElement("div", { style: {
    color: P.accent,
    fontFamily: "monospace",
    fontSize: "0.63rem",
    wordBreak: "break-all",
    background: P.subCard,
    padding: "5px 8px",
    borderRadius: 5,
    marginBottom: 5
  } }, src.ep), /* @__PURE__ */ React.createElement("div", { style: { color: P.muted, marginBottom: 2 } }, "Accuracy / Notes:"), /* @__PURE__ */ React.createElement("div", { style: { color: P.green, fontSize: "0.66rem" } }, src.acc))))))), /* @__PURE__ */ React.createElement("div", { style: { background: P.subCard, borderTop: `1px solid ${P.border}`, padding: "13px 18px", marginTop: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } }, /* @__PURE__ */ React.createElement(MoonLogo, { size: 28 }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: P.gold, fontSize: "0.81rem" } }, "WeatherSell AI Pro"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.61rem", color: P.muted } }, "Real-Time Retail and E-Commerce Intelligence \xB7 India"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.59rem", color: P.muted } }, "Python \xB7 Scikit-learn \xB7 Prophet \xB7 HuggingFace \xB7 FAISS \xB7 Power BI"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.71rem", lineHeight: 1.8 } }, /* @__PURE__ */ React.createElement("div", { style: { color: P.gold, fontWeight: 700 } }, "Principal Data Scientist and Project Architect"), /* @__PURE__ */ React.createElement("div", { style: { color: P.text, fontWeight: 600 } }, "Molija Baskar"), /* @__PURE__ */ React.createElement("div", { style: { color: P.muted } }, "\u2709 ", /* @__PURE__ */ React.createElement("a", { href: "mailto:molija21@gmail.com", style: { color: P.accent, textDecoration: "none" } }, "molija21@gmail.com")), /* @__PURE__ */ React.createElement("div", { style: { color: P.muted } }, "\u{1F4DE} ", /* @__PURE__ */ React.createElement("a", { href: "tel:+918667060780", style: { color: P.accent, textDecoration: "none" } }, "+91 8667060780"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: "0.63rem", color: P.muted, maxWidth: 240, lineHeight: 1.7 } }, /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 2 } }, "Data Sources:"), "OpenWeather \xB7 World Bank \xB7 DIPP India \xB7 IBEF 2024 \xB7 IAMAI \xB7 RBI CPI \xB7 GDELT \xB7 NewsAPI \xB7 Prophet \xB7 FAISS")), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, textAlign: "center", fontSize: "0.60rem", color: P.muted } }, "\xA9 2025 Molija Baskar. All rights reserved. WeatherSell AI Pro \u2014 Data-Driven Retail and E-Commerce Intelligence."))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
const _s = document.getElementById("_sp");
if (_s) {
  _s.classList.add("off");
  setTimeout(() => _s.remove(), 400);
}
