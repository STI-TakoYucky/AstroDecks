import { Routes, Route } from "react-router-dom";
import MyDecks from "./pages/MyDecks";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import "./index.css";
import Layout from "./pages/Layout";
import CommunityDecks from "./pages/CommunityDecks";
import { Provider } from "react-redux";
import { store } from "./state/store";
import DeckDetails from "./pages/DeckDetails";
import "./global.css";
import LearnDeck from "./pages/LearnDeck";
import CommunityDeckDetails from "./pages/CommunityDeckDetails";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import QuizDeck from "./pages/QuizDeck";

function App() {

    const theme = localStorage.getItem("theme") || "light"

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
      <Provider store={store}>
        <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute ><Layout></Layout></ProtectedRoute>}>
            <Route path="/my-decks" element={<MyDecks />} />
            <Route path="/deck/:id" element={<DeckDetails />} />
            <Route path="/learn/:id" element={<LearnDeck />} />
            <Route path="/quiz/:id" element={<QuizDeck />} />

            <Route path="/community-decks" element={<CommunityDecks />} />
            <Route path="/community-decks/:id" element={<CommunityDeckDetails />} />
        </Route>
      </Routes>

      </Provider>
    );
}

export default App;
