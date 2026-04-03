# Intelligent Voicemail Triage Dashboard

> [Watch the walkthrough](https://loom.com/your-link-here) — 5 min - WIP

## What this is
A prototype showing how voicemail transcripts can be converted into structured, prioritized work items for clinic admin staff.

Instead of arriving to dozens of unlistened recordings with no sense of urgency, staff open one view that tells them:
- What's urgent and why
- What each caller actually wants
- What the suggested next step is
- What's already been handled

## The problem it solves

Many clinics rely on voicemail for after-hours and overflow call handling. Each morning, admin staff face:

- Dozens of long, unstructured recordings
- No way to prioritize without listening to each one
- No tracking for follow-ups or handoffs
- A workflow that starts behind before the day begins

This is not an audio problem. It's a workflow and information problem.

## Demo

![Alt text](/intelligentVoicemail/images/intelligentVM.png)
![Alt text](/intelligentVoicemail/images/detailsVM.png)

## How it works

| Field | What it does |
|---|---|
| **Summary** | 1–2 sentence plain-English description of what the caller wants |
| **Intent** | Categorised label: Appointment Request, Script Refill, Test Results, Urgent Callback, General Enquiry |
| **Urgency** | HIGH / MEDIUM / LOW, inferred from transcript content |
| **Key details** | Patient name, medication, preferred times — pulled from the call |
| **Suggested next step** | What admin should do, not just what was said |
| **Confidence flags** | Warnings when the AI wasn't certain about something |

Staff never need to listen to a recording to understand what a call is about.

## Features

- **Inbox view** — compact, sortable rows ordered by urgency then time received
- **Morning summary bar** — total unreviewed, HIGH urgency count, GP-flagged count at a glance
- **Expanded item panel** — full structured summary, key details, suggested action, collapsible transcript
- **Action management** — status tracking, staff assignment, notes, GP flag, snooze
- **Filters** — by urgency, intent, location, status
- **Repeat caller detection** — flags when the same number appears multiple times in 24h

## Running locally

**React/Vite version:**
```bash
npm install
npm run dev
```

Then open `http://localhost:5173`

## Mock data

The prototype uses 10 synthetic voicemails representing realistic clinic scenarios:

- 3 HIGH urgency (chest symptoms, child with fever, psychiatric medication outage)
- 4 MEDIUM (appointment requests, referral and script follow-ups)
- 2 LOW (general enquiries, admin questions)
- 1 ambiguous call with a confidence warning
- 1 repeat caller appearing twice within 24h

No real patient data is used anywhere in this prototype.

## What's automated vs human

| Automated | Human |
|---|---|
| Transcript summarisation | Final clinical judgment |
| Urgency scoring | Deciding who to call first |
| Intent classification | Handling edge cases |
| Key detail extraction | Adding context from patient history |
| Next step suggestion | Anything requiring empathy or nuance |

The system surfaces information. Humans make decisions.

## What's not in scope

- Audio transcription (assumed to exist in call infrastructure)
- Authentication or multi-user sessions
- EHR / practice management system integration
- Mobile layout
- Real-time updates

## Built with

- React + Vite
- All state in-memory — no backend, no API calls
- Synthetic data only