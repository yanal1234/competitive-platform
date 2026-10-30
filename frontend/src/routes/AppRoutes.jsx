import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Problems from "../pages/Problems";
import Contests from "../pages/Contests";
import Leaderboard from "../pages/Leaderboard";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Roadmap from "../pages/Roadmap";
import MyProfile from "../pages/MyProfile";
import FAQ from "../pages/FAQ";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import ContactUs from "../pages/ContactUs";
import Header from "../components/Header/Header";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";

function AppRoutes() {
  const location = useLocation();

  console.log("Current pathname:", location.pathname);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/problems" element={<Problems />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact" element={<ContactUs />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
