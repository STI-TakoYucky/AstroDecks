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
import './global.css'

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/my-decks" replace />} />
          <Route path="my-decks" element={<MyDecks />} />
            <Route path="/:id" element={<DeckDetails/>}>
          </Route>
          <Route path="community-decks" element={<CommunityDecks />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
