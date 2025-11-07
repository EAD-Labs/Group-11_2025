import { useState } from "react";
import "./JoinReferralProgram.css";

interface JoinReferralProgramProps {
  onClose: () => void;
}

export default function JoinReferralProgram({
  onClose,
}: JoinReferralProgramProps) {
  const [formData, setFormData] = useState({
    contactEmail: "",
    contactName: "",
    socialMedia: "",
    motivation: "",
    otherSuggestions: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(
        `${backendUrl}/referral/join-referral-program`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to join referral program");
      }

      onClose();
    } catch (err) {
      setError("Failed to join referral program. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="join-referral-overlay">
      <div className="join-referral-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Join Referral Program</h2>
        <p>Join our referral program and earn rewards for sharing GoQualify!</p>

        <form onSubmit={handleSubmit} className="join-referral-form">
          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email *</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="socialMedia">Social Media Handle *</label>
            <input
              type="text"
              id="socialMedia"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              required
              placeholder="e.g., Twitter: @username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="motivation">Why do you want to join? *</label>
            <textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Tell us why you're interested in our referral program"
            />
          </div>

          <div className="form-group">
            <label htmlFor="otherSuggestions">Other Suggestions</label>
            <textarea
              id="otherSuggestions"
              name="otherSuggestions"
              value={formData.otherSuggestions}
              onChange={handleChange}
              rows={3}
              placeholder="Any suggestions or ideas for our referral program?"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Join Program"}
          </button>
        </form>
      </div>
    </div>
  );
}
