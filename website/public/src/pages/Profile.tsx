import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutAction } from "../store/logout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoinAffiliateProgram from "../components/JoinAffiliateProgram";
import "./Profile.css";

export default function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [isInReferralProgram, setIsInReferralProgram] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    const checkReferralStatus = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/referral/status`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsInReferralProgram(data.isInProgram);
        }
      } catch (err) {
        console.error("Failed to check referral status:", err);
      }
    };

    checkReferralStatus();
  }, []);

  const handleCopyReferralCode = async () => {
    if (user?.referralCode) {
      try {
        await navigator.clipboard.writeText(user.referralCode);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const handleShareReferralCode = () => {
    if (user?.referralCode) {
      navigator.share({
        title: "Welcome to Rewision!",
        text: "Use my referral code to earn rewards",
        url: `/signup?referralCode=${user.referralCode}`,
      });
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const handleLogout = async () => {
    await dispatch(logoutAction({ redirectTo: "/" }));
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <div className="avatar-circle">{initials}</div>
          <h1>Profile</h1>
          <p>Manage your account information</p>
        </header>

        <section className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{user?.name ?? "-"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{user?.email ?? "-"}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Referral Code:</span>
            <div className="referral-code-container">
              <span className="detail-value referral-code">
                {user?.referralCode ?? "-"}
              </span>
              <button
                className={`copy-button ${copySuccess ? "success" : ""}`}
                onClick={handleCopyReferralCode}
                title="Copy referral code"
              >
                {copySuccess ? "✓" : "Copy"}
              </button>
              <button
                className={`copy-button ${shareSuccess ? "success" : ""}`}
                onClick={handleShareReferralCode}
                title="Share referral code"
              >
                {shareSuccess ? "✓" : "Share"}
              </button>
            </div>
          </div>
        </section>

        <div className="profile-actions">
          {isInReferralProgram || user?.referralProgramJoined ? (
            <button
              onClick={() => navigate("/affiliate-dashboard")}
              className="join-affiliate-btn"
            >
              Go to Affiliate Dashboard
            </button>
          ) : (
            <button
              onClick={() => setShowReferralForm(true)}
              className="join-affiliate-btn"
            >
              Join Affiliate Program
            </button>
          )}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {showReferralForm && (
          <JoinAffiliateProgram onClose={() => setShowReferralForm(false)} />
        )}
      </div>
    </div>
  );
}
