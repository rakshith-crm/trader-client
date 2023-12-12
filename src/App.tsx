import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import Profile from "./components/Profile";
import Suggestions from "./components/Suggestions";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/home" element={<Dashboard component={<Home />} />} />
        <Route
          path="/favourites"
          element={<Dashboard component={<Favourites />} />}
        />
        <Route
          path="/suggestions"
          element={<Dashboard component={<Suggestions />} />}
        />
        <Route
          path="/profile"
          element={<Dashboard component={<Profile />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
