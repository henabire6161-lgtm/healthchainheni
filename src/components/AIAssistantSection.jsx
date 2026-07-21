import { useState, useEffect, useRef } from "react";
import { Heart, Bell, Lock, ClipboardList, ShieldAlert, Clock, Send, Sparkles } from "lucide-react";
import "./AIAssistantSection.css";

// Content for both sides of the assistant. Edit copy here — layout stays untouched.
const DATA = {
  patient: {
    who: "HealthChain Assistant",
    sub: "Linked to your Fayda ID · Amharic / English",
    field: "Ask about your results, meds, or visits…",
    props: [
      {
        Icon: Heart,
        title: "Ask about your own record",
        text: "Results, medications, and next steps explained in plain Amharic or English — grounded in your actual visits, not general advice.",
      },
      {
        Icon: Bell,
        title: "Reminders that know your plan",
        text: "Appointment and medication reminders tied to your Fayda ID, not a generic schedule.",
      },
      {
        Icon: Lock,
        title: "Nothing shared without consent",
        text: "You control who sees your record. The assistant reads it; it doesn't hand it out.",
      },
    ],
    chat: [
      { role: "user", tag: "You · 6:42 PM", text: "Why did the doctor change my blood pressure medicine?" },
      { role: "ai", tag: "Assistant", text: "At your visit on June 2, your blood pressure was 152/95 — above target. Dr. Bekele switched you from Lisinopril to Amlodipine because of possible side effects noted in your file. Your next check-in is in 2 weeks." },
      { role: "user", tag: "You · 6:43 PM", text: "Should I take the new one with food?" },
      { role: "ai", tag: "Assistant", text: "Amlodipine can be taken with or without food, at the same time each day. If you notice swelling in your ankles, mention it at your next visit." },
    ],
  },
  provider: {
    who: "HealthChain Clinical Assistant",
    sub: "Session · Dr. H. Mekonen · Adama Health Center",
    field: "Speak or type the encounter…",
    props: [
      {
        Icon: ClipboardList,
        title: "Encounter to structured record",
        text: "Turns a spoken or typed encounter into a FHIR-compliant entry, ready for your signature — not a blank form.",
      },
      {
        Icon: ShieldAlert,
        title: "Checks against the full history",
        text: "Flags likely differentials and drug interactions against the patient's complete signed record, not just today's visit.",
      },
      {
        Icon: Clock,
        title: "Cuts documentation time",
        text: "Targets the single biggest reason facilities fall behind on MOH reporting: time spent typing, not treating.",
      },
    ],
    chat: [
      { role: "user", tag: "Dr. Mekonen · Encounter", text: "39F, 3-day fever, joint pain, rash on both forearms. Rapid malaria test negative." },
      { role: "ai", tag: "Assistant", text: "Noted. Patient's record shows travel to Jimma 2 weeks ago. Given rash + arthralgia + travel history, consider chikungunya or dengue in the differential alongside typhoid. Suggest CBC and dengue NS1 antigen." },
      { role: "user", tag: "Dr. Mekonen", text: "Agreed, ordering both. Draft the note." },
      { role: "ai", tag: "Assistant", text: "Structured encounter note drafted — chief complaint, exam findings, differential, and orders filled in. Ready for your review and signature before it's written to the record." },
    ],
  },
};

function ChatPanel({ mode }) {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setVisible([]);
    setTyping(false);

    const chat = DATA[mode].chat;
    let delay = 300;

    chat.forEach((msg, i) => {
      if (msg.role === "ai") {
        timers.current.push(setTimeout(() => setTyping(true), delay));
        delay += 650;
        timers.current.push(
          setTimeout(() => {
            setTyping(false);
            setVisible((v) => [...v, msg]);
          }, delay)
        );
        delay += 150;
      } else {
        timers.current.push(setTimeout(() => setVisible((v) => [...v, msg]), delay));
        delay += 450;
      }
    });

    return () => timers.current.forEach(clearTimeout);
  }, [mode]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [visible, typing]);

  return (
    <div className="hc-phone-body" ref={bodyRef}>
      {visible.map((msg, i) => (
        <div key={i} className={`hc-bubble hc-bubble--${msg.role}`}>
          <span className="hc-bubble-tag">{msg.tag}</span>
          {msg.text}
        </div>
      ))}
      {typing && (
        <div className="hc-typing">
          <span></span><span></span><span></span>
        </div>
      )}
    </div>
  );
}

export default function AIAssistantSection() {
  const [mode, setMode] = useState("patient");
  const d = DATA[mode];

  return (
    <section className="hc-ai-section">
      <div className="hc-ai-wrap">
        <span className="hc-eyebrow">
          <Sparkles size={13} strokeWidth={2.4} />
          New — HealthChain Assistant
        </span>

        <h2 className="hc-ai-title">
          One assistant. <em>Two sides</em> of the same record.
        </h2>
        <p className="hc-ai-lede">
          Patients get answers grounded in their own verified history. Providers get documentation
          support that turns a visit into a structured, signed record — without extra typing. Same
          platform, same trust layer, different job.
        </p>

        <div className="hc-toggle" data-mode={mode}>
          <span className="hc-toggle-pill" />
          <button
            className={mode === "patient" ? "active" : ""}
            onClick={() => setMode("patient")}
            type="button"
          >
            For patients
          </button>
          <button
            className={mode === "provider" ? "active" : ""}
            onClick={() => setMode("provider")}
            type="button"
          >
            For providers
          </button>
        </div>

        <div className="hc-ai-grid">
          <div className="hc-props">
            {d.props.map(({ Icon, title, text }, i) => (
              <div className="hc-prop" key={title} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="hc-prop-icon">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="hc-prop-title">{title}</p>
                  <p className="hc-prop-text">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hc-phone-stage">
            <div className="hc-phone">
              <div className="hc-phone-head">
                <div className="hc-avatar">HC</div>
                <div>
                  <div className="hc-head-who">{d.who}</div>
                  <div className="hc-head-sub">{d.sub}</div>
                </div>
              </div>
              <ChatPanel mode={mode} />
              <div className="hc-phone-foot">
                <div className="hc-field">{d.field}</div>
                <div className="hc-send">
                  <Send size={14} strokeWidth={2.4} />
                </div>
              </div>
            </div>
            <div className="hc-stage-caption">Illustrative conversation — not a live system</div>
          </div>
        </div>

        <div className="hc-footnote">
          <b>Design note for review:</b> both assistants read only from the signed HealthChain
          record for the identity in front of them — a patient's assistant cannot see another
          patient's data, and a provider's assistant only sees patients under that provider's
          active care. Consent management and audit logging for AI-assisted entries are being
          scoped alongside the Ministry's PDPP review, not bolted on afterward.
        </div>

        <svg className="hc-divider" viewBox="0 0 1180 34" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,17 L120,17 L132,17 A6,6 0 0 1 138,11 A6,6 0 0 1 144,17 L156,17 L168,17 A6,6 0 0 1 174,11 A6,6 0 0 1 180,17 L300,17 L320,17 L330,4 L340,30 L350,17 L370,17 L500,17 L512,17 A6,6 0 0 1 518,11 A6,6 0 0 1 524,17 L536,17 L548,17 A6,6 0 0 1 554,11 A6,6 0 0 1 560,17 L680,17 L700,17 L710,4 L720,30 L730,17 L750,17 L880,17 L892,17 A6,6 0 0 1 898,11 A6,6 0 0 1 904,17 L916,17 L928,17 A6,6 0 0 1 934,11 A6,6 0 0 1 940,17 L1060,17 L1080,17 L1090,4 L1100,30 L1110,17 L1180,17"
            fill="none"
            stroke="var(--hc-forest)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
