import React from "react";
import {
  Play,
  Brain,
  TrendingUp,
  ChartColumn,
  Users,
  Award,
  Calendar,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Info.css";

const Info: React.FC = () => {
  const navigate = useNavigate();
  const handleGetGoQualify = () => {
    navigate("/signup");
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-subtle">
        {/* Hero Section */}
        <section className="pt-32 pb-20 min-h-screen flex items-center bg-gradient-subtle flex-col">
          <div className="container mx-auto px-6">
            <div className="text-center space-y-12 max-w-4xl mx-auto">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground flex flex-col items-center justify-center">
                  <span>Learn Anything,</span>
                  <span className="text-primary">Retain Everything</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Turn every play button into a study session with quizzes that
                  test you, analytics that track you, and collaboration that
                  pushes you further. Only on Rewision.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-hero transition-all duration-300 rounded-xl text-lg font-semibold h-14 px-8"
                  onClick={handleGetGoQualify}
                >
                  Get Rewision for free
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-card text-foreground border border-border hover:bg-muted shadow-sm hover:shadow-md rounded-xl text-lg font-semibold h-14 px-8">
                  <Download className="mr-2 h-5 w-5" />
                  Chrome Extension coming soon
                </button>
              </div>
            </div>
          </div>
          <div className="mt-16">
            <img
              src="invideoquiz.png"
              alt="Interactive YouTube video with quiz overlay"
              className="info-main-image"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We don't just help you watch more — we help you remember more.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-[#007AFF] transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 w-2 h-2 bg-[#007AFF] rounded-full transform -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    Play Any YouTube Video
                  </h3>
                  <p className="text-muted-foreground">
                    Just hit play — we integrate seamlessly with your existing
                    learning routine.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                  <div className="hidden md:block absolute top-10 left-full w-full h-[2px] bg-[#007AFF] transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 w-2 h-2 bg-[#007AFF] rounded-full transform -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    Engage with InVideo Quizzes
                  </h3>
                  <p className="text-muted-foreground">
                    Scientifically proven to boost retention by up to 50%.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg">
                <div className="relative">
                  <div className="w-20 h-20 bg-[#007AFF] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-3">
                    Track & Achieve Your Learning Goals
                  </h3>
                  <p className="text-muted-foreground">
                    Weekly progress tracking and insights to help you learn
                    better.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-32">
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 text-foreground">
                Features That Make Learning{" "}
                <span className="text-primary">Stick</span>
              </h2>
              <p className="text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Built for you. Quizzes that get your recall, analytics for your
                hustle, collabs for your people
              </p>
            </div>

            <div className="space-y-32">
              <div className="feature-card feature-card-large mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div>
                    <div className="info-image-container h-80 lg:h-96">
                      <img
                        src="studyanalytics.png"
                        alt="Analytics dashboard showing learning progress"
                        className="info-image"
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="info-feature-icon">
                        <ChartColumn className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="feature-title">Study Analytics</h3>
                    </div>
                    <p className="feature-description">
                      Shows you a clear view of your learning, helping you stay
                      on track with smart goals whether you're preparing for
                      exams or learning something new.
                    </p>
                    <div className="feature-cta">
                      <p className="feature-cta-text">
                        Start Tracking Your Progress
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-card feature-card-large mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="info-feature-icon">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="feature-title">Study Calendar</h3>
                    </div>
                    <p className="feature-description">
                      Your learning automatically syncs with a beautiful
                      calendar that tracks every video you watch, just like
                      Google Calendar.
                    </p>
                    <div className="feature-cta">
                      <p className="feature-cta-text">
                        Start Tracking Your Progress
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="info-image-container h-80 lg:h-96">
                      <img
                        src="studygraph.png"
                        alt="Study calendar interface showing learning progress"
                        className="info-image"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-card feature-card-large mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div>
                    <div className="info-image-container h-80 lg:h-96">
                      <img
                        src="studyrooms.png"
                        alt="Collaborative learning interface with friends"
                        className="info-image"
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="info-feature-icon">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="feature-title">Study Rooms</h3>
                    </div>
                    <p className="feature-description">
                      Join a virtual study room with friends to learn together.
                      Watch videos together, take quizzes together, and help
                      each other learn.
                    </p>
                    <div className="feature-cta">
                      <p className="feature-cta-text">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="feature-card feature-card-large mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="info-feature-icon">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="feature-title">
                        Personalized Certificates
                      </h3>
                    </div>
                    <p className="feature-description">
                      Get certificates tailored to your learning journey.
                      Complete tasks based on what you watch and learn, and earn
                      recognition that reflects your unique progress. Every
                      effort counts.
                    </p>
                    <div className="feature-cta">
                      <p className="feature-cta-text">Coming Soon</p>
                    </div>
                  </div>
                  <div>
                    <div className="info-image-container h-80 lg:h-96">
                      <img
                        src="comingsoon.jpeg"
                        alt="Blockchain-verified certificates interface"
                        className="info-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-24 bg-gradient-subtle overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.08)_0%,transparent_50%)]"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                Trusted by learners at
                <span className="block text-primary mt-2">
                  world-class organizations
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
                From Fortune 500 companies to Ivy League universities,
                professionals and students choose Rewision to accelerate their
                learning.
              </p>
              <div className="inline-block">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-hero transition-all duration-300 rounded-xl text-xl font-bold h-16 px-12 shadow-hero">
                  Start Learning for Free →
                </button>
              </div>
            </div>

            <div className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                <h3 className="text-2xl font-bold text-foreground px-6">
                  Leading Companies
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-6">
                  {[
                    "HubSpot",
                    "Atlassian",
                    "Shopify",
                    "Zendesk",
                    "Notion",
                    "Figma",
                    "Canva",
                    "Stripe",
                  ].map((company) => (
                    <div
                      key={company}
                      className="flex-shrink-0 bg-card rounded-xl px-8 py-4 shadow-md border border-border/30 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="text-xl font-bold text-foreground whitespace-nowrap">
                        {company}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
                <h3 className="text-2xl font-bold text-foreground px-6">
                  Top Universities
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex gap-6">
                  {[
                    "Stanford University",
                    "MIT",
                    "Harvard University",
                    "UC Berkeley",
                    "Carnegie Mellon",
                    "Oxford University",
                    "Cambridge University",
                    "Yale University",
                  ].map((university) => (
                    <div
                      key={university}
                      className="flex-shrink-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl px-8 py-4 shadow-md border border-accent/20 hover:border-accent/40 transition-all duration-300"
                    >
                      <div className="text-xl font-bold text-foreground whitespace-nowrap">
                        {university}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto animate-fade-up">
              <h2 className="text-5xl font-bold mb-8 leading-tight">
                Your next YouTube session could actually{" "}
                <span className="gradient-text">stick in your memory</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of learners who are turning passive watching into
                active, measurable progress. Start learning smarter today.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg hover:shadow-hero transition-all duration-300 h-12 rounded-xl group text-lg px-12 py-6">
                  <Download className="mr-3 h-6 w-6" />
                  Chrome Extension coming soon
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-card text-foreground border border-border hover:bg-muted shadow-sm hover:shadow-md h-12 rounded-xl text-lg px-12 py-6">
                  Watch Demo Video
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;
