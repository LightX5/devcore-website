import { useState, useEffect, useRef } from "react";

/* ─────────────────────────── MOCK STUDENT DB ─────────────────────────── */
const STUDENTS_BASE = [
  { matric: "SWE/2023/050", password: "Iyanuoluwa", name: "Light", initials: "AD", isAdmin: true },
  { matric: "SWE/2023/032", password: "Oluwadamilola", name: "Bada Oluwadamilola", initials: "BA" },
  { matric: "SWE/2023/033", password: "Divine", name: "Elijah Divine", initials: "ED" },
  { matric: "SWE/2023/037", password: "Kamil", name: "Folarin Kamil", initials: "FK" },
  { matric: "SWE/2023/044", password: "Uchechi", name: "Nzekwe Uchechi", initials: "NU" },
  { matric: "SWE/2023/008", password: "Isaac", name: "Adejumo Isaac", initials: "AI" },
  { matric: "SWE/2023/026", password: "Akinsuroju", name: "Johnpraise Akinsuroju", initials: "JA" },
  { matric: "SWE/2023/046", password: "Peter", name: "Oguntola Peter", initials: "OP" },
  { matric: "SWE/2023/047", password: "Kafilat", name: "Ojedokun Kafilat", initials: "OK" },
  { matric: "SWE/2023/019", password: "Oluwadarasimi", name: "Ajaja Oluwadarasimi", initials: "AO" },
  { matric: "SWE/2023/075", password: "Olamide", name: "Sodiq Olamide", initials: "SO" },
  { matric: "SWE/2023/038", password: "Aishat", name: "Jimoh Aishat", initials: "JA" },
  { matric: "SWE/2023/060", password: "Oluwaferanmi", name: "Omisore Oluwaferanmi", initials: "OO" },
  { matric: "SWE/2023/067", password: "Abdulahi", name: "Oyelowo Abdulahi", initials: "OA" },
  { matric: "SWE/2023/023", password: "Olatomiwa", name: "Akinjo Olatomiwa", initials: "AO" },
  { matric: "SWE/2023/010", password: "Heritage", name: "Adesokan Heritage", initials: "AH" },
  { matric: "SWE/2023/014", password: "Fortune", name: "Adeyemi Fortune", initials: "AF" },
  { matric: "SWE/2023/024", password: "Abdurrahman", name: "Akinsola Abdurrahman", initials: "AA" },
  { matric: "SWE/2023/007", password: "Damilola", name: "Adegbite Damilola", initials: "AD" },
  { matric: "SWE/2023/016", password: "Moriam", name: "Adisa Moriam", initials: "AM" },
  { matric: "SWE/2023/002", password: "Precious", name: "Abraham Precious", initials: "AP" },
  { matric: "SWE/2023/018", password: "David", name: "Agboola David", initials: "AD" },
  { matric: "SWE/2023/011", password: "OreOluwa", name: "Adetan OreOluwa", initials: "AO" },
  { matric: "SWE/2023/056", password: "Kehinde", name: "Olusola Kehinde", initials: "OK" },
  { matric: "SWE/2023/063", password: "Michael", name: "Ossai Michael", initials: "OM" },
  { matric: "SWE/2023/076", password: "EL-BARAQ", name: "Soji-Salau EL-BARAQ", initials: "SE" },
  { matric: "SWE/2023/064", password: "Oluwadarasimi", name: "Oyedeji Oluwadarasimi", initials: "OO" },
  { matric: "SWE/2023/080", password: "Ayomide", name: "Oladimeji Ayomide", initials: "OA" },
  { matric: "SWE/2023/009", password: "Gift", name: "Adelodun Gift", initials: "AG" },
  { matric: "SVG/2022/038", password: "Chibuchi", name: "Promise Chibuchi", initials: "PC" },
  { matric: "SWE/2023/059", password: "Daniel", name: "Omisope Daniel", initials: "OD" },
  { matric: "SWE/2023/020", password: "Nathanael", name: "Ajekiigbe Nathanael", initials: "AN" },
  { matric: "SWE/2023/048", password: "Abdulfatai", name: "Ojewande Abdulfatai", initials: "OA" },
  { matric: "SWE/2023/062", password: "Daniel", name: "Ososanya Daniel", initials: "OD" },
  { matric: "SWE/2023/025", password: "Tiwaloluwa", name: "Akinsola Tiwaloluwa", initials: "AT" },
  { matric: "SWE/2023/017", password: "Al", name: "Afeiye Al", initials: "AA" },
  { matric: "SWE/2023/013", password: "Emmanuel", name: "Adewale Adetomiwa", initials: "AA" },
  { matric: "SWE/2023/054", password: "Faith", name: "Olasunkanmi Faith", initials: "OF" },
  { matric: "SWE/2023/034", password: "Taiwo", name: "Emilolorun Taiwo", initials: "ET" },
  { matric: "SWE/2023/061", password: "Akinfenwa", name: "Omotoso Akinfenwa", initials: "OA" },
  { matric: "SWE/2023/079", password: "Gideon", name: "Layade Gideon", initials: "LG" },
  { matric: "SWE/2023/081", password: "Erioluwa", name: "Oladipo-Ajibola Erioluwa", initials: "OE" },
  { matric: "SWE/2023/022", password: "Jesuloluwa", name: "Akinbo Jesuloluwa", initials: "AJ" },
  { matric: "SWE/2023/053", password: "Covenant", name: "Olanrewaju Covenant", initials: "OC" },
  { matric: "SWE/2023/072", password: "Ezekiel", name: "Samuel Ezekiel", initials: "Samkiel" },
  { matric: "SWE/2023/021", password: "Emmanuel", name: "Ajibade Emmanuel", initials: "AE" },
  { matric: "SWE/2023/028", password: "Robert", name: "Anih Robert", initials: "AR",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Robert&backgroundColor=0d1117&skinColor=c58c4c" },
  { matric: "SWE/2023/068", password: "Samuel", name: "Oyeniran Samuel", initials: "OS" },
  { matric: "SWE/2023/071", password: "Esther", name: "Salako Esther", initials: "SE" },
  { matric: "SWE/2023/055", password: "Oluwatobi", name: "Olayeni Oluwatobi", initials: "OO" },
  { matric: "SWE/2023/052", password: "Oluwafunmilayo", name: "Olaleye Oluwafunmilayo", initials: "OO" },
  { matric: "SWE/2023/041", password: "Oluwatobi", name: "Lupo Oluwatobi", initials: "LO" },
  { matric: "SWE/2023/006", password: "Testimony", name: "Adegbenjo Testimony", initials: "AT" },
  { matric: "SWE/2023/074", password: "Abdulbaaqiy", name: "Shefiu-Badamosi Abdulbaaqiy", initials: "SA" },
  { matric: "SWE/2023/051", password: "Olalekan", name: "Olaleke Olalekan", initials: "OO" },
  { matric: "SWE/2023/003", password: "Ayomide", name: "Adamolekun Ayomide", initials: "AA" },
  { matric: "SWE/2023/005", password: "Michael", name: "Adedoyin Michael", initials: "AM" },
  { matric: "SWE/2023/012", password: "Oluwatimileyin", name: "Adetoyinbo Oluwatimileyin", initials: "AO" },
  { matric: "SWE/2023/001", password: "Asiah", name: "Abdussalam Asiah", initials: "AA" },
  { matric: "SWE/2023/027", password: "Olamilekan", name: "Aluko Olamilekan", initials: "AO" },
  { matric: "SWE/2023/065", password: "Abdulsalam", name: "Oyedele Abdulsalam", initials: "OA" },
  { matric: "SWE/2023/004", password: "Tiwalade", name: "Adebayo Tiwalade", initials: "AT" },
  { matric: "SWE/2023/077", password: "Samiat", name: "Yakubu Samiat", initials: "YS" },
  { matric: "SWE/2023/073", password: "Elisha", name: "Sennowo Elisha", initials: "SE" },
  { matric: "SWE/2023/040", password: "Nafisat", name: "Lawal Nafisat", initials: "LN" },
  { matric: "SWE/2023/039", password: "Minizi", name: "John-Olusoji Minizi", initials: "JM" },
  { matric: "SWE/2023/070", password: "Titilopemi", name: "Oyetunji Titilopemi", initials: "OT" },
  { matric: "SWE/2023/066", password: "Daniel", name: "Oyelami Daniel", initials: "OD" },
  { matric: "SWE/2023/057", password: "Abraham", name: "Oluwaniyi Abraham", initials: "OA" },
  { matric: "SWE/2023/083", password: "Nwaezeigwe", name: "Nwanioma Nwaezeigwe", initials: "NN" },
  { matric: "SWE/2023/030", password: "Saalim", name: "Apologun Saalim", initials: "AS" },
  { matric: "SWE/2023/043", password: "Chukwubuikem", name: "Nwobi Chukwubuikem", initials: "NC" },
  { matric: "SWE/2023/035", password: "Favour", name: "Etim Favour", initials: "EF" },
  { matric: "SWE/2023/058", password: "Favour", name: "Omirin Favour", initials: "OF" },
  { matric: "SWE/2023/029", password: "Cyril", name: "Anoemuah Cyril", initials: "AC" },
  { matric: "SWE/2023/045", password: "Aduragbemi", name: "Ogundipe Aduragbemi", initials: "OA" },
  { matric: "SWE/2023/036", password: "Oreoluwa", name: "Fadeyi Oreoluwa", initials: "FO" },
  { matric: "SWE/2023/082", password: "Robert-Fajimi", name: "Jason Robert-Fajimi", initials: "JR" },
  { matric: "SWE/2023/069", password: "Oladoyin", name: "Umar Oladoyin", initials: "UO" },
  { matric: "SWE/2023/015", password: "Abdulrazaaq", name: "Adisa Abdulrazaaq", initials: "AA" },
  { matric: "MRH/2022/078", password: "Uthman", name: "Oyediran Uthman", initials: "OU" },
  { matric: "MTH/2023/028", password: "Oluwadamilola", name: "Albert Oluwadamilola", initials: "AO" },
  { matric: "MTH/2023/027", password: "Mary", name: "Akintunde Mary", initials: "AM",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Mary&backgroundColor=0d1117&skinColor=c58c4c" },
  { matric: "SWE/2024/003", password: "Isaac", name: "Okunlola Isaac", initials: "OI" },
  { matric: "SWE/2023/000", password: "password", name: "Demo Student", initials: "DS" },
];

/* ─────────────────────────── DATA ─────────────────────────── */
const NAV_LINKS = ["About", "Courses", "What We Do", "Events", "Resources", "Team"];

const RAIN_COURSES = [
  { code: "CSC 202", title: "Computer Programming II", prereq: "CSC 201", ltp: "0-0-6", units: 2, group: "core" },
  { code: "CPE 204", title: "Intro. to Digital System II", prereq: "", ltp: "1-0-3", units: 2, group: "core" },
  { code: "CPE 206", title: "Introd. Computer Network", prereq: "", ltp: "2-0-0", units: 2, group: "core" },
  { code: "MTH 202", title: "Mathematical Methods II", prereq: "MTH 201", ltp: "3-1-0", units: 4, group: "core" },
  { code: "SEN 212", title: "Software Engineering Process", prereq: "", ltp: "2-0-0", units: 2, group: "core" },
  { code: "SEN 214", title: "Introduction to Mobile Application Development", prereq: "", ltp: "1-0-3", units: 2, group: "core" },
  { code: "SEN 216", title: "Introduction to Web Technologies", prereq: "", ltp: "2-0-0", units: 2, group: "core" },
  { code: "STT 202", title: "Probability Distribution I", prereq: "", ltp: "3-0-0", units: 3, group: "core" },
  { code: "CIS 204", title: "Introduction to Problem Solving", prereq: "", ltp: "2-0-0", units: 2, group: "core" },
  { code: "SE", title: "Special Elective", prereq: "", ltp: "2-0-0", units: 2, group: "elective" },
];

const COURSE_COLORS = {
  CSC: { bg: "#0f2027", accent: "#00e5ff" },
  CPE: { bg: "#1a0f2e", accent: "#b44bff" },
  MTH: { bg: "#0f1f0f", accent: "#00ff88" },
  SEN: { bg: "#1f0f0a", accent: "#ff6b35" },
  STT: { bg: "#0f1a1f", accent: "#00bfff" },
  CIS: { bg: "#1a1f0f", accent: "#aaff00" },
  SE:  { bg: "#1f1a0f", accent: "#f5a623" },
};

function getCourseStyle(code) {
  const prefix = code.split(" ")[0];
  return COURSE_COLORS[prefix] || COURSE_COLORS["SE"];
}

const WHAT_WE_DO = [
  { icon: "⟨/⟩", title: "Coding Tutorials", desc: "Structured, peer-led sessions covering fundamentals to advanced topics in software engineering." },
  { icon: "◈", title: "Tech Events", desc: "Hackathons, tech talks, and social mixers that connect you with the broader engineering community." },
  { icon: "⬡", title: "Mentorship", desc: "Connect with senior students and industry professionals who guide your technical and career growth." },
  { icon: "◎", title: "Project Collaboration", desc: "Build real-world projects with fellow students — from concept to deployment, together." },
];

const EVENTS = [
  { name: "Welcome Meetup", date: "Jan 15, 2025", tag: "Social", desc: "Kick off the semester with introductions, icebreakers, and community building." },
  { name: "Web Dev Bootcamp", date: "Feb 8–10, 2025", tag: "Workshop", desc: "3-day intensive covering HTML, CSS, React, and deploying your first project." },
  { name: "Devcore Hackathon", date: "Mar 22–23, 2025", tag: "Hackathon", desc: "24-hour build challenge. Teams of 2–4. Real problems. Real solutions." },
  { name: "Tech Talks Vol. 3", date: "Apr 5, 2025", tag: "Talk", desc: "Industry speakers share insights on building products, careers, and open source." },
];

const RESOURCES = [
  { title: "SEN Courses Study Guide", type: "PDF", desc: "Core concepts for Software Engineering fundamentals, curated by senior students." },
  { title: "Data Structures Handbook", type: "PDF", desc: "Visual explanations and practice problems for DSA preparation." },
  { title: "Web Dev Roadmap 2025", type: "Guide", desc: "Step-by-step path from beginner to job-ready frontend/backend developer." },
  { title: "Git & GitHub Starter Kit", type: "Guide", desc: "Everything you need to collaborate on code like a professional." },
  { title: "Interview Prep Pack", type: "ZIP", desc: "LeetCode patterns, system design notes, and behavioral question bank." },
  {
    title: "SEN Learning Platform",
    type: "Link",
    desc: "Everything you need to level up — curated resources, tutorials, and tools for SEN students.",
    url: "https://studzy.me/"
  }
];

const TEAM = [
  { name: "Mary", role: "Class Rep Female", initials: "M", color: "#ff6b9d",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Mary&backgroundColor=1a0f1a" },
  { name: "Robert", role: "Class Rep Male", initials: "R", color: "#00e5ff",
    photo: "https://api.dicebear.com/9.x/personas/svg?seed=Robert&backgroundColor=0f1a27" },
  { name: "Light", role: "Website Admin", initials: "AD", color: "#f5a623", isAdmin: true },
];

const TAG_META = {
  Social:    { color: "#00ff88", bg: "rgba(0,255,136,0.1)" },
  Workshop:  { color: "#00e5ff", bg: "rgba(0,229,255,0.1)" },
  Hackathon: { color: "#f5a623", bg: "rgba(245,166,35,0.1)" },
  Talk:      { color: "#b44bff", bg: "rgba(180,75,255,0.1)" },
};

/* ─────────────────────────── STORAGE HELPERS ─────────────────────────── */
function loadProfiles() {
  try { return JSON.parse(localStorage.getItem("devcore_profiles") || "{}"); } catch { return {}; }
}
function saveProfiles(p) {
  try { localStorage.setItem("devcore_profiles", JSON.stringify(p)); } catch {}
}
function loadCardRequests() {
  try { return JSON.parse(localStorage.getItem("devcore_cards") || "[]"); } catch { return []; }
}
function saveCardRequests(r) {
  try { localStorage.setItem("devcore_cards", JSON.stringify(r)); } catch {}
}

/* ─────────────────────────── HOOKS ─────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────── LOGIN PAGE ─────────────────────────── */
function LoginPage({ onLogin }) {
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");

  const handleLogin = () => {
    setError("");
    if (!matric || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setTimeout(() => {
      const student = STUDENTS_BASE.find(
        s => s.matric.toLowerCase() === matric.trim().toLowerCase() && s.password === password
      );
      if (student) { onLogin(student); }
      else { setError("Invalid matric number or password. Try again."); setLoading(false); }
    }, 1200);
  };

  return (
    <div className="login-root">
      <div className="login-bg-grid" />
      <div className="login-glow" />
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">DC</div>
          <div>
            <div className="login-brand-name">DEVCORE</div>
            <div className="login-brand-sub">OAU · Software Engineering · 2023</div>
          </div>
        </div>
        <div className="login-divider" />
        <h2 className="login-title">Welcome back 👋</h2>
        <p className="login-desc">Sign in with your matric number and password to access the portal.</p>
        <div className={`login-field ${focused === "matric" ? "focused" : ""}`}>
          <label className="field-label">Matric Number</label>
          <div className="field-input-wrap">
            <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            <input className="field-input" type="text" placeholder="e.g. SWE/2023/001"
              value={matric} onChange={e => setMatric(e.target.value)}
              onFocus={() => setFocused("matric")} onBlur={() => setFocused("")}
              onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="username" />
          </div>
        </div>
        <div className={`login-field ${focused === "pass" ? "focused" : ""}`}>
          <label className="field-label">Password</label>
          <div className="field-input-wrap">
            <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input className="field-input" type={showPass ? "text" : "password"} placeholder="Enter your password"
              value={password} onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocused("pass")} onBlur={() => setFocused("")}
              onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="current-password" />
            <button className="field-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
              {showPass
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
            </button>
          </div>
        </div>
        {error && (
          <div className="login-error">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {error}
          </div>
        )}
        <button className={`login-btn ${loading ? "loading" : ""}`} onClick={handleLogin} disabled={loading}>
          {loading ? <><span className="login-spinner" /> Verifying...</> : "Sign In →"}
        </button>
        <p className="login-hint">Matric No: <strong>SWE/2023/000</strong> · Password: <strong>'name'</strong></p>
      </div>
    </div>
  );
}

/* ─────────────────────────── PROFILE MODAL ─────────────────────────── */
function ProfileModal({ user, profiles, onSave, onClose, cardRequests, onRequestCard }) {
  const profile = profiles[user.matric] || {};
  const [displayName, setDisplayName] = useState(profile.displayName || user.name);
  const [initials, setInitials] = useState(profile.initials || user.initials);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl || user.photo || "");
  const [photoInput, setPhotoInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [cardEmail, setCardEmail] = useState(profile.email || "");
  const [showEmailInput, setShowEmailInput] = useState(true);

  const myRequest = cardRequests.find(r => r.matric === user.matric);

  const handleSave = () => {
    onSave({ displayName, initials, photoUrl });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const avatarBg = (profile.initials || user.initials || "??").slice(0,2).toUpperCase();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={e => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2 className="profile-modal-title">My Profile</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-avatar-section">
          <div className="profile-avatar-large">
            {photoUrl
              ? <img src={photoUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
              : <span>{(initials || "??").slice(0,2).toUpperCase()}</span>}
          </div>
          <div className="profile-avatar-actions">
            <label className="profile-upload-btn">
              📷 Upload Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input className="field-input" style={{ flex: 1, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", color: "var(--text)", fontSize: "0.75rem", fontFamily: "var(--mono)" }}
                placeholder="Or paste image URL…" value={photoInput}
                onChange={e => setPhotoInput(e.target.value)} />
              <button className="profile-upload-btn" onClick={() => { setPhotoUrl(photoInput); setPhotoInput(""); }}>Set</button>
            </div>
            {photoUrl && <button className="profile-remove-btn" onClick={() => setPhotoUrl("")}>Remove Photo</button>}
          </div>
        </div>

        <div className="profile-fields">
          <div className="login-field">
            <label className="field-label">Display Name</label>
            <div className="field-input-wrap">
              <input className="field-input" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" />
            </div>
          </div>
          <div className="login-field">
            <label className="field-label">Initials (2–3 chars)</label>
            <div className="field-input-wrap">
              <input className="field-input" value={initials} maxLength={3} onChange={e => setInitials(e.target.value.toUpperCase())} placeholder="e.g. AD" />
            </div>
          </div>
          <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
            <span style={{ color: "var(--gold)" }}>Matric:</span> {user.matric}
            {user.isAdmin && <span style={{ marginLeft: 12, color: "#f5a623", background: "rgba(245,166,35,0.15)", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem" }}>⚡ ADMIN</span>}
          </div>
        </div>

        {/* ID Card section */}
        <div className="card-request-section">
          <h3 className="card-section-title">🪪 Member ID Card</h3>
          {myRequest ? (
            <div className={`card-status card-status-${myRequest.status}`}>
              {myRequest.status === "pending" && `⏳ Card request pending — admin will review soon. Confirmation to: ${myRequest.email || "your email"}`}
              {myRequest.status === "approved" && `✅ Card approved! Check ${myRequest.email || "your email"}.`}
              {myRequest.status === "rejected" && "❌ Card request was declined. Contact admin."}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label className="field-label" style={{ marginBottom: 6 }}>Gmail to receive your card</label>
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg)", border: `1px solid ${cardEmail && cardEmail.includes("@") ? "rgba(0,255,136,0.35)" : "var(--border)"}`, borderRadius: 10, padding: "0 14px", transition: "border-color 0.2s" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="15" height="15" style={{ color: "var(--muted)", flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={cardEmail}
                    onChange={e => setCardEmail(e.target.value)}
                    style={{ flex: 1, background: "none", border: "none", outline: "none", fontFamily: "var(--mono)", fontSize: "0.82rem", color: "var(--text)", padding: "12px 0", letterSpacing: "0.02em" }}
                  />
                  {cardEmail && cardEmail.includes("@") && (
                    <span style={{ color: "#00ff88", fontSize: "0.75rem" }}>✓</span>
                  )}
                </div>
              </div>
              <button
                className="card-request-btn"
                disabled={!cardEmail || !cardEmail.includes("@")}
                style={{ opacity: (!cardEmail || !cardEmail.includes("@")) ? 0.45 : 1, cursor: (!cardEmail || !cardEmail.includes("@")) ? "not-allowed" : "pointer" }}
                onClick={() => {
                  if (!cardEmail || !cardEmail.includes("@")) return;
                  onRequestCard(user.matric, displayName || user.name, initials || user.initials, cardEmail);
                }}
              >
                Request ID Card →
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="login-btn" style={{ flex: 1, marginBottom: 0 }} onClick={handleSave}>
            {saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── ADMIN PANEL ─────────────────────────── */
function AdminPanel({ cardRequests, onApprove, onReject, onClose, profiles }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const pending = cardRequests.filter(r => r.status === "pending");
  const done = cardRequests.filter(r => r.status !== "pending");

  const filteredStudents = STUDENTS_BASE.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.matric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: "◈" },
    { id: "cards", label: `Card Requests${pending.length > 0 ? ` (${pending.length})` : ""}`, icon: "🪪" },
    { id: "members", label: "All Members", icon: "👥" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", zIndex: 200, display: "flex", alignItems: "stretch", justifyContent: "flex-end" }} onClick={onClose}>
      <div style={{ width: "min(680px, 100vw)", height: "100vh", background: "#080c10", borderLeft: "1px solid rgba(245,166,35,0.2)", display: "flex", flexDirection: "column", overflowY: "auto", animation: "slideInRight 0.3s ease" }} onClick={e => e.stopPropagation()}>
        <style>{`@keyframes slideInRight { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

        {/* Admin Header */}
        <div style={{ background: "linear-gradient(135deg, #0d1117 0%, #111820 100%)", borderBottom: "1px solid rgba(245,166,35,0.15)", padding: "1.5rem 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, rgba(245,166,35,0.2), rgba(245,166,35,0.05))", border: "1px solid rgba(245,166,35,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>⚡</div>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>Admin Console</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "rgba(245,166,35,0.6)", letterSpacing: "0.1em" }}>DEVCORE · LIGHT · WEBSITE ADMIN</div>
                </div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--muted)", cursor: "pointer", padding: "7px 12px", fontFamily: "var(--mono)", fontSize: "0.75rem", transition: "all 0.2s" }}>✕ Close</button>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
            {[
              { label: "Total Members", value: STUDENTS_BASE.length, color: "var(--gold)" },
              { label: "Card Requests", value: cardRequests.length, color: "#00e5ff" },
              { label: "Pending", value: pending.length, color: "#f5a623" },
              { label: "Approved", value: cardRequests.filter(r => r.status === "approved").length, color: "#00ff88" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 10, padding: "0.75rem 1rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "1.4rem", fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--muted)", marginTop: 3, letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", padding: "0 2rem", gap: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "1rem 1.25rem", fontFamily: "var(--mono)", fontSize: "0.72rem", color: activeTab === t.id ? "var(--gold)" : "var(--muted)", borderBottom: activeTab === t.id ? "2px solid var(--gold)" : "2px solid transparent", transition: "all 0.2s", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto" }}>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>// SYSTEM OVERVIEW</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted)", marginBottom: 8 }}>DEPARTMENT</div>
                  <div style={{ fontWeight: 700, color: "var(--text)" }}>Software Engineering</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)", marginTop: 4 }}>OAU Ile-Ife · 2023 Set</div>
                </div>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted)", marginBottom: 8 }}>CURRENT SEMESTER</div>
                  <div style={{ fontWeight: 700, color: "var(--gold)" }}>Rain 2024/2025</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)", marginTop: 4 }}>23 Units · 10 Courses</div>
                </div>
              </div>
              {pending.length > 0 && (
                <div style={{ background: "rgba(245,166,35,0.07)", border: "1px solid rgba(245,166,35,0.2)", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700 }}>⚠ {pending.length} pending card request{pending.length > 1 ? "s" : ""}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted)", marginTop: 4 }}>Requires your review</div>
                  </div>
                  <button onClick={() => setActiveTab("cards")} style={{ background: "var(--gold)", color: "#080c10", border: "none", borderRadius: 8, padding: "8px 16px", fontFamily: "var(--mono)", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer" }}>Review →</button>
                </div>
              )}
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "1rem", marginTop: "0.5rem" }}>// QUICK ACTIONS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { label: "View All Members", sub: `${STUDENTS_BASE.length} registered`, action: () => setActiveTab("members"), icon: "👥" },
                  { label: "Card Requests", sub: `${cardRequests.length} total`, action: () => setActiveTab("cards"), icon: "🪪" },
                ].map(a => (
                  <button key={a.label} onClick={a.action} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "1rem 1.25rem", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s" }}>
                    <div style={{ fontSize: "1.25rem", marginBottom: 8 }}>{a.icon}</div>
                    <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{a.label}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted)", marginTop: 4 }}>{a.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CARD REQUESTS TAB */}
          {activeTab === "cards" && (
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>// PENDING REQUESTS ({pending.length})</div>
              {pending.length === 0 && <div style={{ color: "var(--muted)", fontSize: "0.85rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "1.25rem", textAlign: "center", marginBottom: 16 }}>No pending requests 🎉</div>}
              {pending.map(req => (
                <div key={req.matric} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", background: "var(--surface)", border: "1px solid rgba(245,166,35,0.15)", borderRadius: 12, marginBottom: "0.75rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(245,166,35,0.1)", color: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: "0.9rem", fontWeight: 700, flexShrink: 0 }}>{(req.initials || "??").slice(0,2)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: "var(--text)", fontSize: "0.9rem" }}>{req.name}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted)" }}>{req.matric}</div>
                    {req.email && <div style={{ fontFamily: "var(--mono)", fontSize: "0.63rem", color: "var(--gold)", marginTop: 2, opacity: 0.8 }}>📧 {req.email}</div>}
                    <div style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--muted)", marginTop: 2 }}>Requested: {req.date}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button onClick={() => onApprove(req.matric)} style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.25)", borderRadius: 8, padding: "7px 14px", fontFamily: "var(--mono)", fontSize: "0.7rem", color: "#00ff88", cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" }}>✓ Approve</button>
                    <button onClick={() => onReject(req.matric)} style={{ background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 8, padding: "7px 14px", fontFamily: "var(--mono)", fontSize: "0.7rem", color: "#ff8080", cursor: "pointer", fontWeight: 700, whiteSpace: "nowrap" }}>✕ Reject</button>
                  </div>
                </div>
              ))}
              {done.length > 0 && (
                <>
                  <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", margin: "1.5rem 0 1rem" }}>// PROCESSED ({done.length})</div>
                  {done.map(req => (
                    <div key={req.matric} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0.875rem 1.25rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, marginBottom: "0.5rem", opacity: 0.65 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: req.status === "approved" ? "rgba(0,255,136,0.1)" : "rgba(255,80,80,0.1)", color: req.status === "approved" ? "#00ff88" : "#ff8080", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: "0.8rem", fontWeight: 700, flexShrink: 0 }}>{(req.initials || "??").slice(0,2)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.85rem" }}>{req.name}</div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: "0.63rem", color: "var(--muted)" }}>{req.matric}</div>
                        {req.email && <div style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "var(--muted)", marginTop: 1 }}>{req.email}</div>}
                      </div>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: req.status === "approved" ? "#00ff88" : "#ff8080", fontWeight: 700 }}>{req.status === "approved" ? "✓ Approved" : "✕ Rejected"}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* MEMBERS TAB */}
          {activeTab === "members" && (
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "1rem" }}>// ALL MEMBERS ({STUDENTS_BASE.length})</div>
              <div style={{ position: "relative", marginBottom: "1.25rem" }}>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name or matric..." style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: "11px 14px 11px 40px", fontFamily: "var(--mono)", fontSize: "0.8rem", color: "var(--text)", outline: "none", boxSizing: "border-box" }} />
                <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: "0.85rem" }}>🔍</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {filteredStudents.map((s, i) => {
                  const p = profiles[s.matric] || {};
                  const photo = p.photoUrl || s.photo;
                  const displayInitials = (p.initials || s.initials || "??").slice(0, 2);
                  const cardReq = cardRequests.find(r => r.matric === s.matric);
                  return (
                    <div key={s.matric} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem 1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, transition: "border-color 0.2s" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: s.isAdmin ? "linear-gradient(135deg,rgba(245,166,35,0.3),rgba(245,166,35,0.1))" : "linear-gradient(135deg, var(--green), var(--green-mid))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: "0.75rem", fontWeight: 700, color: s.isAdmin ? "var(--gold)" : "var(--text)", flexShrink: 0, overflow: "hidden", border: s.isAdmin ? "1px solid rgba(245,166,35,0.4)" : "none" }}>
                        {photo ? <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : displayInitials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6 }}>
                          {p.displayName || s.name}
                          {s.isAdmin && <span style={{ background: "rgba(245,166,35,0.15)", color: "var(--gold)", borderRadius: 4, padding: "1px 6px", fontSize: "0.6rem", fontFamily: "var(--mono)" }}>⚡ ADMIN</span>}
                        </div>
                        <div style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--muted)" }}>{s.matric}</div>
                      </div>
                      {cardReq && (
                        <span style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", padding: "3px 8px", borderRadius: 4, background: cardReq.status === "approved" ? "rgba(0,255,136,0.1)" : cardReq.status === "pending" ? "rgba(245,166,35,0.1)" : "rgba(255,80,80,0.1)", color: cardReq.status === "approved" ? "#00ff88" : cardReq.status === "pending" ? "var(--gold)" : "#ff8080", border: `1px solid ${cardReq.status === "approved" ? "rgba(0,255,136,0.2)" : cardReq.status === "pending" ? "rgba(245,166,35,0.2)" : "rgba(255,80,80,0.2)"}` }}>
                          {cardReq.status === "approved" ? "✓ Card" : cardReq.status === "pending" ? "⏳ Pending" : "✕ Rejected"}
                        </span>
                      )}
                    </div>
                  );
                })}
                {filteredStudents.length === 0 && <div style={{ color: "var(--muted)", fontSize: "0.85rem", textAlign: "center", padding: "2rem" }}>No members found</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── SHARED COMPONENTS ─────────────────────────── */
function Section({ id, children, className = "", style = {} }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} ref={ref} style={style}
      className={`transition-section ${inView ? "in-view" : ""} ${className}`}>
      {children}
    </section>
  );
}

function CourseCard({ course, index }) {
  const style = getCourseStyle(course.code);
  const [hovered, setHovered] = useState(false);
  return (
    <div className="course-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `linear-gradient(135deg, ${style.bg} 0%, #0d1117 100%)` : "#0d1117",
        border: `1px solid ${hovered ? style.accent : "rgba(255,255,255,0.06)"}`,
        boxShadow: hovered ? `0 0 30px ${style.accent}22` : "none",
        animationDelay: `${index * 60}ms`,
      }}>
      <div className="course-top">
        <span className="course-code" style={{ color: style.accent, borderColor: `${style.accent}44` }}>{course.code}</span>
        <span className="course-units" style={{ color: style.accent }}>{course.units} unit{course.units !== 1 ? "s" : ""}</span>
      </div>
      <h3 className="course-title">{course.title}</h3>
      <div className="course-meta">
        <span className="meta-chip">L-T-P: {course.ltp}</span>
        {course.prereq && <span className="meta-chip prereq">Pre: {course.prereq}</span>}
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN APP ─────────────────────────── */
export default function App() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState(loadProfiles());
  const [cardRequests, setCardRequests] = useState(loadCardRequests());
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("devcore_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogin = (student) => {
    sessionStorage.setItem("devcore_user", JSON.stringify(student));
    setUser(student);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("devcore_user");
    setUser(null);
    setShowLogoutConfirm(false);
  };

  const handleSaveProfile = (updates) => {
    const newProfiles = { ...profiles, [user.matric]: { ...profiles[user.matric], ...updates } };
    setProfiles(newProfiles);
    saveProfiles(newProfiles);
    // update session user display
    const updatedUser = { ...user, name: updates.displayName || user.name, initials: updates.initials || user.initials, photo: updates.photoUrl || user.photo };
    sessionStorage.setItem("devcore_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleRequestCard = (matric, name, initials, email) => {
    const newReq = { matric, name, initials, email: email || "", status: "pending", date: new Date().toLocaleDateString() };
    const updated = [...cardRequests.filter(r => r.matric !== matric), newReq];
    setCardRequests(updated);
    saveCardRequests(updated);
  };

  const handleApprove = (matric) => {
    const updated = cardRequests.map(r => r.matric === matric ? { ...r, status: "approved" } : r);
    setCardRequests(updated);
    saveCardRequests(updated);
  };

  const handleReject = (matric) => {
    const updated = cardRequests.map(r => r.matric === matric ? { ...r, status: "rejected" } : r);
    setCardRequests(updated);
    saveCardRequests(updated);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase().replace(/\s/g, "-"))?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredCourses = activeFilter === "all" ? RAIN_COURSES : RAIN_COURSES.filter(c => c.group === activeFilter);
  const totalUnits = RAIN_COURSES.reduce((s, c) => s + c.units, 0);

  // Merge base data with profile overrides
  const getDisplayUser = () => {
    if (!user) return user;
    const p = profiles[user.matric] || {};
    return { ...user, name: p.displayName || user.name, initials: p.initials || user.initials, photo: p.photoUrl || user.photo };
  };
  const displayUser = getDisplayUser();

  if (!user) return <><GlobalStyles /><LoginPage onLogin={handleLogin} /></>;

  const pendingCount = cardRequests.filter(r => r.status === "pending").length;

  return (
    <>
      <GlobalStyles />
      <div className="app">

        {/* ── NAV ── */}
        <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
          <div className="nav-brand" onClick={() => scrollTo("about")}>
            <div className="nav-logo">DC</div>
            DEVCORE
          </div>
          <ul className="nav-links">
            {NAV_LINKS.map(l => <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>)}
          </ul>
          <div className="nav-right" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {user.isAdmin && (
              <button className="admin-nav-btn" onClick={() => setShowAdmin(true)}>
                ⚡ Admin
                {pendingCount > 0 && <span className="admin-badge">{pendingCount}</span>}
              </button>
            )}
            <div className="nav-user" onClick={() => setShowProfile(true)}>
              <div className="nav-avatar">
                {(displayUser.photo)
                  ? <img src={displayUser.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  : (displayUser.initials || "??").slice(0,2)}
              </div>
              <div className="nav-user-info">
                <span className="nav-user-name">{displayUser.name}</span>
                <span className="nav-user-matric">{displayUser.matric}</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13" style={{ color: "var(--muted)", marginLeft: 6 }}>
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <button className="nav-logout-btn" onClick={() => setShowLogoutConfirm(true)} title="Sign out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen
                ? <><line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8"/><line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.8"/></>
                : <><line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.8"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.8"/><line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.8"/></>}
            </svg>
          </button>
        </nav>

        {/* Premium announcement ticker */}
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "rgba(245,166,35,0.07)", borderBottom: "1px solid rgba(245,166,35,0.12)", padding: "6px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", gap: "4rem", animation: "ticker 30s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
            {[...Array(3)].map((_, rep) => (
              <span key={rep} style={{ display: "inline-flex", gap: "4rem", fontFamily: "var(--mono)", fontSize: "0.62rem", color: "rgba(245,166,35,0.6)", letterSpacing: "0.1em" }}>
                <span>⚡ Rain Semester 2024/2025 — 10 Courses · 23 Units</span>
                <span>◈ Devcore — OAU Software Engineering 2023</span>
                <span>◎ studzy.me — SEN Learning Platform now live</span>
                <span>⬡ Hackathon · Study Sessions · Tech Talks</span>
                <span>⟨/⟩ Build · Ship · Grow · Together</span>
              </span>
            ))}
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-user">
              <div className="nav-avatar" style={{ width: 40, height: 40, fontSize: "0.85rem" }}>
                {displayUser.photo
                  ? <img src={displayUser.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  : (displayUser.initials || "??").slice(0,2)}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--text)", fontSize: "0.9rem" }}>{displayUser.name}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--muted)" }}>{displayUser.matric}</div>
                {user.isAdmin && <div style={{ fontFamily: "var(--mono)", fontSize: "0.6rem", color: "#f5a623", marginTop: 2 }}>⚡ Website Admin</div>}
              </div>
            </div>
            {NAV_LINKS.map(l => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
            <button onClick={() => { setMenuOpen(false); setShowProfile(true); }} style={{ color: "var(--gold)" }}>👤 My Profile</button>
            {user.isAdmin && <button onClick={() => { setMenuOpen(false); setShowAdmin(true); }} style={{ color: "#f5a623" }}>⚡ Admin Panel</button>}
            <button onClick={() => { setMenuOpen(false); setShowLogoutConfirm(true); }} style={{ color: "#ff8080" }}>Sign Out</button>
          </div>
        )}

        {/* ── MODALS ── */}
        {showLogoutConfirm && (
          <div className="modal-overlay" onClick={() => setShowLogoutConfirm(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <h3 className="modal-title">Sign out?</h3>
              <p className="modal-desc">You'll need your matric number and password to sign back in.</p>
              <div className="modal-actions">
                <button className="modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                <button className="modal-confirm" onClick={handleLogout}>Sign Out</button>
              </div>
            </div>
          </div>
        )}

        {showProfile && (
          <ProfileModal
            user={user}
            profiles={profiles}
            onSave={handleSaveProfile}
            onClose={() => setShowProfile(false)}
            cardRequests={cardRequests}
            onRequestCard={handleRequestCard}
          />
        )}

        {showAdmin && user.isAdmin && (
          <AdminPanel
            cardRequests={cardRequests}
            onApprove={handleApprove}
            onReject={handleReject}
            onClose={() => setShowAdmin(false)}
            profiles={profiles}
          />
        )}

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-grid" />
          <div className="hero-glow" />
          {/* Premium floating particles */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: i % 3 === 0 ? "3px" : "2px",
                height: i % 3 === 0 ? "3px" : "2px",
                borderRadius: "50%",
                background: i % 4 === 0 ? "var(--gold)" : "var(--green-bright)",
                left: `${8 + (i * 7.5) % 85}%`,
                top: `${15 + (i * 11) % 70}%`,
                opacity: 0.35,
                animation: `float-particle ${4 + (i % 4)}s ease-in-out ${i * 0.4}s infinite alternate`,
              }} />
            ))}
          </div>
          {user.isAdmin && (
            <div className="admin-hero-badge">⚡ WEBSITE ADMIN</div>
          )}
          <div className="hero-badge"><span className="hero-badge-dot" />OAU · Software Engineering · 2023</div>
          <h1 className="hero-title">DEVCORE<br /><span className="highlight">2023</span></h1>
          <p className="hero-sub">The engineering community for OAU's Software Engineering students. Build. Ship. Grow. Together.</p>
          <div className="hero-welcome">Hey, <strong>{displayUser.name.split(" ")[0]}</strong> 👋 — good to have you here.</div>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo("Courses")}>View Courses →</button>
            <button className="btn-ghost" onClick={() => { const el = document.getElementById("what-we-do"); if(el) el.scrollIntoView({ behavior: "smooth" }); }}>What We Do</button>
            <button className="btn-ghost" onClick={(e) => { e.stopPropagation(); setShowProfile(true); }}>My Profile</button>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">23</span><span className="stat-label">Units This Sem</span></div>
            <div className="stat"><span className="stat-num">10</span><span className="stat-label">Courses</span></div>
            <div className="stat"><span className="stat-num">∞</span><span className="stat-label">Possibilities</span></div>
          </div>
          <div className="hero-scroll">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5"/></svg>
            SCROLL
          </div>
        </div>

        {/* ── ABOUT ── */}
        <Section id="about" className="about-section">
          <div className="section-wrap">
            <div className="about-grid">
              <div className="about-text">
                <span className="section-label">// about devcore</span>
                <h2 className="section-title">Built by students,<br /><span className="dim">for students.</span></h2>
                <p>Devcore is OAU's Software Engineering community — a tight-knit group of builders, coders, and problem-solvers navigating the Rain Semester together.</p>
                <p>We run study sessions, ship projects, host events, and keep each other accountable. Not a club. A crew.</p>
              </div>
              <div className="about-terminal">
                <div className="terminal-bar">
                  <div className="t-dot" style={{ background: "#ff5f57" }} />
                  <div className="t-dot" style={{ background: "#febc2e" }} />
                  <div className="t-dot" style={{ background: "#28c840" }} />
                  <span style={{ marginLeft: "auto", fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)" }}>devcore@oau:~</span>
                </div>
                <div className="terminal-body">
                  <div><span className="t-green">$</span> <span className="t-muted">whoami</span></div>
                  <div className="t-gold">devcore — oau_swe_2023</div>
                  <div style={{ marginTop: "0.5rem" }}><span className="t-green">$</span> <span className="t-muted">cat mission.txt</span></div>
                  <div className="t-muted" style={{ fontSize: "0.75rem" }}>Build real skills. Solve real problems.</div>
                  <div className="t-muted" style={{ fontSize: "0.75rem" }}>Ship real things. Together.</div>
                  <div style={{ marginTop: "0.5rem" }}><span className="t-green">$</span> <span className="t-muted">ls ./semester/</span></div>
                  <div className="t-gold">10 courses &nbsp; 23 units &nbsp; 1 semester</div>
                  <div style={{ marginTop: "0.5rem" }}><span className="t-green">$</span> <span className="t-muted">devcore --join</span></div>
                  <div><span className="t-green">✓</span> You're in. Welcome. <span className="t-cursor" /></div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── COURSES ── */}
        <Section id="courses" className="courses-section">
          <div className="section-wrap">
            <div className="courses-header">
              <div>
                <span className="section-label">// rain semester · 2024/2025</span>
                <h2 className="section-title">This semester's<br /><span className="dim">course load.</span></h2>
              </div>
              <div className="courses-meta">
                <div className="courses-summary">10 courses &nbsp;·&nbsp; 23 total units &nbsp;·&nbsp; Rain Semester</div>
                <div className="filter-btns">
                  {["all", "core", "elective"].map(f => (
                    <button key={f} className={`filter-btn ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
                      {f === "all" ? "All Courses" : f === "core" ? "Core / Compulsory" : "General Studies"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="courses-grid">
              {filteredCourses.map((course, i) => <CourseCard key={course.code} course={course} index={i} />)}
            </div>
            <div className="courses-total">
              <span className="total-label">TOTAL UNITS</span>
              <span className="total-label" style={{ color: "var(--green-bright)", fontSize: "1.1rem" }}>{totalUnits}</span>
            </div>
          </div>
        </Section>

        {/* ── WHAT WE DO ── */}
        <Section id="what-we-do" className="wwd-section">
          <div className="section-wrap">
            <span className="section-label">// what we do</span>
            <h2 className="section-title">Four pillars of<br /><span className="dim">the Devcore experience.</span></h2>
            <div className="wwd-grid">
              {WHAT_WE_DO.map((item, i) => (
                <div key={i} className="wwd-card">
                  <span className="wwd-icon">{item.icon}</span>
                  <h3 className="wwd-title">{item.title}</h3>
                  <p className="wwd-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── EVENTS ── */}
        <Section id="events" className="events-section">
          <div className="section-wrap">
            <span className="section-label">// events</span>
            <h2 className="section-title">What's happening<br /><span className="dim">in Devcore.</span></h2>
            <div className="events-grid">
              {EVENTS.map((event, i) => {
                const meta = TAG_META[event.tag] || TAG_META["Social"];
                return (
                  <div key={i} className="event-card">
                    <span className="event-tag" style={{ background: meta.bg, color: meta.color }}>{event.tag}</span>
                    <h3 className="event-name">{event.name}</h3>
                    <p className="event-desc">{event.desc}</p>
                    <p className="event-date">📅 {event.date}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ── RESOURCES ── */}
        <Section id="resources" className="res-section">
          <div className="section-wrap">
            <span className="section-label">// resources</span>
            <h2 className="section-title">Everything you need<br /><span className="dim">to level up.</span></h2>
            <div className="res-grid">
              {RESOURCES.map((res, i) => (
                <div key={i} className="res-card" data-link={res.url ? "true" : undefined} onClick={() => res.url && window.open(res.url, "_blank")} style={res.url ? { cursor: "pointer" } : {}}>
                  <span className="res-type">{res.type}</span>
                  <h3 className="res-title">{res.title}{res.url && <span style={{ marginLeft: 6, fontSize: "0.7rem", color: "var(--gold)", fontFamily: "var(--mono)" }}>↗</span>}</h3>
                  <p className="res-desc">{res.desc}</p>
                  {res.url && <p style={{ fontFamily: "var(--mono)", fontSize: "0.68rem", color: "var(--gold)", marginTop: "0.75rem", opacity: 0.7 }}>{res.url.replace("https://", "")}</p>}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── TEAM ── */}
        <Section id="team" className="team-section">
          <div className="section-wrap">
            <div style={{ textAlign: "center" }}>
              <span className="section-label">// the team</span>
              <h2 className="section-title">People running<br /><span className="dim">Devcore.</span></h2>
            </div>
            <div className="team-grid">
              {TEAM.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-avatar" style={{ background: member.photo ? "transparent" : member.color, border: member.isAdmin ? "2px solid #f5a623" : "none", position: "relative" }}>
                    {member.photo
                      ? <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14 }} />
                      : member.initials}
                    {member.isAdmin && (
                      <span style={{ position: "absolute", top: -6, right: -6, background: "#f5a623", color: "#080c10", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700 }}>⚡</span>
                    )}
                  </div>
                  <p className="team-name">{member.name}</p>
                  <p className="team-role">{member.role}</p>
                </div>
              ))}
            </div>
            <div className="join-cta">
              <h3 className="join-title">Ready to build with us?</h3>
              <p className="join-sub">Join Devcore and become part of OAU's most active SE community.</p>
              <button className="btn-primary" onClick={() => window.open("https://chat.whatsapp.com/FBOarwZDxNG3b6nYagkCOj", "_blank")}>Join Devcore Today →</button>
            </div>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <div className="footer-brand"><div className="nav-logo">DC</div>DEVCORE</div>
                <p className="footer-sub">Building the next generation of software engineers at OAU, Ile-Ife.</p>
              </div>
              <div className="footer-links-wrap">
                <div className="footer-col">
                  <p className="col-head">Navigate</p>
                  {NAV_LINKS.map(l => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
                </div>
                <div className="footer-col">
                  <p className="col-head">Socials</p>
                  {[{ label: "Instagram", handle: "@dev.core.23" }, { label: "TikTok", handle: "@dev.core.23" }, { label: "X / Twitter", handle: "@devcore23" }].map(({ label, handle }) => (
                    <div key={label} className="social-handle">
                      <span style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--mono)", fontSize: "0.65rem" }}>{label} </span>
                      <span>{handle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-copy">© 2023 Devcore · Dept. of Software Engineering, OAU</p>
              <p className="footer-by">Designed &amp; Built by <span>Light ⚡</span></p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ─────────────────────────── GLOBAL STYLES ─────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --bg: #080c10; --surface: #0d1117; --surface2: #111820;
        --border: rgba(255,255,255,0.07); --green: #1a4731; --green-mid: #2d7a4f;
        --green-bright: #00ff88; --gold: #f5a623; --gold-dim: rgba(245,166,35,0.15);
        --text: #e8edf2; --muted: rgba(232,237,242,0.45);
        --mono: 'Space Mono', monospace; --sans: 'Outfit', sans-serif;
      }
      body { background: var(--bg); color: var(--text); font-family: var(--sans); overflow-x: hidden; }
      body::before { content: ''; position: fixed; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px); pointer-events: none; z-index: 9999; }

      .transition-section { transition: opacity 0.7s ease, transform 0.7s ease; opacity: 0; transform: translateY(20px); }
      .transition-section.in-view { opacity: 1; transform: translateY(0); }

      /* LOGIN */
      .login-root { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
      .login-bg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%); }
      .login-glow { position: fixed; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(ellipse, rgba(26,71,49,0.4) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
      .login-card { position: relative; z-index: 1; background: var(--surface); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 420px; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
      .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem; }
      .login-logo { width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #1a4731, #2d7a4f); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 0.8rem; font-weight: 700; color: var(--gold); border: 1px solid rgba(0,255,136,0.15); flex-shrink: 0; }
      .login-brand-name { font-family: var(--mono); font-weight: 700; font-size: 1rem; color: var(--text); }
      .login-brand-sub { font-family: var(--mono); font-size: 0.62rem; color: var(--muted); letter-spacing: 0.05em; margin-top: 2px; }
      .login-divider { height: 1px; background: var(--border); margin-bottom: 1.75rem; }
      .login-title { font-family: var(--mono); font-weight: 700; font-size: 1.4rem; color: var(--text); margin-bottom: 0.5rem; }
      .login-desc { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.75rem; line-height: 1.6; }
      .login-field { margin-bottom: 1.1rem; }
      .login-field.focused .field-input-wrap { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(245,166,35,0.1); }
      .field-label { display: block; font-family: var(--mono); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
      .field-input-wrap { display: flex; align-items: center; gap: 10px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 0 14px; transition: border-color 0.2s, box-shadow 0.2s; }
      .field-icon { width: 16px; height: 16px; color: var(--muted); flex-shrink: 0; }
      .field-input { flex: 1; background: none; border: none; outline: none; font-family: var(--mono); font-size: 0.85rem; color: var(--text); padding: 13px 0; letter-spacing: 0.02em; }
      .field-input::placeholder { color: rgba(232,237,242,0.2); }
      .field-eye { background: none; border: none; cursor: pointer; color: var(--muted); display: flex; align-items: center; transition: color 0.2s; padding: 0; }
      .field-eye:hover { color: var(--text); }
      .login-error { display: flex; align-items: center; gap: 7px; background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.2); border-radius: 8px; padding: 10px 14px; font-family: var(--mono); font-size: 0.75rem; color: #ff8080; margin-bottom: 1rem; }
      .login-btn { width: 100%; padding: 14px; background: var(--gold); color: #080c10; border: none; border-radius: 10px; font-family: var(--mono); font-size: 0.85rem; font-weight: 700; cursor: pointer; letter-spacing: 0.05em; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 1.25rem; }
      .login-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,166,35,0.35); }
      .login-btn.loading { opacity: 0.7; cursor: not-allowed; }
      .login-spinner { width: 14px; height: 14px; border: 2px solid rgba(8,12,16,0.3); border-top-color: #080c10; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .login-hint { font-family: var(--mono); font-size: 0.68rem; color: var(--muted); text-align: center; line-height: 1.6; }
      .login-hint strong { color: var(--gold); }

      /* NAV */
      .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; transition: background 0.3s, border-color 0.3s; border-bottom: 1px solid transparent; }
      .nav.scrolled { background: rgba(8,12,16,0.92); backdrop-filter: blur(20px); border-color: var(--border); }
      .nav-brand { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-weight: 700; font-size: 1.1rem; color: var(--text); cursor: pointer; }
      .nav-logo { width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, #1a4731, #2d7a4f); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 0.7rem; color: var(--gold); border: 1px solid var(--border); }
      .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
      .nav-links button { background: none; border: none; cursor: pointer; font-family: var(--sans); font-size: 0.85rem; color: var(--muted); transition: color 0.2s; }
      .nav-links button:hover { color: var(--gold); }
      .nav-user { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 100px; padding: 5px 14px 5px 5px; cursor: pointer; transition: border-color 0.2s; }
      .nav-user:hover { border-color: rgba(255,255,255,0.15); }
      .nav-avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, var(--green), var(--green-mid)); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 0.65rem; font-weight: 700; color: var(--gold); flex-shrink: 0; overflow: hidden; }
      .nav-user-info { display: flex; flex-direction: column; }
      .nav-user-name { font-size: 0.8rem; font-weight: 600; color: var(--text); line-height: 1.2; }
      .nav-user-matric { font-family: var(--mono); font-size: 0.6rem; color: var(--muted); }
      .nav-logout-btn { background: none; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; color: var(--muted); padding: 7px 10px; display: flex; align-items: center; transition: all 0.2s; }
      .nav-logout-btn:hover { border-color: rgba(255,80,80,0.3); color: #ff8080; }
      .admin-nav-btn { background: rgba(245,166,35,0.1); border: 1px solid rgba(245,166,35,0.25); border-radius: 8px; cursor: pointer; color: var(--gold); padding: 7px 14px; font-family: var(--mono); font-size: 0.72rem; font-weight: 700; transition: all 0.2s; display: flex; align-items: center; gap: 6px; position: relative; }
      .admin-nav-btn:hover { background: rgba(245,166,35,0.2); }
      .admin-badge { background: #ff4444; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 0.6rem; display: flex; align-items: center; justify-content: center; font-weight: 700; }
      .nav-burger { display: none; background: none; border: none; cursor: pointer; color: var(--text); }
      @media (max-width: 900px) { .nav-links { display: none; } }
      @media (max-width: 650px) { .nav-right { display: none !important; } .nav-burger { display: flex; } }
      .mobile-menu { position: fixed; inset: 64px 0 0 0; background: rgba(8,12,16,0.97); z-index: 99; display: flex; flex-direction: column; padding: 2rem; gap: 0.75rem; }
      .mobile-user { display: flex; align-items: center; gap: 12px; padding-bottom: 1rem; border-bottom: 1px solid var(--border); margin-bottom: 0.5rem; }
      .mobile-menu button { background: none; border: none; cursor: pointer; font-family: var(--sans); font-size: 1.1rem; color: var(--muted); text-align: left; padding: 0.4rem 0; transition: color 0.2s; }
      .mobile-menu button:hover { color: var(--gold); }

      /* MODAL */
      .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(10px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
      .modal { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 2rem; max-width: 360px; width: 100%; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
      .modal-title { font-family: var(--mono); font-weight: 700; font-size: 1.1rem; color: var(--text); margin-bottom: 0.5rem; }
      .modal-desc { font-size: 0.85rem; color: var(--muted); margin-bottom: 1.5rem; line-height: 1.6; }
      .modal-actions { display: flex; gap: 0.75rem; }
      .modal-cancel { flex: 1; padding: 11px; background: var(--surface2); border: 1px solid var(--border); border-radius: 8px; font-family: var(--mono); font-size: 0.8rem; color: var(--muted); cursor: pointer; transition: all 0.2s; }
      .modal-cancel:hover { border-color: rgba(255,255,255,0.15); color: var(--text); }
      .modal-confirm { flex: 1; padding: 11px; background: rgba(255,80,80,0.15); border: 1px solid rgba(255,80,80,0.25); border-radius: 8px; font-family: var(--mono); font-size: 0.8rem; color: #ff8080; cursor: pointer; transition: all 0.2s; font-weight: 700; }
      .modal-confirm:hover { background: rgba(255,80,80,0.25); }
      .modal-close-btn { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 1rem; padding: 4px 8px; border-radius: 6px; transition: all 0.2s; }
      .modal-close-btn:hover { color: var(--text); background: var(--surface2); }

      /* PROFILE MODAL */
      .profile-modal { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; max-width: 480px; width: 100%; box-shadow: 0 40px 100px rgba(0,0,0,0.6); max-height: 90vh; overflow-y: auto; }
      .profile-modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
      .profile-modal-title { font-family: var(--mono); font-weight: 700; font-size: 1.2rem; color: var(--text); }
      .profile-avatar-section { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; padding: 1.25rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 14px; }
      .profile-avatar-large { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--green), var(--green-mid)); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 1.4rem; font-weight: 700; color: var(--gold); flex-shrink: 0; overflow: hidden; border: 2px solid var(--border); }
      .profile-avatar-actions { flex: 1; }
      .profile-upload-btn { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; font-family: var(--mono); font-size: 0.72rem; color: var(--text); cursor: pointer; transition: all 0.2s; display: inline-block; }
      .profile-upload-btn:hover { border-color: var(--gold); color: var(--gold); }
      .profile-remove-btn { background: none; border: none; cursor: pointer; font-family: var(--mono); font-size: 0.68rem; color: #ff8080; margin-top: 6px; display: block; padding: 0; }
      .profile-fields { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; }
      .card-request-section { background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; }
      .card-section-title { font-family: var(--mono); font-size: 0.8rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem; }
      .card-request-btn { width: 100%; padding: 12px; background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.2); border-radius: 10px; font-family: var(--mono); font-size: 0.8rem; color: var(--green-bright); cursor: pointer; transition: all 0.2s; font-weight: 700; }
      .card-request-btn:hover { background: rgba(0,255,136,0.18); border-color: rgba(0,255,136,0.4); }
      .card-status { font-family: var(--mono); font-size: 0.78rem; padding: 10px 14px; border-radius: 8px; line-height: 1.5; }
      .card-status-pending { background: rgba(245,166,35,0.1); color: var(--gold); border: 1px solid rgba(245,166,35,0.2); }
      .card-status-approved { background: rgba(0,255,136,0.1); color: var(--green-bright); border: 1px solid rgba(0,255,136,0.2); }
      .card-status-rejected { background: rgba(255,80,80,0.1); color: #ff8080; border: 1px solid rgba(255,80,80,0.2); }

      /* ADMIN PANEL */
      .admin-panel { background: var(--surface); border: 1px solid rgba(245,166,35,0.2); border-radius: 20px; padding: 2rem; max-width: 560px; width: 100%; box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 40px rgba(245,166,35,0.05); max-height: 90vh; overflow-y: auto; }
      .admin-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
      .admin-stat { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 1rem; text-align: center; }
      .admin-stat span { display: block; font-family: var(--mono); font-size: 1.6rem; font-weight: 700; color: var(--gold); }
      .admin-stat { font-size: 0.72rem; color: var(--muted); font-family: var(--mono); }
      .admin-req-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 0.75rem; }
      .admin-req-avatar { width: 44px; height: 44px; border-radius: 10px; background: var(--gold-dim); color: var(--gold); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 0.9rem; font-weight: 700; flex-shrink: 0; }
      .admin-approve-btn { background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.25); border-radius: 8px; padding: 8px 12px; font-family: var(--mono); font-size: 0.72rem; color: var(--green-bright); cursor: pointer; font-weight: 700; transition: all 0.2s; white-space: nowrap; }
      .admin-approve-btn:hover { background: rgba(0,255,136,0.2); }
      .admin-reject-btn { background: rgba(255,80,80,0.1); border: 1px solid rgba(255,80,80,0.25); border-radius: 8px; padding: 8px 12px; font-family: var(--mono); font-size: 0.72rem; color: #ff8080; cursor: pointer; font-weight: 700; transition: all 0.2s; white-space: nowrap; }
      .admin-reject-btn:hover { background: rgba(255,80,80,0.2); }
      .admin-hero-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(245,166,35,0.15); border: 1px solid rgba(245,166,35,0.3); padding: 5px 14px; border-radius: 100px; font-family: var(--mono); font-size: 0.68rem; color: var(--gold); letter-spacing: 0.1em; margin-bottom: 1rem; animation: pulse-gold 2s ease-in-out infinite; }
      @keyframes pulse-gold { 0%, 100% { box-shadow: 0 0 0 0 rgba(245,166,35,0.2); } 50% { box-shadow: 0 0 0 8px rgba(245,166,35,0); } }

      /* HERO */
      .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 112px 2rem 4rem; position: relative; overflow: hidden; text-align: center; }
      .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,255,136,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%); }
      .hero-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(ellipse, rgba(26,71,49,0.5) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -60%); pointer-events: none; }
      .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(26,71,49,0.4); border: 1px solid rgba(0,255,136,0.2); padding: 6px 16px; border-radius: 100px; font-family: var(--mono); font-size: 0.7rem; color: var(--green-bright); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2rem; }
      .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-bright); animation: pulse 1.5s ease-in-out infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
      .hero-title { font-family: var(--mono); font-size: clamp(2.8rem, 8vw, 6rem); font-weight: 700; line-height: 0.95; color: var(--text); margin-bottom: 1.5rem; }
      .hero-title .highlight { color: var(--gold); }
      .hero-sub { font-size: 1.05rem; color: var(--muted); max-width: 520px; line-height: 1.75; margin-bottom: 1rem; }
      .hero-welcome { font-size: 0.9rem; color: var(--green-bright); margin-bottom: 1.75rem; background: rgba(0,255,136,0.07); border: 1px solid rgba(0,255,136,0.15); padding: 8px 20px; border-radius: 100px; display: inline-block; }
      .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
      .btn-primary { background: var(--gold); color: #080c10; border: none; padding: 14px 28px; border-radius: 8px; font-family: var(--mono); font-size: 0.8rem; font-weight: 700; cursor: pointer; letter-spacing: 0.05em; transition: all 0.2s; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,166,35,0.3); }
      .btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border); padding: 14px 28px; border-radius: 8px; font-family: var(--mono); font-size: 0.8rem; cursor: pointer; letter-spacing: 0.05em; transition: all 0.2s; }
      .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }
      .hero-stats { display: flex; gap: 2.5rem; margin-top: 4rem; flex-wrap: wrap; justify-content: center; }
      .stat { text-align: center; }
      .stat-num { font-family: var(--mono); font-size: 2rem; font-weight: 700; color: var(--gold); display: block; }
      .stat-label { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
      .hero-scroll { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--muted); font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; animation: bounce 2s ease-in-out infinite; }
      @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
      @keyframes float-particle { 0% { transform: translateY(0px) translateX(0px); opacity: 0.2; } 100% { transform: translateY(-18px) translateX(8px); opacity: 0.5; } }
      @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }

      /* SHARED */
      .section-wrap { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }
      .section-label { font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); display: block; margin-bottom: 0.75rem; }
      .section-title { font-family: var(--mono); font-size: clamp(1.6rem, 4vw, 2.6rem); font-weight: 700; line-height: 1.15; color: var(--text); }
      .section-title .dim { color: var(--muted); }

      /* ABOUT */
      .about-section { padding: 7rem 0; border-top: 1px solid var(--border); }
      .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
      @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 3rem; } }
      .about-text p { color: var(--muted); line-height: 1.8; margin-top: 1.5rem; }
      .about-terminal { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
      .terminal-bar { background: var(--surface2); padding: 10px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid var(--border); }
      .t-dot { width: 10px; height: 10px; border-radius: 50%; }
      .terminal-body { padding: 1.5rem; font-family: var(--mono); font-size: 0.8rem; line-height: 2; }
      .t-green { color: var(--green-bright); } .t-gold { color: var(--gold); } .t-muted { color: var(--muted); }
      .t-cursor { display: inline-block; width: 8px; height: 14px; background: var(--gold); vertical-align: middle; animation: blink 1s step-end infinite; }
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

      /* COURSES */
      .courses-section { padding: 7rem 0; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
      .courses-section::before { content: 'RAIN SEMESTER'; position: absolute; right: -2rem; top: 3rem; font-family: var(--mono); font-size: 5rem; font-weight: 700; color: rgba(255,255,255,0.025); white-space: nowrap; pointer-events: none; user-select: none; }
      .courses-header { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 3rem; }
      .courses-meta { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
      .courses-summary { background: rgba(245,166,35,0.1); border: 1px solid rgba(245,166,35,0.2); border-radius: 8px; padding: 10px 20px; font-family: var(--mono); font-size: 0.8rem; color: var(--gold); }
      .filter-btns { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .filter-btn { background: none; border: 1px solid var(--border); padding: 7px 18px; border-radius: 100px; font-family: var(--mono); font-size: 0.7rem; color: var(--muted); cursor: pointer; transition: all 0.2s; letter-spacing: 0.05em; }
      .filter-btn.active { background: var(--gold); color: #080c10; border-color: var(--gold); font-weight: 700; }
      .filter-btn:not(.active):hover { border-color: rgba(255,255,255,0.2); color: var(--text); }
      .courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
      .course-card { border-radius: 12px; padding: 1.5rem; transition: all 0.25s ease; cursor: default; animation: fadeUp 0.5s ease both; }
      @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      .course-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
      .course-code { font-family: var(--mono); font-size: 0.75rem; font-weight: 700; border: 1px solid; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.08em; }
      .course-units { font-family: var(--mono); font-size: 0.8rem; font-weight: 700; }
      .course-title { font-family: var(--sans); font-weight: 600; font-size: 0.95rem; color: var(--text); line-height: 1.4; margin-bottom: 1rem; }
      .course-meta { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .meta-chip { font-family: var(--mono); font-size: 0.65rem; background: rgba(255,255,255,0.06); color: var(--muted); padding: 3px 8px; border-radius: 4px; letter-spacing: 0.05em; }
      .meta-chip.prereq { background: rgba(245,166,35,0.1); color: rgba(245,166,35,0.8); }
      .courses-total { margin-top: 2rem; display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; }
      .total-label { font-family: var(--mono); font-size: 0.75rem; color: var(--gold); white-space: nowrap; }

      /* WHAT WE DO */
      .wwd-section { padding: 7rem 0; border-top: 1px solid var(--border); }
      .wwd-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1px; margin-top: 3.5rem; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
      .wwd-card { background: var(--surface); padding: 2.5rem 2rem; transition: background 0.2s; position: relative; }
      .wwd-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.3s; transform-origin: left; }
      .wwd-card:hover { background: var(--surface2); }
      .wwd-card:hover::after { transform: scaleX(1); }
      .wwd-icon { font-family: var(--mono); font-size: 1.8rem; color: var(--gold); margin-bottom: 1.25rem; display: block; }
      .wwd-title { font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.75rem; }
      .wwd-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; }

      /* EVENTS */
      .events-section { padding: 7rem 0; background: var(--surface); border-top: 1px solid var(--border); }
      .events-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 3rem; }
      .event-card { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 1.75rem; transition: all 0.25s; }
      .event-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
      .event-tag { display: inline-block; font-family: var(--mono); font-size: 0.65rem; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 1rem; }
      .event-name { font-weight: 700; font-size: 1.05rem; color: var(--text); margin-bottom: 0.75rem; }
      .event-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.25rem; }
      .event-date { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); }

      /* RESOURCES */
      .res-section { padding: 7rem 0; border-top: 1px solid var(--border); }
      .res-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; margin-top: 3rem; }
      .res-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; transition: all 0.25s; cursor: pointer; position: relative; overflow: hidden; }
      .res-card::before { content: '↗'; position: absolute; top: 1rem; right: 1rem; font-size: 1rem; color: var(--muted); transition: color 0.2s, transform 0.2s; }
      .res-card:hover { border-color: rgba(245,166,35,0.3); background: var(--surface2); }
      .res-card:hover::before { color: var(--gold); transform: translate(2px, -2px); }
      .res-card[data-link="true"] { border-color: rgba(245,166,35,0.18); background: linear-gradient(135deg, rgba(245,166,35,0.04) 0%, var(--surface) 100%); }
      .res-card[data-link="true"]:hover { border-color: rgba(245,166,35,0.5); box-shadow: 0 0 30px rgba(245,166,35,0.08); }
      .res-type { font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.1em; color: var(--gold); background: var(--gold-dim); border-radius: 4px; padding: 3px 8px; display: inline-block; margin-bottom: 1rem; }
      .res-title { font-weight: 700; font-size: 0.95rem; color: var(--text); margin-bottom: 0.75rem; }
      .res-desc { font-size: 0.83rem; color: var(--muted); line-height: 1.7; }

      /* TEAM */
      .team-section { padding: 7rem 0; background: var(--surface); border-top: 1px solid var(--border); }
      .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.5rem; max-width: 700px; margin: 3rem auto 0; }
      .team-card { text-align: center; }
      .team-avatar { width: 72px; height: 72px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 1.1rem; font-weight: 700; color: #080c10; margin: 0 auto 0.75rem; transition: transform 0.2s; overflow: hidden; }
      .team-card:hover .team-avatar { transform: translateY(-4px); }
      .team-name { font-weight: 700; font-size: 0.9rem; color: var(--text); }
      .team-role { font-family: var(--mono); font-size: 0.7rem; color: var(--muted); margin-top: 4px; }
      .join-cta { margin-top: 5rem; border-radius: 16px; padding: 4rem 2rem; text-align: center; background: var(--bg); border: 1px solid var(--border); position: relative; overflow: hidden; }
      .join-cta::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(26,71,49,0.5), transparent); pointer-events: none; }
      .join-title { font-family: var(--mono); font-size: clamp(1.4rem, 4vw, 2rem); font-weight: 700; color: var(--text); margin-bottom: 0.75rem; position: relative; }
      .join-sub { color: var(--muted); font-size: 0.9rem; margin-bottom: 2rem; position: relative; }

      /* FOOTER */
      .footer { background: #040608; padding: 4rem 2rem 2rem; border-top: 1px solid var(--border); }
      .footer-inner { max-width: 1100px; margin: 0 auto; }
      .footer-top { display: grid; grid-template-columns: 1fr auto; gap: 4rem; padding-bottom: 2.5rem; border-bottom: 1px solid var(--border); }
      @media (max-width: 600px) { .footer-top { grid-template-columns: 1fr; gap: 2rem; } }
      .footer-brand { font-family: var(--mono); font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 10px; }
      .footer-sub { font-size: 0.82rem; color: var(--muted); line-height: 1.7; max-width: 280px; }
      .footer-links-wrap { display: flex; gap: 3rem; }
      .footer-col p.col-head { font-family: var(--mono); font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 1rem; }
      .footer-col button { display: block; background: none; border: none; cursor: pointer; font-size: 0.82rem; color: var(--muted); margin-bottom: 0.6rem; transition: color 0.2s; font-family: var(--sans); }
      .footer-col button:hover { color: var(--gold); }
      .social-handle { font-size: 0.8rem; color: rgba(255,255,255,0.35); display: block; margin-bottom: 0.5rem; }
      .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; flex-wrap: wrap; gap: 1rem; }
      .footer-copy { font-family: var(--mono); font-size: 0.65rem; color: rgba(255,255,255,0.2); }
      .footer-by { font-family: var(--mono); font-size: 0.65rem; color: rgba(255,255,255,0.15); }
      .footer-by span { color: var(--gold); }
    `}</style>
  );
}