import { useMemo, useState } from "react";

const initialVoicemails = [
  {
    id: 1,
    callerName: "Maria Lopez",
    phoneNumber: "(415) 555-0198",
    receivedAt: "2026-04-03T09:42:00",
    urgency: "HIGH",
    intentLabel: "Urgent Callback",
    summary:
      "Chest pressure returned overnight after recent discharge and caller asks if she should be seen immediately.",
    duration: "01:34",
    clinicLocation: "Downtown Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: true,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Wants immediate guidance on whether symptoms need urgent assessment today.",
    keyDetails: [
      "Recent ER discharge 2 days ago",
      "Chest pressure 6/10 since 3 AM",
      "Mild shortness of breath reported",
    ],
    suggestedNextStep:
      "Escalate to on-call GP now and advise urgent in-person evaluation.",
    confidenceNote:
      "Cardiac risk history and current vital signs were not confirmed.",
    transcript:
      "Hi, this is Maria Lopez. I was discharged on Wednesday and my chest pressure came back around three this morning. It's not severe but it's definitely there and I'm a bit short of breath. Can someone tell me if I should go to urgent care or come to the clinic right away? Please call me back soon.",
  },
  {
    id: 2,
    callerName: "Liam O'Connor",
    phoneNumber: "(628) 555-0133",
    receivedAt: "2026-04-03T07:38:00",
    urgency: "HIGH",
    intentLabel: "Pediatric Fever",
    summary:
      "Parent reports child with persistent fever overnight and reduced fluid intake.",
    duration: "01:22",
    clinicLocation: "Northside Family Health",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: true,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Needs urgent advice on whether child should be seen this morning.",
    keyDetails: [
      "Child age 5",
      "Fever near 102 F since last evening",
      "Reduced appetite and lower fluid intake",
    ],
    suggestedNextStep:
      "Route to pediatric triage immediately and provide dehydration red flags.",
    confidenceNote: "",
    transcript:
      "Hi, this is Liam O'Connor. My son has had a fever all night and he's not really drinking much this morning. He feels hot and looks flat. Could someone call me back quickly and tell me if we should come in right away?",
  },
  {
    id: 3,
    callerName: "Priya Nair",
    phoneNumber: "(415) 555-0172",
    receivedAt: "2026-04-03T06:58:00",
    urgency: "HIGH",
    intentLabel: "Psychiatric Medication Outage",
    summary:
      "Caller has no remaining psychiatric medication and reports worsening anxiety symptoms.",
    duration: "01:09",
    clinicLocation: "East Bay Internal Medicine",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: true,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Needs same-day support and medication continuity plan to avoid missing doses.",
    keyDetails: [
      "No doses left of prescribed medication",
      "Reports rising anxiety and poor sleep",
      "Requests urgent callback this morning",
    ],
    suggestedNextStep:
      "Escalate to GP or mental health clinician now for urgent refill and safety check.",
    confidenceNote:
      "Risk level may be higher; self-harm screening details were not captured.",
    transcript:
      "Hello, Priya Nair speaking. I have completely run out of my sertraline and I couldn't get through yesterday. I'm feeling really unsettled and barely slept. Please call me this morning because I don't want to miss another dose.",
  },
  {
    id: 4,
    callerName: "Devon Patel",
    phoneNumber: "(415) 555-0142",
    receivedAt: "2026-04-03T08:10:00",
    urgency: "MEDIUM",
    intentLabel: "Script Refill Follow-up",
    summary:
      "Following up on blood pressure script refill request after pharmacy reported no authorization yet.",
    duration: "00:52",
    clinicLocation: "Northside Family Health",
    status: "In Progress",
    assignedStaff: "Nurse Kelly",
    needsGP: false,
    note: "Pharmacy verified.",
    snoozedUntil: null,
    whatCallerWants:
      "Requests same-day refill authorization sent to preferred pharmacy.",
    keyDetails: [
      "Medication: Lisinopril 20 mg",
      "One tablet left",
      "No acute symptoms reported",
    ],
    suggestedNextStep:
      "Route to prescribing clinician for refill authorization before end of day.",
    confidenceNote: "",
    transcript:
      "Hello, this is Devon Patel. I'm calling because I'm almost out of my lisinopril twenty milligrams. I only have one pill for tomorrow. Can you please send a refill to the Walgreens on Market Street? Thank you.",
  },
  {
    id: 5,
    callerName: "Anthony Rivera",
    phoneNumber: "(510) 555-0111",
    receivedAt: "2026-04-03T07:54:00",
    urgency: "MEDIUM",
    intentLabel: "Appointment Request",
    summary:
      "Needs to move diabetes follow-up due to work conflict and wants a morning slot next week.",
    duration: "00:41",
    clinicLocation: "South Campus Clinic",
    status: "Done",
    assignedStaff: "Front Desk Sam",
    needsGP: false,
    note: "Moved to next Tuesday 9:30 AM.",
    snoozedUntil: null,
    whatCallerWants:
      "Requests alternate appointment time next week, mornings preferred.",
    keyDetails: [
      "Current booking Monday 3 PM",
      "Prefers Tuesday or Wednesday morning",
      "No urgent clinical concern reported",
    ],
    suggestedNextStep:
      "Front desk reschedule and confirm with patient by text.",
    confidenceNote: "",
    transcript:
      "Hi, Anthony Rivera here. I can't make my diabetes follow-up Monday afternoon because my shift changed. Could someone help move me to Tuesday or Wednesday morning next week? Thanks.",
  },
  {
    id: 6,
    callerName: "Caleb Turner",
    phoneNumber: "(510) 555-0106",
    receivedAt: "2026-04-03T08:40:00",
    urgency: "MEDIUM",
    intentLabel: "Referral Follow-up",
    summary:
      "Checking status of specialist referral that was expected this week.",
    duration: "00:55",
    clinicLocation: "Downtown Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    snoozedUntil: "2026-04-04T08:00:00",
    whatCallerWants:
      "Needs confirmation that referral has been sent and where to call.",
    keyDetails: [
      "Referral discussed last visit",
      "No update visible in portal",
      "Wants callback after 4 PM",
    ],
    suggestedNextStep:
      "Check outbound referral queue and return call with booking details.",
    confidenceNote: "",
    transcript:
      "Hello, Caleb Turner here. I'm checking on the cardiology referral from my appointment last week. I still can't see it in the portal. Could someone call me this afternoon and let me know where it's up to?",
  },
  {
    id: 7,
    callerName: "Grace Chen",
    phoneNumber: "(415) 555-0184",
    receivedAt: "2026-04-03T11:06:00",
    urgency: "MEDIUM",
    intentLabel: "General Enquiry",
    summary:
      "Unsure if abdominal pain and dizziness need urgent review; details are incomplete.",
    duration: "01:17",
    clinicLocation: "South Campus Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Wants guidance on whether symptoms can wait or need same-day review.",
    keyDetails: [
      "Symptoms started this morning",
      "No confirmed temperature value",
      "Caller was uncertain and hesitant",
    ],
    suggestedNextStep:
      "Nurse callback for symptom clarification and triage disposition.",
    confidenceNote:
      "Ambiguous urgency: severity, duration, and red-flag symptoms were not clearly stated.",
    transcript:
      "Hi, this is Grace Chen. I have tummy pain and felt dizzy this morning. I'm not sure if it's serious or if I should just rest. Sorry, I don't really know what details to give. Could someone call me and tell me what to do?",
  },
  {
    id: 8,
    callerName: "Rita Singh",
    phoneNumber: "(415) 555-0159",
    receivedAt: "2026-04-03T10:47:00",
    urgency: "LOW",
    intentLabel: "General Enquiry",
    summary:
      "General enquiry about obtaining childhood immunization records for school paperwork.",
    duration: "00:36",
    clinicLocation: "Northside Family Health",
    status: "In Progress",
    assignedStaff: "Admin Jo",
    needsGP: false,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Needs vaccination history sent through patient portal before noon tomorrow.",
    keyDetails: [
      "Form due tomorrow",
      "Prefers secure portal upload",
      "No clinical question raised",
    ],
    suggestedNextStep:
      "Admin team to release immunization summary through portal.",
    confidenceNote: "",
    transcript:
      "Hello, this is Rita Singh. I need my vaccination record for a school form and the deadline is tomorrow. Can you upload it to my portal today please?",
  },
  {
    id: 9,
    callerName: "Caleb Turner",
    phoneNumber: "(510) 555-0106",
    receivedAt: "2026-04-03T22:11:00",
    urgency: "LOW",
    intentLabel: "Billing Clarification",
    summary:
      "Second call from same number asking about possible duplicate copay charge.",
    duration: "00:49",
    clinicLocation: "Downtown Clinic",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Wants billing team to explain and correct potential duplicate charge.",
    keyDetails: [
      "Statement date: March 28",
      "Two copay charges shown",
      "Repeat call received within 24 hours",
    ],
    suggestedNextStep:
      "Assign to billing queue and share update with caller.",
    confidenceNote: "",
    transcript:
      "Hi, Caleb Turner calling again. I still need help with what looks like a duplicate copay on my statement. Could billing please call me tomorrow afternoon?",
  },
  {
    id: 10,
    callerName: "Elaine Brooks",
    phoneNumber: "(628) 555-0124",
    receivedAt: "2026-04-03T09:28:00",
    urgency: "LOW",
    intentLabel: "Test Results",
    summary:
      "Asks for explanation of thyroid result in patient portal and whether follow-up is needed.",
    duration: "01:12",
    clinicLocation: "East Bay Internal Medicine",
    status: "Unreviewed",
    assignedStaff: "Unassigned",
    needsGP: false,
    note: "",
    snoozedUntil: null,
    whatCallerWants:
      "Would like callback to understand if highlighted TSH value is concerning.",
    keyDetails: [
      "Portal shows mildly elevated TSH",
      "No severe symptoms mentioned",
      "Available after 2 PM for callback",
    ],
    suggestedNextStep:
      "Assign to RN for interpretation support and route to GP if treatment change needed.",
    confidenceNote: "",
    transcript:
      "Hi, this is Elaine Brooks. I saw my thyroid numbers in the portal and I don't really understand them. My TSH looked highlighted and I'm wondering if I need to change anything. If someone can call me after two this afternoon, that would help.",
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
const snoozeOptions = [
  { label: "+30m", minutes: 30 },
  { label: "+2h", minutes: 120 },
  { label: "Tomorrow 8am", minutes: null },
];
const filterDefaults = {
  urgency: "ALL",
  intent: "ALL",
  location: "ALL",
  status: "ALL",
};

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function addMinutes(dateString, minutes) {
  const date = new Date(dateString);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

function tomorrowAtEight(baseDateString) {
  const base = new Date(baseDateString);
  const next = new Date(base);
  next.setDate(base.getDate() + 1);
  next.setHours(8, 0, 0, 0);
  return next.toISOString();
}

function buildRepeatFlags(items) {
  const byPhone = items.reduce((acc, item) => {
    const list = acc[item.phoneNumber] || [];
    list.push(item);
    acc[item.phoneNumber] = list;
    return acc;
  }, {});

  const flags = {};
  Object.values(byPhone).forEach((group) => {
    if (group.length < 2) return;
    const sorted = [...group].sort(
      (a, b) => new Date(a.receivedAt) - new Date(b.receivedAt)
    );
    sorted.forEach((item, idx) => {
      const prev = sorted[idx - 1];
      const next = sorted[idx + 1];
      const withinPrev =
        prev &&
        new Date(item.receivedAt) - new Date(prev.receivedAt) <=
          24 * 60 * 60 * 1000;
      const withinNext =
        next &&
        new Date(next.receivedAt) - new Date(item.receivedAt) <=
          24 * 60 * 60 * 1000;
      flags[item.id] = Boolean(withinPrev || withinNext);
    });
  });
  return flags;
}

export default function App() {
  const [voicemails, setVoicemails] = useState(initialVoicemails);
  const [expandedId, setExpandedId] = useState(null);
  const [transcriptOpenById, setTranscriptOpenById] = useState({});
  const [filters, setFilters] = useState(filterDefaults);

  const repeatFlags = useMemo(() => buildRepeatFlags(voicemails), [voicemails]);
  const uniqueIntents = useMemo(
    () => [...new Set(voicemails.map((v) => v.intentLabel))].sort(),
    [voicemails]
  );
  const uniqueLocations = useMemo(
    () => [...new Set(voicemails.map((v) => v.clinicLocation))].sort(),
    [voicemails]
  );

  const filteredVoicemails = useMemo(
    () =>
      voicemails.filter((item) => {
        if (filters.urgency !== "ALL" && item.urgency !== filters.urgency) {
          return false;
        }
        if (filters.intent !== "ALL" && item.intentLabel !== filters.intent) {
          return false;
        }
        if (filters.location !== "ALL" && item.clinicLocation !== filters.location) {
          return false;
        }
        if (filters.status !== "ALL" && item.status !== filters.status) {
          return false;
        }
        return true;
      }),
    [filters, voicemails]
  );

  const sortedVoicemails = useMemo(() => {
    const copy = [...filteredVoicemails];
    copy.sort((a, b) => {
      const urgencyDiff = urgencyRank[a.urgency] - urgencyRank[b.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;
      return new Date(b.receivedAt) - new Date(a.receivedAt);
    });
    return copy;
  }, [filteredVoicemails]);

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

  const handleSnooze = (item, option) => {
    const value =
      option.minutes === null
        ? tomorrowAtEight(item.receivedAt)
        : addMinutes(item.receivedAt, option.minutes);
    updateVoicemail(item.id, { snoozedUntil: value });
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
          --chip-bg: #edf2f6;
          --chip-border: #cfd8e1;
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
        .header { margin-bottom: 8px; }
        .title { margin: 0; font-size: 17px; font-weight: 650; line-height: 1.2; letter-spacing: -0.01em; }
        .subtitle { margin: 2px 0 6px; color: var(--muted); font-size: 11px; line-height: 1.35; }
        .headerSummary { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 8px; }
        .headerSummaryItem {
          flex: 1 1 140px;
          min-width: 120px;
          max-width: 230px;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 6px 10px;
        }
        .headerSummaryLabel {
          font-size: 10px;
          font-weight: 600;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .headerSummaryValue {
          display: block;
          font-size: 20px;
          font-weight: 650;
          line-height: 1.2;
          text-align: center;
        }
        .stats { display: flex; gap: 5px; flex-wrap: wrap; font-size: 11px; color: #344351; }
        .stat { background: var(--panel); border: 1px solid var(--border); border-radius: 4px; padding: 2px 6px; }
        .filters {
          display: grid;
          grid-template-columns: repeat(4, minmax(120px, 1fr)) auto;
          gap: 6px;
          margin-top: 8px;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 8px;
          align-items: end;
        }
        .filterGroup label {
          display: block;
          font-size: 10px;
          margin-bottom: 2px;
          color: var(--muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-weight: 600;
        }
        select, input[type="text"] {
          width: 100%;
          font-size: 11px;
          line-height: 1.25;
          padding: 3px 6px;
          border: 1px solid #c8d1d9;
          border-radius: 3px;
          background: #fff;
          color: #24313d;
        }
        button {
          border: 1px solid #c7d0d8;
          background: #f4f7fa;
          color: #2d3b48;
          border-radius: 3px;
          font-size: 11px;
          line-height: 1.2;
          padding: 4px 8px;
          cursor: pointer;
        }
        button:hover { background: #eaf0f5; }
        .tableWrap {
          border: 1px solid var(--border);
          border-radius: 6px;
          background: var(--panel);
          overflow-y: auto;
          overflow-x: hidden;
          max-height: calc(100vh - 190px);
          margin-top: 8px;
        }
        table { width: 100%; border-collapse: collapse; table-layout: auto; }
        thead th {
          position: sticky;
          top: 0;
          z-index: 2;
          background: #f0f4f6;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          color: #32404d;
          padding: 5px 6px;
          border-bottom: 1px solid var(--border);
          white-space: nowrap;
        }
        tbody td {
          font-size: 12px;
          line-height: 1.28;
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
          width: 24px;
          text-align: center;
        }
        .expander-accent-HIGH { box-shadow: inset 3px 0 0 var(--urg-high-border); }
        .expander-accent-MEDIUM { box-shadow: inset 2px 0 0 var(--urg-med-border); }
        .expander-accent-LOW { box-shadow: inset 1px 0 0 var(--urg-low-border); }
        .time { white-space: nowrap; color: #2d3945; }
        .summary {
          color: #445363;
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          overflow-wrap: anywhere;
        }
        .badge {
          display: inline-block;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1.2;
          margin-right: 4px;
          margin-bottom: 3px;
        }
        .urgency-HIGH {
          color: var(--urg-high-fg);
          background: var(--urg-high-bg);
          border: 1px solid #a88886;
          padding: 2px 6px;
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
        }
        .flagChip {
          display: inline-block;
          font-size: 10px;
          border: 1px solid var(--chip-border);
          background: var(--chip-bg);
          color: #425261;
          border-radius: 999px;
          padding: 1px 6px;
          margin-right: 4px;
          margin-bottom: 3px;
        }
        .flagChip.alert {
          border-color: #c9b08d;
          background: #f3ecde;
          color: #594720;
        }
        input[type="checkbox"] { transform: scale(0.95); cursor: pointer; vertical-align: middle; }
        .detailCell {
          border-bottom: 1px solid var(--border);
          padding: 7px 7px 7px 9px;
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          margin-bottom: 5px;
        }
        .detailBlock {
          background: #fff;
          border: 1px solid #dde4ea;
          border-radius: 4px;
          padding: 6px 7px;
        }
        .detailBlock h4 {
          margin: 0 0 4px;
          font-size: 10px;
          color: #334455;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .detailBlock p, .detailBlock li {
          margin: 0;
          font-size: 11px;
          line-height: 1.35;
          color: #263340;
        }
        .detailBlock ul {
          margin: 0;
          padding-left: 0;
          list-style-position: inside;
        }
        .detailBlock li { padding-left: 0; }
        .actionGrid {
          margin-bottom: 5px;
          display: grid;
          grid-template-columns: repeat(4, minmax(120px, 1fr));
          gap: 6px;
        }
        .snoozeButtons {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .snoozeButtons button { padding: 3px 6px; }
        .transcriptWrap {
          border: 1px solid #dde4ea;
          border-radius: 4px;
          background: #fff;
          padding: 7px 8px;
        }
        .transcriptText {
          font-size: 11px;
          color: #243140;
          line-height: 1.35;
          margin: 0;
          white-space: pre-wrap;
          padding-left: clamp(10px, 2.4vw, 36px);
          padding-right: clamp(10px, 2.4vw, 36px);
        }
        .muted { color: var(--muted); }
        .cell-caller { width: 15%; }
        .cell-time { width: 12%; }
        .cell-urgency { width: 8%; }
        .cell-intent { width: 13%; }
        .cell-summary { width: 30%; }
        .cell-status { width: 9%; }
        .cell-owner { width: 7%; }
        .cell-flags { width: 6%; }
        @media (max-width: 1200px) {
          .filters { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
          .actionGrid { grid-template-columns: repeat(2, minmax(120px, 1fr)); }
          .detailGrid { grid-template-columns: 1fr; }
        }
        @media (max-width: 1024px) {
          .cell-owner,
          .cell-flags { display: none; }
          .subtitle { font-size: 10px; }
          tbody td { font-size: 11px; }
        }
        @media (max-width: 768px) {
          .app { padding: 8px 8px 10px; }
          .title { font-size: 16px; }
          .subtitle { margin-bottom: 8px; }
          .headerSummary { gap: 6px; }
          .headerSummaryItem {
            flex: 1 1 calc(50% - 6px);
            max-width: none;
            min-width: 0;
            padding: 6px 8px;
          }
          .stats { gap: 4px; }
          .filters { grid-template-columns: 1fr; padding: 7px; }
          .tableWrap {
            overflow: visible;
            border: none;
            background: transparent;
            max-height: none;
          }
          table,
          tbody { display: block; width: 100%; }
          thead { display: none; }
          tr.data-row {
            display: grid;
            grid-template-columns: 22px 1fr;
            gap: 0;
            border: 1px solid var(--border);
            border-radius: 6px;
            margin-bottom: 8px;
            overflow: hidden;
          }
          .expander {
            grid-row: 1 / span 8;
            min-height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.5);
            border-right: 1px solid #e1e7ec;
          }
          tr.data-row > td {
            display: block;
            border-bottom: 1px solid #e9eef2;
            padding: 5px 8px;
            width: 100%;
          }
          tr.data-row > td:last-child { border-bottom: none; }
          .cell-caller::before,
          .cell-time::before,
          .cell-urgency::before,
          .cell-intent::before,
          .cell-summary::before,
          .cell-status::before,
          .cell-owner::before,
          .cell-flags::before {
            display: block;
            margin-bottom: 2px;
            font-size: 9px;
            font-weight: 600;
            color: var(--muted);
            text-transform: uppercase;
            letter-spacing: 0.04em;
          }
          .cell-caller::before { content: "Caller"; }
          .cell-time::before { content: "Received"; }
          .cell-urgency::before { content: "Urgency"; }
          .cell-intent::before { content: "Intent"; }
          .cell-summary::before { content: "AI Summary"; }
          .cell-status::before { content: "Status"; }
          .cell-owner::before { content: "Owner"; }
          .cell-flags::before { content: "Flags"; }
          .cell-owner,
          .cell-flags { display: block; }
          .summary { font-size: 11px; line-height: 1.35; }
          tr:has(> .detailCell) {
            display: block;
            margin: -6px 0 8px;
          }
          .detailCell {
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 7px;
          }
          .actionGrid,
          .detailGrid { grid-template-columns: 1fr; gap: 6px; }
          .transcriptWrap { padding: 7px; }
          .transcriptText {
            padding-left: 8px;
            padding-right: 8px;
          }
        }
        @media (max-width: 480px) {
          .headerSummaryItem { flex: 1 1 100%; }
          .headerSummaryValue { font-size: 18px; }
          .stat { font-size: 10px; }
          button { font-size: 10px; }
          select, input[type="text"] { font-size: 10px; }
        }
      `}</style>

      <header className="header">
        <h1 className="title">Intelligent Voicemail Triage</h1>
        <p className="subtitle">
          Sorted by urgency first, then newest time. Use filters to narrow morning triage.
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
          <span className="stat">Showing: {sortedVoicemails.length}</span>
        </div>
        <div className="filters" aria-label="Voicemail filters">
          <div className="filterGroup">
            <label htmlFor="urgencyFilter">Urgency</label>
            <select
              id="urgencyFilter"
              value={filters.urgency}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, urgency: e.target.value }))
              }
            >
              <option value="ALL">All</option>
              {Object.keys(urgencyRank).map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div className="filterGroup">
            <label htmlFor="intentFilter">Intent</label>
            <select
              id="intentFilter"
              value={filters.intent}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, intent: e.target.value }))
              }
            >
              <option value="ALL">All</option>
              {uniqueIntents.map((intent) => (
                <option key={intent} value={intent}>
                  {intent}
                </option>
              ))}
            </select>
          </div>
          <div className="filterGroup">
            <label htmlFor="locationFilter">Location</label>
            <select
              id="locationFilter"
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
            >
              <option value="ALL">All</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="filterGroup">
            <label htmlFor="statusFilter">Status</label>
            <select
              id="statusFilter"
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
            >
              <option value="ALL">All</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={() => setFilters(filterDefaults)}>
            Clear filters
          </button>
        </div>
      </header>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th className="expander"></th>
              <th className="cell-caller">Caller</th>
              <th className="cell-time">Received</th>
              <th className="cell-urgency">Urgency</th>
              <th className="cell-intent">Intent</th>
              <th className="cell-summary">AI Summary</th>
              <th className="cell-status">Status</th>
              <th className="cell-owner">Owner</th>
              <th className="cell-flags">Flags</th>
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
                  isRepeat={Boolean(repeatFlags[item.id])}
                  onRowClick={() => toggleExpanded(item.id)}
                  onTranscriptToggle={() => toggleTranscript(item.id)}
                  onUpdate={updateVoicemail}
                  onSnooze={handleSnooze}
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
  isRepeat,
  onRowClick,
  onTranscriptToggle,
  onUpdate,
  onSnooze,
}) {
  const stopClick = (e) => e.stopPropagation();
  const isAmbiguous = Boolean(item.confidenceNote);

  return (
    <>
      <tr
        className={`data-row row-urgency-${item.urgency} ${isOpen ? "row-open" : ""}`}
        onClick={onRowClick}
      >
        <td className={`expander expander-accent-${item.urgency}`}>
          {isOpen ? "▾" : "▸"}
        </td>
        <td className="cell-caller">
          <div>{item.callerName}</div>
          <div className="muted">{item.phoneNumber}</div>
        </td>
        <td className="time cell-time">{formatDateTime(item.receivedAt)}</td>
        <td className="cell-urgency">
          <span className={`badge urgency-${item.urgency}`}>{item.urgency}</span>
        </td>
        <td className="cell-intent">{item.intentLabel}</td>
        <td className="summary cell-summary">{item.summary}</td>
        <td className="cell-status">{item.status}</td>
        <td className="cell-owner">{item.assignedStaff}</td>
        <td className="cell-flags">
          {item.needsGP && <span className="flagChip alert">GP</span>}
          {isRepeat && <span className="flagChip">Repeat caller</span>}
          {item.snoozedUntil && <span className="flagChip">Snoozed</span>}
          {isAmbiguous && <span className="flagChip">Confidence check</span>}
        </td>
      </tr>

      {isOpen && (
        <tr>
          <td colSpan={9} className={`detailCell detailCell-${item.urgency}`}>
            <div className="actionGrid">
              <div className="detailBlock" onClick={stopClick}>
                <h4>Status</h4>
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
              </div>
              <div className="detailBlock" onClick={stopClick}>
                <h4>Assign Staff</h4>
                <select
                  aria-label={`Assigned staff for ${item.callerName}`}
                  value={item.assignedStaff}
                  onChange={(e) =>
                    onUpdate(item.id, { assignedStaff: e.target.value })
                  }
                >
                  {staffOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="detailBlock" onClick={stopClick}>
                <h4>Needs GP</h4>
                <label>
                  <input
                    aria-label={`Needs GP for ${item.callerName}`}
                    type="checkbox"
                    checked={item.needsGP}
                    onChange={(e) => onUpdate(item.id, { needsGP: e.target.checked })}
                  />
                  <span style={{ marginLeft: "6px" }}>Flag for GP review</span>
                </label>
              </div>
              <div className="detailBlock" onClick={stopClick}>
                <h4>Snooze</h4>
                <div className="snoozeButtons">
                  {snoozeOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => onSnooze(item, option)}
                    >
                      {option.label}
                    </button>
                  ))}
                  {item.snoozedUntil && (
                    <button
                      type="button"
                      onClick={() => onUpdate(item.id, { snoozedUntil: null })}
                    >
                      Unsnooze
                    </button>
                  )}
                </div>
                <p className="muted" style={{ marginTop: "4px" }}>
                  {item.snoozedUntil
                    ? `Snoozed until ${formatDateTime(item.snoozedUntil)}`
                    : "Not snoozed"}
                </p>
              </div>
            </div>

            <div className="detailGrid">
              <div className="detailBlock">
                <h4>What Caller Wants</h4>
                <p>{item.whatCallerWants}</p>
                <p className="muted" style={{ marginTop: "6px" }}>
                  <strong>Location:</strong> {item.clinicLocation}
                </p>
                <p className="muted">
                  <strong>Duration:</strong> {item.duration}
                </p>
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
                <div onClick={stopClick} style={{ marginTop: "6px" }}>
                  <h4 style={{ marginBottom: "2px" }}>Internal Note</h4>
                  <input
                    aria-label={`Internal note for ${item.callerName}`}
                    className="noteInput"
                    type="text"
                    value={item.note}
                    placeholder="Add note..."
                    onChange={(e) => onUpdate(item.id, { note: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="transcriptWrap">
              <button type="button" onClick={onTranscriptToggle}>
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
