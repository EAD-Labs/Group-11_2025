import React, { useState } from "react";
import {
  Send,
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import "./Feedback.css";

interface FeedbackFormData {
  name: string;
  category: string;
  rating: number;
  subject: string;
  message: string;
  allowContact: boolean;
}

const Feedback: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    category: "",
    rating: 0,
    subject: "",
    message: "",
    allowContact: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const categories = [
    "Feature Request",
    "General Feedback",
    "User Experience",
    "Content Quality",
    "UI/UX Improvement",
    "Workflow Enhancement",
    "Integration Request",
    "Educational Content",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${backendUrl}/feedback`, {
        method: "POST",
        body: JSON.stringify(formData),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        category: "",
        rating: 0,
        subject: "",
        message: "",
        allowContact: false,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name && formData.category && formData.subject && formData.message;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Share Your Feedback</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have ideas for new features or suggestions to improve GoQualify?
            We'd love to hear from you! Your feedback helps shape our product
            roadmap.
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-card rounded-xl border border-border shadow-lg p-8">
          {submitStatus === "success" && (
            <div className="mb-8 p-6 bg-success/10 border border-success/20 rounded-lg flex items-center gap-4">
              <CheckCircle className="w-6 h-6 text-success" />
              <div>
                <h3 className="font-semibold text-success">
                  Thank you for your feedback!
                </h3>
                <p className="text-muted-foreground">
                  We've received your message and will review it soon.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <div>
                <h3 className="font-semibold text-destructive">
                  Error submitting feedback
                </h3>
                <p className="text-muted-foreground">
                  Please try again or contact us directly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category and Rating */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-smooth"
                  placeholder="Brief description of your feedback"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Overall Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      className={`p-1 transition-smooth ${
                        star <= formData.rating
                          ? "text-warning"
                          : "text-muted-foreground hover:text-warning/70"
                      }`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.rating === 0 && "Click to rate"}
                  {formData.rating === 1 && "Poor"}
                  {formData.rating === 2 && "Fair"}
                  {formData.rating === 3 && "Good"}
                  {formData.rating === 4 && "Very Good"}
                  {formData.rating === 5 && "Excellent"}
                </p>
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-smooth resize-none"
                placeholder="Share your ideas, suggestions, or feedback about GoQualify. What features would you like to see? How can we improve your learning experience?"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Minimum 50 characters. Be as specific as possible about your
                ideas and suggestions to help us understand how to improve
                GoQualify.
              </p>
            </div>

            {/* Contact Permission */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="allowContact"
                name="allowContact"
                checked={formData.allowContact}
                onChange={handleInputChange}
                className="mt-1 w-4 h-4 text-primary border-input rounded focus:ring-ring"
              />
              <label
                htmlFor="allowContact"
                className="text-sm text-muted-foreground"
              >
                I would like to be contacted for follow-up questions about my
                feedback. This helps us provide better support and implement
                improvements.
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-smooth flex items-center gap-2 ${
                  isFormValid && !isSubmitting
                    ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-md hover:shadow-lg"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">We Read Every Suggestion</h3>
            <p className="text-sm text-muted-foreground">
              Every piece of feedback and feature request is reviewed by our
              product team and helps shape our development roadmap.
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Feature Implementation</h3>
            <p className="text-sm text-muted-foreground">
              Popular feature requests are prioritized in our development cycle
              and we update users on implementation progress.
            </p>
          </div>
          <div className="text-center p-6 bg-card rounded-xl border border-border">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold mb-2">Community Driven</h3>
            <p className="text-sm text-muted-foreground">
              Your ideas and suggestions directly influence our product
              development and help us build features that matter to our users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
