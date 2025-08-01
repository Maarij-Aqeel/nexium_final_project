#  Intervue AI

## What I built (X)

I developed an **AI-powered Interview Practice Platform** where students can simulate technical interviews in real time. The platform provides a realistic interview experience, generates domain-specific questions, offers AI-driven feedback, and helps candidates assess and improve their performance. Additionally, it includes a developing **Company Portal**, enabling organizations to conduct structured interviews with selected candidates.

---

## How I measured success (Y)

-  Interview simulation completed by users with **automated scoring and personalized feedback**
-  Support for both **pre-built interviews** and **custom interview generation**
-  Early testing showed improved **candidate preparation** and **confidence levels**
-  Backend-ready **Company Profile System** currently in development for recruiters
-  Smooth integration between frontend, backend, and AI pipelines

---

## How I built it (Z)

###  Frontend
- Built using **Next.js 14** with responsive and dynamic UI
- Utilized **ShadCN UI** components with **Framer Motion** for smooth transitions

### Interview Engine
- **Vapi** powers the AI interviewer assistant, handling voice interactions and response generation
- **n8n** dynamically generates domain-specific questions based on selected topics and user preferences
- Real-time **transcription**, **AI analysis**, and **scoring logic** based on response content

### Features
- Choose from **pre-built interviews** (e.g. Web Development, Data Science, DevOps)
- Or generate **custom interviews** by selecting skills or uploading a job description
- AI provides **verbal and written feedback** with **performance scoring** at the end
- Interviews can be repeated to track improvement

### Backend
- **Supabase** handles authentication, user profiles, interview history, and company data
- Session data, scores, and feedback are stored for future analysis and progress tracking

### In Development
- **Company Portal** where companies can:
  - Create interview flows
  - Invite students
  - View performance dashboards
- Role-based access for students, recruiters, and admins

---

## Tech Stack

- **Frontend**: Next.js, TailwindCSS, ShadCN UI, Framer Motion  
- **Backend**: Supabase  
- **Voice AI**: Vapi  
- **Workflow Automation**: n8n  
- **Deployment**: Vercel  

---

## Contribution & Future Plans

I’m actively building out recruiter-side features and preparing for production deployment. Contributions and suggestions are welcome!

---

