import React, { useState } from "react";
import { Bug, Send, AlertCircle, CheckCircle } from "lucide-react";

interface ReportFormData {
  reportType: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  stepsToReproduce: string;
  expectedBehavior: string;
  actualBehavior: string;
  browserInfo: string;
}

const Report: React.FC = () => {
  const [formData, setFormData] = useState<ReportFormData>({
    reportType: "",
    title: "",
    description: "",
    priority: "medium",
    category: "",
    stepsToReproduce: "",
    expectedBehavior: "",
    actualBehavior: "",
    browserInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendUrl}/report`, {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to submit report");
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      reportType: "",
      title: "",
      description: "",
      priority: "medium",
      category: "",
      stepsToReproduce: "",
      expectedBehavior: "",
      actualBehavior: "",
      browserInfo: "",
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-8 border border-border text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold mb-4">
              Report Submitted Successfully!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your report. We have received your submission and
              will review it shortly. You will receive a confirmation email at
              the provided address.
            </p>
            <button
              onClick={resetForm}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bug className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Report a Bug</h1>
          <p className="text-xl text-muted-foreground">
            Found a bug or experiencing performance issues? Help us fix it by
            reporting the problem with detailed information.
          </p>
        </div>

        <div className="bg-card rounded-xl p-8 border border-border shadow-md">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Report Type */}
            <div>
              <label
                htmlFor="reportType"
                className="block text-sm font-medium mb-2"
              >
                Issue Type *
              </label>
              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              >
                <option value="">Select issue type</option>
                <option value="bug">Bug - Something is broken</option>
                <option value="performance">
                  Performance Issue - Slow loading or lag
                </option>
                <option value="ui-bug">
                  UI Bug - Visual or layout problem
                </option>
                <option value="crash">Crash - Application stops working</option>
                <option value="data-loss">
                  Data Loss - Lost progress or information
                </option>
                <option value="security">
                  Security Issue - Potential vulnerability
                </option>
                <option value="compatibility">
                  Compatibility Issue - Browser/device specific
                </option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Brief description of the bug or issue"
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              >
                <option value="">Select category</option>
                <option value="quiz">Quiz System</option>
                <option value="ui">User Interface</option>
                <option value="authentication">Authentication</option>
                <option value="analytics">Analytics</option>
                <option value="mobile">Mobile Experience</option>
                <option value="api">API Issues</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Steps to Reproduce */}
            <div>
              <label
                htmlFor="stepsToReproduce"
                className="block text-sm font-medium mb-2"
              >
                Steps to Reproduce *
              </label>
              <textarea
                id="stepsToReproduce"
                name="stepsToReproduce"
                value={formData.stepsToReproduce}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors resize-vertical"
              />
            </div>

            {/* Expected vs Actual Behavior */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="expectedBehavior"
                  className="block text-sm font-medium mb-2"
                >
                  Expected Behavior *
                </label>
                <textarea
                  id="expectedBehavior"
                  name="expectedBehavior"
                  value={formData.expectedBehavior}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="What should have happened?"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors resize-vertical"
                />
              </div>
              <div>
                <label
                  htmlFor="actualBehavior"
                  className="block text-sm font-medium mb-2"
                >
                  Actual Behavior *
                </label>
                <textarea
                  id="actualBehavior"
                  name="actualBehavior"
                  value={formData.actualBehavior}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="What actually happened?"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors resize-vertical"
                />
              </div>
            </div>

            {/* Browser Information */}
            <div>
              <label
                htmlFor="browserInfo"
                className="block text-sm font-medium mb-2"
              >
                Browser & System Information *
              </label>
              <input
                type="text"
                id="browserInfo"
                name="browserInfo"
                value={formData.browserInfo}
                onChange={handleInputChange}
                required
                placeholder="e.g., Chrome 120.0.0.0 on Windows 11, or Safari 17.1 on macOS Sonoma"
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
              />
            </div>

            {/* Additional Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Additional Details
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any additional context, error messages, or information that might help us understand the issue better."
                className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-ring transition-colors resize-vertical"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Bug Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-muted/50 rounded-xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-warning mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">
                Before Submitting Your Bug Report
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • Provide clear, step-by-step instructions to reproduce the
                  bug
                </li>
                <li>• Include your browser version and operating system</li>
                <li>• Describe what you expected vs. what actually happened</li>
                <li>• Attach screenshots or error messages if possible</li>
                <li>• Check if this bug has already been reported</li>
                <li>
                  • We prioritize critical bugs and respond within 24-48 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
