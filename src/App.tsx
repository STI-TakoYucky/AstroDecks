import { Routes, Route, Navigate } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";

function App() {

    const [theme, setTheme] = useState(
      () => localStorage.getItem("theme") || "light"
    );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
      <Provider store={store}>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
  
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/my-decks" replace />} />
  
            <Route path="my-decks" element={<MyDecks />} />
            <Route path="deck/:id" element={<DeckDetails />} />
            <Route path="learn/:id" element={<LearnDeck />} />
  
            <Route path="community-decks" element={<CommunityDecks />} />
            <Route path="community-decks/:id" element={<CommunityDeckDetails/>} />
          </Route>
        </Routes>
      </Provider>
    );
}

export default App;
