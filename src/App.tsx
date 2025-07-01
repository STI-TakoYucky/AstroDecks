import { Routes, Route, Navigate } from "react-router-dom";
import MyDecks from "./pages/MyDecks";
import SignIn from "./authentication/SignIn";
import SignUp from "./authentication/SignUp";
import "./index.css";
import Layout from "./pages/Layout";
import CommunityDecks from "./pages/CommunityDecks";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/my-decks" replace />} />
        <Route path="my-decks" element={<MyDecks />} />
        <Route path="community-decks" element={<CommunityDecks />} />
      </Route>
    </Routes>
  );
}

export default App;
