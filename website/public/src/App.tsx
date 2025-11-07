import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ThankYou from "./pages/ThankYou";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import StudyAnalytics from "./pages/StudyAnalytics";
import Navbar from "./boilerplate/Navbar";
import SidebarLayout from "./layouts/SidebarLayout";
import PastQuizFullInfo from "./pages/PastQuizFullInfo";
import Profile from "./pages/Profile";
import AffiliateDashboard from "./pages/AffiliateDashboard";
import Info from "./pages/Info";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import RefundPolicy from "./pages/RefundPolicy";
import QuizWarning from "./pages/QuizWarning";
import Report from "./pages/Report";
import Feedback from "./pages/Feedback";
import ComingSoon from "./pages/ComingSoon";
import Pricing from "./pages/Pricing";
import WeeklyGoals from "./pages/WeeklyGoals";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ExtensionPage from "./pages/extension";
import FooterLayout from "./layouts/FooterLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import ReactGA from "react-ga4";
import "./App.css";
import "./colors.css";

// Google Analytics Tracker Component
const GoogleAnalyticsTracker = () => {
  const location = useLocation();
  // console.log(location.pathname);
  ReactGA.send({
    hitType: "pageview",
    page: location.pathname,
  });
  return null;
};

const SaveReferralCode = () => {
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get("referralCode");
  if (referralCode) {
    //save referral code to cookies
    document.cookie = `referralCode=${referralCode}; path=/`;
    console.log("Referral code saved to cookies");
  }
  return null;
};

function App() {
  const google_analytics = import.meta.env.VITE_TEST_GOOGLE;
  if (google_analytics) {
    ReactGA.initialize(google_analytics);
  }
  return (
    <>
      <BrowserRouter>
        <GoogleAnalyticsTracker />
        <SaveReferralCode />
        <Navbar />
        <SidebarLayout />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/info" element={<Info />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/warning" element={<QuizWarning />} />
            <Route path="/report" element={<Report />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route
              path="/studyanalytics"
              element={
                <ProtectedRoute>
                  <StudyAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/weekly-goals"
              element={
                <ProtectedRoute>
                  <WeeklyGoals />
                </ProtectedRoute>
              }
            />
            <Route path="/study-rooms" element={<ComingSoon />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route
              path="/pastquizfullinfo"
              element={
                <ProtectedRoute>
                  <PastQuizFullInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/affiliate-dashboard"
              element={
                <ProtectedRoute>
                  <AffiliateDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/extension"
              element={
                <ProtectedRoute>
                  <ExtensionPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <FooterLayout />
      </BrowserRouter>
    </>
  );
}

export default App;
