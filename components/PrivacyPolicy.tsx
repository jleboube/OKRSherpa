import React from 'react';
import { Mountain, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Mountain size={20} />
              </div>
              <h1 className="text-lg font-bold tracking-tight">OKR Sherpa</h1>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: November 22, 2025</p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Introduction</h2>
            <p className="text-slate-600 mb-4">
              Welcome to OKR Sherpa ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-driven OKR planning service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.1 Information You Provide</h3>
            <p className="text-slate-600 mb-4">When you use OKR Sherpa, we may collect:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Account information (name, email address) when you sign in with Google OAuth</li>
              <li>OKR content you create, including objectives, key results, and organizational context</li>
              <li>Leadership goals and organizational information you provide</li>
              <li>Chat messages and interactions with our AI Sherpa</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-slate-600 mb-4">We automatically collect certain information when you use our service:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Usage data (features used, time spent, interaction patterns)</li>
              <li>Device information (browser type, operating system, IP address)</li>
              <li>Log data (access times, pages viewed, errors encountered)</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">We use your information to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Provide and maintain the OKR Sherpa service</li>
              <li>Generate AI-powered recommendations and guidance</li>
              <li>Save and retrieve your OKR data across sessions</li>
              <li>Improve our service and develop new features</li>
              <li>Communicate with you about service updates and important information</li>
              <li>Ensure security and prevent fraudulent activities</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Data Storage and Security</h2>
            <p className="text-slate-600 mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Your OKR data is stored in encrypted MongoDB databases</li>
              <li>All data transmission uses HTTPS encryption</li>
              <li>Authentication is handled through secure Google OAuth</li>
              <li>We maintain regular security audits and updates</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. AI and Third-Party Services</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.1 Google Gemini AI</h3>
            <p className="text-slate-600 mb-4">
              We use Google's Gemini AI to power our Socratic OKR guidance. Your prompts and conversations are processed by Google's AI services. We do not use your strategic goals or OKR data to train public AI models.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.2 Google OAuth</h3>
            <p className="text-slate-600 mb-4">
              We use Google OAuth for authentication. When you sign in with Google, we receive basic profile information (name, email) from Google. This integration is governed by Google's privacy policies.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Data Retention</h2>
            <p className="text-slate-600 mb-4">
              We retain your OKR data for as long as your account remains active. You may delete your data at any time through your account settings. After account deletion, we will remove your data within 30 days, except where required by law to retain it longer.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Your Rights</h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Access your personal data and OKR content</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Delete your account and associated data</li>
              <li>Export your OKR data in a portable format</li>
              <li>Opt-out of non-essential communications</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Cookies and Tracking</h2>
            <p className="text-slate-600 mb-4">
              We use essential cookies to maintain your session and remember your preferences. We do not use third-party tracking cookies or advertising cookies.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-slate-600 mb-4">
              OKR Sherpa is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-slate-600 mb-4">
              Your data may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-slate-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email or through a prominent notice on our service. Your continued use of OKR Sherpa after changes become effective constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-slate-600 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
              <p className="text-slate-700 font-medium">Email: privacy@okrsherpa.app</p>
              <p className="text-slate-700 font-medium">Address: OKR Sherpa Inc., Data Protection Officer</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <button
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
