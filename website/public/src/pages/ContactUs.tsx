import React from "react";
import { Mail, Wrench, Handshake, MapPin } from "lucide-react";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const RedditIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-2.5-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const ContactUs: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-12">
          We'd love to hear from you! Whether you have a question, feedback, or
          need support, our team is here to help.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-8">
            {/* General Inquiries */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">General Inquiries</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                For general questions about Rewision, write to us at:
              </p>
              <a
                href="mailto:query@rewision.io"
                className="text-primary hover:underline font-medium"
              >
                query@rewision.io
              </a>
            </div>

            {/* Support */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Support</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Facing an issue or need technical help? Reach out to our support
                team:
              </p>
              <a
                href="mailto:support@rewision.io"
                className="text-primary hover:underline font-medium"
              >
                support@rewision.io
              </a>
            </div>

            {/* Partnerships */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">
                  Partnerships & Collaborations
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Interested in collaborating, partnering, or working with us?
                Contact us at:
              </p>
              <a
                href="mailto:partnerships@rewision.io"
                className="text-primary hover:underline font-medium"
              >
                partnerships@rewision.io
              </a>
            </div>
          </div>

          {/* Address and Social */}
          <div className="space-y-8">
            {/* Address */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold">Address</h2>
              </div>
              <p className="text-muted-foreground">
                IIT Bombay, SINE
                <br />
                Powai, Mumbai
                <br />
                Maharashtra, India
              </p>
            </div>

            {/* Social Media */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
              <h2 className="text-2xl font-semibold mb-6">Social Media</h2>
              <p className="text-muted-foreground mb-6">
                Stay connected with us:
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="https://linkedin.com/company/rewision-io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="w-6 h-6" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com/rewision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <TwitterIcon className="w-6 h-6" />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://reddit.com/r/rewision"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <RedditIcon className="w-6 h-6" />
                  <span>Reddit</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
