# Technical Approach: WishesApp

This document outlines the architectural decisions and technical implementation of the WishesApp personalization engine and its supporting systems.

## 1. Real-Time Personalization Architecture
The core "wow" feature is the ability to see dynamic user data (name and avatar) live on templates before clicking them.

### Personalization Engine (`GreetingOverlay.tsx`)
Instead of duplicating logic for every template, I built a centralized **Overlay Engine**. This component:
- **Responsive Context**: It automatically detects if it's being rendered as a small "Thumbnail" in the grid or a high-res "Canvas" in the editor.
- **Dynamic Positioning**: It uses a coordinate-based system (`top-left`, `center-bottom`, etc.) defined in the template metadata to precisely place overlays.
- **Visual Polish**: Every name and avatar is wrapped in a high-fidelity container featuring italicized serif typography and glassmorphism blurs.

## 2. High-Resolution Image Capture
Standard web screenshots often look blurry. To solve this:
- **Retina Scaling**: I implemented a 3x scale factor in `lib/generateImage.ts`. 
- **Synchronization**: The engine performs an `async` scan for all images (avatars/templates) and waits for them to be 100% loaded before initiating the capture, ensuring no "empty boxes" in the final download.

## 3. State Management
I chose **Zustand** over Redux or Context for several reasons:
- **Performance**: High-frequency updates during personalization are handled without unnecessary re-renders.
- **Persistence**: Using the `persist` middleware, I ensured that user profiles and the "Premium" subscription status survive page refreshes, providing a seamless "logged-in" feeling.

## 4. Native Sharing System
To maximize mobile engagement:
- **Web Share API**: I utilized `navigator.share` to allow users to share actual **File objects** (the generated PNG) directly to social apps like WhatsApp or Instagram Stories.
- **Fallbacks**: For desktop, the app intelligently falls back to a custom-designed Sharing Menu that guides the user to download first.

## 5. Technical Challenges & Solutions
- **Type Safety**: Managing diverse positioning combinations was prone to errors. I solved this with a strict TypeScript schema in `types/index.ts`, ensuring every template has a valid coordinate set.
- **Image Tainting**: Cross-origin avatars (Firebase/Google) would break the canvas capture. I resolved this by enabling `useCORS` and `allowTaint` in the `html2canvas` configuration.

## 6. Scalability & Future Improvements
- **Cloud Migration**: The current system uses `data/templates.ts`. The next phase involves migrating these to **Firebase Firestore** for dynamic updates without code changes.
- **Cloud Storage**: Transition from local downloads to uploading generated greetings to **Firebase Storage**, enabling unique URL sharing and a "Saved Cards" gallery.
- **Advanced Editor**: Adding draggable and resizable text/image components for more creative freedom.

---

This project demonstrates a deep understanding of React's lifecycle, modern CSS-in-JS patterns, and advanced browser APIs.
