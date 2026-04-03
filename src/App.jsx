import { useMemo, useState } from "react";

const initialVoicemails = [
  {
    id: 1,
    callerName: "Maria Lopez",
    phoneNumber: "(415) 555-0198",
    receivedAt: "2026-04-03T09:42:00",
    urgency: "HIGH",
    intentLabel: "Chest Pain Follow-up",
    summary:
      "Reports chest pressure returned overnight after recent discharge; asks if she should come in now.",
    duration: "01:34",
    clinicLocation: "Downtown Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: true,
    note: "",
    whatCallerWants:
      "Wants immediate guidance on whether symptoms require urgent evaluation today.",
    keyDetails: [
      "Recent ER discharge 2 days ago",
      "Chest pressure 6/10 since 3 AM",
      "No fainting, mild shortness of breath",
    ],
    suggestedNextStep:
      "Escalate to on-call GP immediately and advise urgent in-person assessment.",
    confidenceNote:
      "Possible high-risk symptoms; age and cardiac history not clearly stated.",
    transcript:
      "Hi, this is Maria Lopez. I was discharged on Wednesday and my chest pressure came back around three this morning. It's not severe but it's definitely there and I'm a bit short of breath. Can someone tell me if I should go to urgent care or come to the clinic right away? Please call me back soon.",
  },
  {
    id: 2,
    callerName: "Devon Patel",
    phoneNumber: "(415) 555-0142",
    receivedAt: "2026-04-03T08:10:00",
    urgency: "MEDIUM",
    intentLabel: "Medication Refill",
    summary:
      "Needs refill for blood pressure medication; only one dose remaining.",
    duration: "00:52",
    clinicLocation: "Northside Family Health",
    status: "In Progress",
    assignedStaff: "Nurse Kelly",
    needsGP: false,
    note: "Pharmacy verified.",
    whatCallerWants:
      "Requests same-day refill authorization sent to preferred pharmacy.",
    keyDetails: [
      "Medication: Lisinopril 20 mg",
      "One tablet left",
      "No new symptoms reported",
    ],
    suggestedNextStep:
      "Route to prescribing clinician for refill authorization before end of day.",
    confidenceNote: "",
    transcript:
      "Hello, this is Devon Patel. I'm calling because I'm almost out of my lisinopril twenty milligrams. I only have one pill for tomorrow. Can you please send a refill to the Walgreens on Market Street? Thank you.",
  },
  {
    id: 3,
    callerName: "Elaine Brooks",
    phoneNumber: "(628) 555-0124",
    receivedAt: "2026-04-03T11:03:00",
    urgency: "LOW",
    intentLabel: "Lab Result Question",
    summary:
      "Asks for explanation of recent thyroid lab values shown in patient portal.",
    duration: "01:12",
    clinicLocation: "East Bay Internal Medicine",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    whatCallerWants:
      "Would like callback to understand whether TSH result is concerning.",
    keyDetails: [
      "Portal shows TSH slightly elevated",
      "No severe symptoms mentioned",
      "Available after 2 PM for callback",
    ],
    suggestedNextStep:
      "Assign to RN for initial explanation and flag GP if medication change is needed.",
    confidenceNote: "",
    transcript:
      "Hi, this is Elaine Brooks. I saw my thyroid numbers in the portal and I don't really understand them. My TSH looked highlighted and I'm wondering if I need to change anything. If someone can call me after two this afternoon, that would help.",
  },
  {
    id: 4,
    callerName: "Jordan Kim",
    phoneNumber: "(415) 555-0177",
    receivedAt: "2026-04-03T10:15:00",
    urgency: "HIGH",
    intentLabel: "Post-op Fever",
    summary:
      "Developed fever and increasing pain at incision site after outpatient procedure.",
    duration: "01:58",
    clinicLocation: "Downtown Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: true,
    note: "",
    whatCallerWants:
      "Needs urgent advice on possible infection after procedure yesterday.",
    keyDetails: [
      "Temperature reported at 101.8 F",
      "Redness around incision",
      "Procedure: cyst removal yesterday",
    ],
    suggestedNextStep:
      "Immediate nurse triage and same-day surgical follow-up slot or ER guidance.",
    confidenceNote:
      "Caller did not confirm current medications or antibiotic use.",
    transcript:
      "This is Jordan Kim. I had a minor procedure yesterday and now my incision is red and painful. I checked my temperature and it's one-oh-one point eight. I'm not sure if this is expected. Please call me right away and tell me if I need to come in.",
  },
  {
    id: 5,
    callerName: "Anthony Rivera",
    phoneNumber: "(510) 555-0111",
    receivedAt: "2026-04-03T07:54:00",
    urgency: "MEDIUM",
    intentLabel: "Appointment Reschedule",
    summary:
      "Needs to reschedule diabetes follow-up due to work conflict.",
    duration: "00:41",
    clinicLocation: "South Campus Clinic",
    status: "Done",
    assignedStaff: "Front Desk Sam",
    needsGP: false,
    note: "Moved to next Tuesday 9:30 AM.",
    whatCallerWants:
      "Requests alternative appointment time next week, mornings preferred.",
    keyDetails: [
      "Current appointment Monday 3 PM",
      "Prefers Tuesday or Wednesday morning",
      "No urgent medical concern reported",
    ],
    suggestedNextStep:
      "Front desk reschedule and confirm via text message.",
    confidenceNote: "",
    transcript:
      "Hi, Anthony Rivera here. I can't make my diabetes follow-up Monday afternoon because my shift changed. Could someone help move me to Tuesday or Wednesday morning next week? Thanks.",
  },
  {
    id: 6,
    callerName: "Rita Singh",
    phoneNumber: "(415) 555-0159",
    receivedAt: "2026-04-03T10:47:00",
    urgency: "LOW",
    intentLabel: "Vaccination Record",
    summary:
      "Requests copy of childhood immunization record for school form.",
    duration: "00:36",
    clinicLocation: "Northside Family Health",
    status: "In Progress",
    assignedStaff: "Admin Jo",
    needsGP: false,
    note: "",
    whatCallerWants:
      "Needs electronic record sent before school deadline tomorrow.",
    keyDetails: [
      "Form due tomorrow by noon",
      "Prefers secure portal upload",
      "No clinical question",
    ],
    suggestedNextStep:
      "Admin team to release immunization summary through patient portal.",
    confidenceNote: "",
    transcript:
      "Hello, this is Rita Singh. I need my vaccination record for a school form and the deadline is tomorrow. Can you upload it to my portal today please?",
  },
  {
    id: 7,
    callerName: "Thomas Greene",
    phoneNumber: "(628) 555-0138",
    receivedAt: "2026-04-03T09:18:00",
    urgency: "HIGH",
    intentLabel: "Breathing Difficulty",
    summary:
      "Reports worsening wheezing despite inhaler use; asks for immediate callback.",
    duration: "01:21",
    clinicLocation: "East Bay Internal Medicine",
    status: "In Progress",
    assignedStaff: "Nurse Kelly",
    needsGP: true,
    note: "Attempted callback once; no answer.",
    whatCallerWants:
      "Needs urgent direction for asthma symptoms not improving at home.",
    keyDetails: [
      "Rescue inhaler used 3 times this morning",
      "Speaking in short sentences on voicemail",
      "No home pulse-ox value provided",
    ],
    suggestedNextStep:
      "Second urgent callback now; if unreachable, send emergency instruction text.",
    confidenceNote:
      "Severity uncertain because exact breathing rate and oxygen status unavailable.",
    transcript:
      "This is Thomas Greene. My breathing is getting tighter and my inhaler isn't helping much today. I've used it three times already. Please call me right away and let me know if I should go to urgent care.",
  },
  {
    id: 8,
    callerName: "Nora Williams",
    phoneNumber: "(415) 555-0162",
    receivedAt: "2026-04-03T06:33:00",
    urgency: "MEDIUM",
    intentLabel: "UTI Symptoms",
    summary:
      "Describes painful urination and frequency; requests same-day visit.",
    duration: "01:05",
    clinicLocation: "South Campus Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    whatCallerWants:
      "Wants testing and treatment today due to worsening discomfort.",
    keyDetails: [
      "Symptoms started last night",
      "No flank pain reported",
      "Asks for earliest appointment",
    ],
    suggestedNextStep:
      "Nurse protocol triage and offer urgent same-day slot.",
    confidenceNote: "",
    transcript:
      "Hi, this is Nora Williams. I think I have a urinary infection. It burns when I pee and I'm going every few minutes. Could I come in today for a test and medication?",
  },
  {
    id: 9,
    callerName: "Caleb Turner",
    phoneNumber: "(510) 555-0106",
    receivedAt: "2026-04-03T11:22:00",
    urgency: "LOW",
    intentLabel: "Billing Clarification",
    summary:
      "Questions duplicate copay charge listed on last statement.",
    duration: "00:49",
    clinicLocation: "Downtown Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    whatCallerWants:
      "Wants billing team to explain and correct potential duplicate charge.",
    keyDetails: [
      "Statement date: March 28",
      "Two copay charges shown",
      "Requesting callback after 4 PM",
    ],
    suggestedNextStep:
      "Assign to billing queue and confirm charge history.",
    confidenceNote: "",
    transcript:
      "Hello, Caleb Turner calling. I reviewed my statement and it looks like I was charged my copay twice for the same visit. Could someone from billing call me back this afternoon?",
  },
  {
    id: 10,
    callerName: "Grace Chen",
    phoneNumber: "(415) 555-0184",
    receivedAt: "2026-04-03T08:56:00",
    urgency: "MEDIUM",
    intentLabel: "Pediatric Rash",
    summary:
      "Parent reports spreading rash in child with mild fever; asks if urgent care is needed.",
    duration: "01:40",
    clinicLocation: "Northside Family Health",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: true,
    note: "",
    whatCallerWants:
      "Needs guidance on urgency and whether child should be seen today.",
    keyDetails: [
      "Child age 6",
      "Rash on trunk and arms",
      "Temperature around 100.4 F",
    ],
    suggestedNextStep:
      "Route to pediatric nurse triage and provide home red-flag instructions.",
    confidenceNote:
      "No photo available; rash characteristics (raised, blanching) not provided.",
    transcript:
      "Hi, this is Grace Chen. My son woke up with a rash on his chest and now it's on his arms too. He has a low fever. I'm not sure if this can wait or if he should be seen today. Please call me back as soon as possible.",
  },
];

const urgencyRank = { HIGH: 0, MEDIUM: 1, LOW: 2 };
const statusOptions = ["Unreviewed", "In Progress", "Done"];
const staffOptions = [
  "Unassigned",
  "Nurse Kelly",
  "Nurse Omar",
  "Dr. Singh",
  "Dr. Patel",
  "Front Desk Sam",
  "Admin Jo",
  "Billing Team",
];

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function App() {
  const [voicemails, setVoicemails] = useState(initialVoicemails);
  const [expandedId, setExpandedId] = useState(null);
  const [transcriptOpenById, setTranscriptOpenById] = useState({});

  const sortedVoicemails = useMemo(() => {
    const copy = [...voicemails];
    copy.sort((a, b) => {
      const urgencyDiff = urgencyRank[a.urgency] - urgencyRank[b.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;
      return new Date(b.receivedAt) - new Date(a.receivedAt);
    });
    return copy;
  }, [voicemails]);

  const updateVoicemail = (id, changes) => {
    setVoicemails((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );
  };

  const toggleExpanded = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleTranscript = (id) => {
    setTranscriptOpenById((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const doneCount = voicemails.filter((v) => v.status === "Done").length;
  const inProgressCount = voicemails.filter(
    (v) => v.status === "In Progress"
  ).length;
  const unreviewedCount = voicemails.filter(
    (v) => v.status === "Unreviewed"
  ).length;
  const highUrgencyCount = voicemails.filter(
    (v) => v.urgency === "HIGH"
  ).length;
  const needsGPCount = voicemails.filter((v) => v.needsGP).length;

  return (
    <div className="app">
      <style>{`
        :root {
          --bg: #f5f7f8;
          --panel: #ffffff;
          --border: #d9dee3;
          --text: #1f2933;
          --muted: #62717f;
          /* Urgency palette: muted, clinical — no bright accents */
          --urg-high-fg: #4a2626;
          --urg-high-border: #6d3a3a;
          --urg-high-bg: #ebe2e1;
          --urg-high-row: #f3eded;
          --urg-high-row-hover: #e9dfdd;
          --urg-high-row-open: #e4d7d5;
          --urg-med-fg: #4d4328;
          --urg-med-border: #73653f;
          --urg-med-bg: #e8e4d8;
          --urg-med-row: #f5f3eb;
          --urg-med-row-hover: #ece8dc;
          --urg-med-row-open: #e6e2d4;
          --urg-low-fg: #5c6670;
          --urg-low-border: #c8cfd4;
          --urg-low-bg: #f2f4f6;
          --urg-low-row: #fafbfb;
          --urg-low-row-hover: #f1f3f4;
          --urg-low-row-open: #eef1f2;
          --row-hover: #f2f5f7;
          --detail-bg: #f8fafb;
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          font-size: 12px;
          line-height: 1.3;
          color: var(--text);
          background: var(--bg);
          -webkit-font-smoothing: antialiased;
        }
        .app { padding: 8px 10px 10px; max-width: 100%; margin: 0 auto; }
        .header { margin-bottom: 6px; }
        .title { margin: 0; font-size: 17px; font-weight: 650; line-height: 1.2; letter-spacing: -0.01em; }
        .subtitle { margin: 2px 0 6px; color: var(--muted); font-size: 11px; line-height: 1.35; }
        .headerSummary {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 0 0 8px;
        }
        .headerSummaryItem {
          flex: 1 1 140px;
          min-width: 120px;
          max-width: 240px;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 6px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .headerSummaryLabel {
          font-size: 10px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.2;
        }
        .headerSummaryValue {
          font-size: 20px;
          font-weight: 650;
          color: var(--text);
          line-height: 1.15;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        .stats { display: flex; gap: 5px; flex-wrap: wrap; font-size: 11px; color: #344351; line-height: 1.25; }
        .stat { background: var(--panel); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; }
        .tableWrap { border: 1px solid var(--border); border-radius: 6px; background: var(--panel); overflow: auto; max-height: calc(100vh - 118px); }
        table { width: 100%; border-collapse: collapse; min-width: 1240px; }
        thead th {
          position: sticky;
          top: 0;
          z-index: 2;
          background: #f0f4f6;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          color: #32404d;
          padding: 4px 6px;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
          line-height: 1.25;
        }
        tbody td {
          font-size: 12px;
          line-height: 1.32;
          padding: 3px 6px;
          border-bottom: 1px solid #edf1f4;
          vertical-align: top;
        }
        tbody tr.data-row { cursor: pointer; }
        tbody tr.data-row.row-urgency-HIGH { background: var(--urg-high-row); }
        tbody tr.data-row.row-urgency-HIGH:hover { background: var(--urg-high-row-hover); }
        tbody tr.data-row.row-urgency-HIGH.row-open { background: var(--urg-high-row-open); }
        tbody tr.data-row.row-urgency-MEDIUM { background: var(--urg-med-row); }
        tbody tr.data-row.row-urgency-MEDIUM:hover { background: var(--urg-med-row-hover); }
        tbody tr.data-row.row-urgency-MEDIUM.row-open { background: var(--urg-med-row-open); }
        tbody tr.data-row.row-urgency-LOW { background: var(--urg-low-row); }
        tbody tr.data-row.row-urgency-LOW:hover { background: var(--urg-low-row-hover); }
        tbody tr.data-row.row-urgency-LOW.row-open { background: var(--urg-low-row-open); }
        .expander {
          font-size: 11px;
          line-height: 1.2;
          color: #3c4b59;
          width: 22px;
          padding: 3px 2px !important;
          text-align: center;
          vertical-align: middle;
        }
        .expander-accent-HIGH { box-shadow: inset 3px 0 0 var(--urg-high-border); }
        .expander-accent-MEDIUM { box-shadow: inset 2px 0 0 var(--urg-med-border); }
        .expander-accent-LOW { box-shadow: inset 1px 0 0 var(--urg-low-border); }
        .phone, .duration, .time { white-space: nowrap; color: #2d3945; }
        .summary { max-width: 340px; color: #293643; word-wrap: break-word; }
        .badge {
          display: inline-block;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .urgency-HIGH {
          color: var(--urg-high-fg);
          background: var(--urg-high-bg);
          border: 1px solid #a88886;
          padding: 2px 6px;
          box-shadow: 0 0 0 1px rgba(74, 38, 38, 0.06);
        }
        .urgency-MEDIUM {
          color: var(--urg-med-fg);
          background: var(--urg-med-bg);
          border: 1px solid #b0a88f;
          padding: 1px 6px;
        }
        .urgency-LOW {
          color: var(--urg-low-fg);
          background: transparent;
          border: 1px solid #dce1e5;
          padding: 1px 5px;
          font-weight: 500;
          letter-spacing: 0.03em;
        }
        select, input[type="text"] {
          width: 100%;
          font-size: 11px;
          line-height: 1.25;
          padding: 2px 4px;
          border: 1px solid #c8d1d9;
          border-radius: 3px;
          background: #fff;
          color: #24313d;
        }
        input[type="checkbox"] { transform: scale(0.95); cursor: pointer; vertical-align: middle; }
        .noteInput { min-width: 0; }
        .detailCell {
          border-bottom: 1px solid var(--border);
          padding: 8px 8px 8px 10px;
        }
        .detailCell.detailCell-HIGH {
          background: #ede6e5;
          box-shadow: inset 3px 0 0 var(--urg-high-border);
        }
        .detailCell.detailCell-MEDIUM {
          background: #eeebdf;
          box-shadow: inset 2px 0 0 var(--urg-med-border);
        }
        .detailCell.detailCell-LOW {
          background: #f5f6f7;
          box-shadow: inset 1px 0 0 var(--urg-low-border);
        }
        .detailGrid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 8px;
          margin-bottom: 6px;
        }
        .detailBlock {
          background: #fff;
          border: 1px solid #dde4ea;
          border-radius: 4px;
          padding: 7px 8px;
        }
        .detailBlock h4 {
          margin: 0 0 3px;
          font-size: 10px;
          color: #334455;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.2;
        }
        .detailBlock p, .detailBlock li {
          margin: 0;
          font-size: 11px;
          line-height: 1.32;
          color: #263340;
        }
        .detailBlock ul { margin: 0; padding-left: 14px; }
        .transcriptWrap {
          border: 1px solid #dde4ea;
          border-radius: 4px;
          background: #fff;
          padding: 7px 8px;
        }
        .transcriptBtn {
          background: #eef3f7;
          border: 1px solid #cbd6e0;
          color: #2d3b48;
          border-radius: 3px;
          font-size: 11px;
          line-height: 1.2;
          padding: 2px 6px;
          cursor: pointer;
          margin-bottom: 5px;
        }
        .transcriptText {
          font-size: 11px;
          color: #243140;
          line-height: 1.35;
          margin: 0;
          white-space: pre-wrap;
        }
        .muted { color: var(--muted); }
        @media (max-width: 1100px) {
          .detailGrid { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className="header">
        <h1 className="title">Intelligent Voicemail Triage</h1>
        <p className="subtitle">
          Sorted by urgency first, then newest time. Click any row to open details.
        </p>
        <div className="headerSummary" aria-label="Voicemail triage summary">
          <div className="headerSummaryItem">
            <span className="headerSummaryLabel">Unreviewed</span>
            <span className="headerSummaryValue">{unreviewedCount}</span>
          </div>
          <div className="headerSummaryItem">
            <span className="headerSummaryLabel">High urgency</span>
            <span className="headerSummaryValue">{highUrgencyCount}</span>
          </div>
          <div className="headerSummaryItem">
            <span className="headerSummaryLabel">Flagged for GP</span>
            <span className="headerSummaryValue">{needsGPCount}</span>
          </div>
        </div>
        <div className="stats">
          <span className="stat">Total: {voicemails.length}</span>
          <span className="stat">In progress: {inProgressCount}</span>
          <span className="stat">Done: {doneCount}</span>
        </div>
      </header>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th className="expander"></th>
              <th>Caller</th>
              <th>Phone</th>
              <th>Received</th>
              <th>Urgency</th>
              <th>Intent</th>
              <th>AI Summary</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Status</th>
              <th>Assign Staff</th>
              <th>Needs GP</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {sortedVoicemails.map((item) => {
              const isOpen = expandedId === item.id;
              const transcriptOpen = Boolean(transcriptOpenById[item.id]);

              return (
                <FragmentRow
                  key={item.id}
                  item={item}
                  isOpen={isOpen}
                  transcriptOpen={transcriptOpen}
                  onRowClick={() => toggleExpanded(item.id)}
                  onTranscriptToggle={() => toggleTranscript(item.id)}
                  onUpdate={updateVoicemail}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FragmentRow({
  item,
  isOpen,
  transcriptOpen,
  onRowClick,
  onTranscriptToggle,
  onUpdate,
}) {
  const stopClick = (e) => e.stopPropagation();

  return (
    <>
      <tr
        className={`data-row row-urgency-${item.urgency} ${isOpen ? "row-open" : ""}`}
        onClick={onRowClick}
      >
        <td className={`expander expander-accent-${item.urgency}`}>
          {isOpen ? "▾" : "▸"}
        </td>
        <td>{item.callerName}</td>
        <td className="phone">{item.phoneNumber}</td>
        <td className="time">{formatDateTime(item.receivedAt)}</td>
        <td>
          <span className={`badge urgency-${item.urgency}`}>{item.urgency}</span>
        </td>
        <td>{item.intentLabel}</td>
        <td className="summary">{item.summary}</td>
        <td className="duration">{item.duration}</td>
        <td>{item.clinicLocation}</td>
        <td onClick={stopClick}>
          <select
            aria-label={`Status for ${item.callerName}`}
            value={item.status}
            onChange={(e) => onUpdate(item.id, { status: e.target.value })}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
        <td onClick={stopClick}>
          <select
            aria-label={`Assigned staff for ${item.callerName}`}
            value={item.assignedStaff}
            onChange={(e) => onUpdate(item.id, { assignedStaff: e.target.value })}
          >
            {staffOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
        <td onClick={stopClick} style={{ textAlign: "center" }}>
          <input
            aria-label={`Needs GP for ${item.callerName}`}
            type="checkbox"
            checked={item.needsGP}
            onChange={(e) => onUpdate(item.id, { needsGP: e.target.checked })}
          />
        </td>
        <td onClick={stopClick}>
          <input
            aria-label={`Internal note for ${item.callerName}`}
            className="noteInput"
            type="text"
            value={item.note}
            placeholder="Add note..."
            onChange={(e) => onUpdate(item.id, { note: e.target.value })}
          />
        </td>
      </tr>

      {isOpen && (
        <tr>
          <td colSpan={13} className={`detailCell detailCell-${item.urgency}`}>
            <div className="detailGrid">
              <div className="detailBlock">
                <h4>What Caller Wants</h4>
                <p>{item.whatCallerWants}</p>
              </div>
              <div className="detailBlock">
                <h4>Key Extracted Details</h4>
                <ul>
                  {item.keyDetails.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div className="detailBlock">
                <h4>Suggested Next Step</h4>
                <p>{item.suggestedNextStep}</p>
                <p className="muted" style={{ marginTop: "4px" }}>
                  <strong>Confidence:</strong>{" "}
                  {item.confidenceNote || "No major ambiguity detected."}
                </p>
              </div>
            </div>

            <div className="transcriptWrap">
              <button className="transcriptBtn" onClick={onTranscriptToggle}>
                {transcriptOpen ? "Hide Transcript" : "Show Transcript"}
              </button>
              {transcriptOpen && <p className="transcriptText">{item.transcript}</p>}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
