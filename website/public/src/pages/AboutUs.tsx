import React from "react";
import {
  Play,
  ChartBar,
  Users,
  Award,
  Brain,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        {/* Hero Section */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-xl text-muted-foreground leading-relaxed">
            At Rewision, we are passionate about transforming the way people
            learn online. Our vision is simple: to make learning active,
            engaging, and rewarding for everyone.
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-card rounded-2xl p-8 mb-16 border border-border">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We are a team of 10 students from the Indian Institutes of
            Technology (IITs), bringing together diverse skills in technology,
            design, finance and AI. What unites us is our shared belief that the
            traditional way of passively consuming educational videos can be
            reimagined into an interactive learning experience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <p className="font-semibold">Technology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <p className="font-semibold">Design</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <p className="font-semibold">Finance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <p className="font-semibold">Education</p>
            </div>
          </div>
        </div>

        {/* What We're Building Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">
            With Rewision, we are building tools that:
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Active Learning</h3>
              </div>
              <p className="text-muted-foreground">
                Turn passive video watching into active participation through
                real-time quizzes and challenges.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ChartBar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Analytics</h3>
              </div>
              <p className="text-muted-foreground">
                Help learners track their progress with smart analytics.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Collaborative Study</h3>
              </div>
              <p className="text-muted-foreground">
                Enable collaborative study experiences with peers.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">
                  Verifiable Achievements
                </h3>
              </div>
              <p className="text-muted-foreground">
                Provide verifiable achievements through blockchain-backed
                certificates.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-card rounded-2xl p-8 border border-border">
          <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Our mission is to empower students, professionals, teachers, and
              self-learners with a platform that not only helps them learn
              better, but also makes the process more rewarding and credible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
