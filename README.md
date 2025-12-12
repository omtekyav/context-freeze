<div align="center">

# ❄️ ContextFreeze
### Infinite Context Memory for LLM Conversations

**Serialize. Freeze. Restore.**
<br>
Keep your chat context, technical stack, and personal persona alive across sessions.

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-yellow)](./LICENSE)

[🔴 Live Demo](https://contextfreeze.netlify.app/) · [ Report Bug](https://github.com/omtekyav/context-freeze/issues) · [ Request Feature](https://github.com/omtekyav/context-freeze/issues)
<img width="1262" height="847" alt="image" src="https://github.com/user-attachments/assets/6a4e0186-3467-42f8-aacb-810d0fdc787e" />




</div>


##  The Problem

Coding with Large Language Models (Gemini, ChatGPT, Claude) is powerful, but they suffer from **"Context Drift"**:

1.  **Memory Loss:** As the chat grows, the model forgets your tech stack or initial constraints.
2.  **Performance Drop:** Response latency increases with token count.
3.  **Repetitive Prompting:** Starting a new chat forces you to re-type your entire persona and project details manually.

> *"I am a Full Stack Dev using FastAPI and Docker, please act as a Senior Mentor..."* — **Don't type this every time.**

##  The Solution

**ContextFreeze** is a browser-based tool that acts as a **"Save/Load System"** for your AI conversations. It serializes your chat state into a lightweight JSON object and hydrates new sessions with your custom profile.

##  Key Features

| Feature | Description |
| :--- | :--- |
| **Client-Side Privacy** | Runs 100% in your browser. No data is sent to any external server. |
| **Zero-Friction** | Uses JavaScript **Bookmarklets** for a 2-click workflow (Freeze & Inject). |
| **Smart Injection** | Merges your **Personal Profile** (Goals, Learning Style) with **Project Context**. |
| **Multi-platform** | Works with Gemini,Chatgpt and other models via prompt injection. |
| **Customizable** | Define your own "System Persona" (e.g., *Strict Mentor* vs *Supportive Guide*). |

---

##  Step-by-Step Usage Guide
<img width="1220" height="852" alt="image" src="https://github.com/user-attachments/assets/e511d75f-8aa3-4f9b-b812-4fc73ec39388" />


This guide explains the complete workflow: from setting up your personal profile to transferring your chat context.

### Phase 1: Setup (One-Time Only)

1.  **Open the App:** Navigate to the Live Demo (or your localhost).
2.  **Configure Profile:** In the **"Profil Ayarları"** (Profile Settings) box, paste your "System Persona".
    * *What is this?* This is your DNA (e.g., "I am a Senior Dev, act as a strict mentor, my goal is X").
    * *Why?* The application embeds this text directly into the **🟢 Inject** button code.
3.  **Install Buttons:**
    * Make sure your browser's **Bookmarks Bar** is visible (`Ctrl + Shift + B` on Chrome/Edge).
    * **Drag & Drop** the **🔴 Freeze** and **🟢 Inject** buttons from the web page to your bookmarks bar.

### Phase 2: The "Freeze" Loop (Saving Context)

When your current LLM chat (Gemini/ChatGPT) becomes slow, hallucinated, or hits the token limit:

1.  **Stay in the Chat:** Do not leave the browser tab.
2.  **Click 🔴 Freeze:** Click the red bookmarklet in your browser bar.
    * *Action:* It automatically injects a prompt asking the AI to summarize the technical state.
3.  **Copy the Output:** The AI will generate a **JSON block** (Summary, Tech Stack, Active Bugs). Copy this JSON text.

### Phase 3: The "Inject" Loop (Restoring Context)

You have two ways to restore your context in a new chat:

#### Method A: The "Direct" Way (Fastest)
*Best for quick continuation without editing.*

1.  Open a **New Chat** window.
2.  Click the **🟢 Inject** bookmarklet in your browser bar.
3.  A popup box will appear. **Paste the JSON** you copied in Phase 2.
4.  **Press Enter:** The system instantly combines your **Saved Profile** (from Phase 1) with the **Project JSON** and sends the prompt.
5.  *Result:* The AI is now fully synced with your persona and project state.

####  Method B: The "Manager" Way (via Web App)
*Best if you want to review or edit the context before injecting.*

1.  Go back to the **ContextFreeze Web App**.
2.  Paste the JSON into the **"Yönetici" (Manager)** tab or input area.
3.  Review the data. You can see what the AI summarized in the "Bağlam Önizlemesi" (Context Preview) section.
4.  Click **"Yükleme Komutunu Kopyala" (Copy Injection Command)**.
5.  Paste this command manually into your new AI chat.

---

##  Getting Started

### Option 1: Live Demo (Recommended)
No installation required.
1. Go to the **[Live Demo](https://contextfreeze.netlify.app/)**.
2. Configure your profile settings.
3. Drag the buttons to your bookmarks bar.

### Option 2: Run Locally
    git clone https://github.com/KULLANICI_ADIN/context-freeze.git
    cd context-freeze
    npm install
    npm run dev

---

## 🛠️ Configuration

You can customize the **"System Persona"** in the app settings to match your learning style.

**Example Profile Configuration:**
    IDENTITY: Senior Backend Engineer
    GOAL: Mastering MLOps pipelines
    STYLE: Direct feedback, no sugar-coating. Focus on anti-patterns.

---

## 💻 Tech Stack

This project is built with modern web technologies to ensure speed and type safety.

- **Core:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules
- **Deployment:** Netlify / GitHub Pages

---

##  Contributing

Contributions are what make the open-source community such an amazing place to learn. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">


</div>
