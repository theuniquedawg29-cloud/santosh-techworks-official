import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7ygmiRhM0tnb8ywLdqZIq7T08i-6YW0o",
  authDomain: "santosh-techworks-official.firebaseapp.com",
  projectId: "santosh-techworks-official",
  storageBucket: "santosh-techworks-official.firebasestorage.app",
  messagingSenderId: "488514815998",
  appId: "1:488514815998:web:a5087074b212d2db7062af",
  measurementId: "G-4W2LQ0F1P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Expose to window for non-module scripts
window.firebaseApp = app;
window.firebaseAnalytics = analytics;
window.logFirebaseEvent = (eventName, params) => logEvent(analytics, eventName, params);

export { app, analytics, logEvent };
