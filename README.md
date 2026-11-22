# WellCampus — Student Health & Wellness Tracker

**A student wellness dashboard: daily habits, fitness sessions, meals, campus events, counselling, community and an AI-style wellness assistant — all in one responsive React app.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![lucide-react](https://img.shields.io/badge/Icons-lucide-F56565)

**Live demo:** https://wellnes-tracker.netlify.app/

---

## Overview

WellCampus was built for the FSAD (Full Stack Application Development) course brief *"Building a Student Health & Wellness Tracking System using React + Spring Boot"*. This repository contains the **client application**: a complete, self-contained front end with role-aware login, a wellness dashboard, and persisted demo data.

> **Scope note:** there is no Spring Boot service in this repository — all data lives in the browser's `localStorage`, seeded from `constants.ts`. The original submission archive is kept in the sibling repository [`FSAD---Building-a-Student-Health-Wellness-Tracking-System-using-React-Spring-Boot`](https://github.com/Monish03905/FSAD---Building-a-Student-Health-Wellness-Tracking-System-using-React-Spring-Boot).

## Features

| Area | What it includes |
| --- | --- |
| **Login** | Member / admin role switch, sign-in and registration form |
| **Dashboard** | Daily wellness overview, hydration, sleep and step widgets, leaderboard |
| **Fitness** | Guided workout video library with durations and thumbnails |
| **Nutrition** | Meal ideas with calorie and diet tags, plus a 7-day plan generator prompt |
| **Events** | Campus events with dates, locations and one-click registration |
| **Appointments** | Counsellor directory with specialities and availability |
| **Community** | Anonymous peer-support posts with topic tags |
| **Resources** | Downloadable guides and workout plans |
| **SOS** | Full-screen emergency overlay with the campus support hotline |
| **Aura assistant** | Multilingual wellness chat panel (English, Hindi, Telugu, Tamil, Malayalam, Kannada, French, German) with scripted, intent-matched responses |

Registrations, events, meals and community posts are written back to `localStorage`, so a session survives reloads.

## Stack

- **React 19** + **TypeScript** + **Vite 6**
- **lucide-react** icon set, hand-written CSS (no component library)
- Data persisted with `localStorage`; seeded content in `constants.ts`
- Deployed as a static site on Netlify

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
npm run preview    # serve the build
```

## Project structure

```text
App.tsx                Main shell: tabs, state, persistence, modals
components/
  LoginScreen.tsx      Member/admin login and registration
  AIChatbot.tsx        "Aura" multilingual wellness assistant
  SOSOverlay.tsx       Emergency support overlay
constants.ts           Seed videos, meals, events, posts, counsellors, leaderboard
types.ts               Shared TypeScript models
index.tsx / index.html Vite entry
```

## Notes

- The assistant is **rule-based**: responses are matched from a local phrase table per language, with no external model or API call.
- Login is a local demo — credentials are not verified and nothing leaves the browser.
- To move this to a real backend, replace the `localStorage` reads/writes in `App.tsx` with API calls; the data shapes in `types.ts` map directly to REST resources.

## License

No open-source license file is included; the code is published for portfolio review.
