# WishesApp 🌟 - Premium Personalization Engine

WishesApp is a high-fidelity, mobile-first greeting card platform designed to provide a "native app" experience on the web. It features a sophisticated real-time personalization engine, high-resolution exports, and a premium subscription model.

## 🚀 Key Features

- **Real-Time Personalization**: Live preview of user names and profile pictures on any greeting card template.
- **Premium Subscription**: Gated content system with simulated upgrade flow and persistent state.
- **High-Resolution Exports**: 3x Retina-scale PNG generation using a synchronized capture engine.
- **Native Sharing**: Integration with the Web Share API for direct-to-app sharing on mobile.
- **Mobile-First Design**: Production-ready UI with glassmorphism, fluid typography, and spring-based animations.
- **Firebase Authentication**: Support for Google, Email/Password, and Guest logins.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS & ShadCN UI
- **Animations**: Framer Motion
- **State Management**: Zustand (with persistence)
- **Image Generation**: html2canvas (Retina-scale)
- **Backend/Auth**: Firebase

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd custom-greetings-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔥 Firebase Setup Guide

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Google, Email/Password, and Anonymous).
3. Register a Web App to get your API keys.
4. (Optional) Enable **Firestore** if you plan to migrate static templates to the cloud.

---

## 📦 Deployment

### Deploy to Vercel
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add your environment variables in the Vercel project settings.
4. Click **Deploy**.

---

## 👨‍💻 Project Structure

- `/app`: Next.js App Router (Pages & Layouts)
- `/components`: Modular UI & Layout components
- `/data`: Static template definitions
- `/lib`: Core utilities (Image generation, Sharing logic)
- `/store`: Zustand persistent state
- `/types`: TypeScript interfaces & schemas

---

Developed with ❤️ as a Professional Internship Project.
