import React from 'react';
import { Mountain, ArrowLeft } from 'lucide-react';

interface TermsConditionsProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms and Conditions</h1>
          <p className="text-slate-500 mb-8">Last updated: November 22, 2025</p>

          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Agreement to Terms</h2>
            <p className="text-slate-600 mb-4">
              By accessing and using OKR Sherpa ("Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use our Service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-slate-600 mb-4">
              OKR Sherpa is an AI-powered tool that helps individuals and organizations draft, refine, and align Objectives and Key Results (OKRs) using Socratic reasoning and advanced AI technology. The Service is provided free of charge to all users.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">3.1 Account Creation</h3>
            <p className="text-slate-600 mb-4">
              To save your OKR data, you must create an account using Google OAuth. You agree to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized access or security breach</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">3.2 Account Termination</h3>
            <p className="text-slate-600 mb-4">
              We reserve the right to suspend or terminate your account if you violate these Terms or engage in activities that harm other users or our Service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. User Content and Data</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.1 Ownership</h3>
            <p className="text-slate-600 mb-4">
              You retain all ownership rights to the OKRs, goals, and content you create using our Service. By using OKR Sherpa, you grant us a limited license to process, store, and display your content solely for the purpose of providing the Service.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4.2 Responsibility for Content</h3>
            <p className="text-slate-600 mb-4">
              You are solely responsible for the content you create and share through the Service. You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe upon intellectual property rights of others</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. AI-Generated Content</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.1 Nature of AI Assistance</h3>
            <p className="text-slate-600 mb-4">
              OKR Sherpa uses AI technology (Google Gemini) to provide guidance and suggestions. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>AI-generated suggestions are for guidance purposes only</li>
              <li>You are responsible for reviewing and validating all AI-generated content</li>
              <li>AI recommendations should not replace professional business judgment</li>
              <li>We do not guarantee the accuracy, completeness, or suitability of AI suggestions</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.2 Model Training</h3>
            <p className="text-slate-600 mb-4">
              Your OKR data and strategic goals are not used to train public AI models. However, anonymized usage patterns may be used to improve the Service.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Free Service</h2>
            <p className="text-slate-600 mb-4">
              OKR Sherpa is provided free of charge. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Introduce premium features or paid tiers in the future with advance notice</li>
              <li>Modify or discontinue features without liability</li>
              <li>Implement usage limits or rate limiting to ensure fair access</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Intellectual Property</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7.1 Our Property</h3>
            <p className="text-slate-600 mb-4">
              The OKR Sherpa platform, including its design, features, code, and branding, is owned by OKR Sherpa Inc. and protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our Service without permission.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7.2 Trademarks</h3>
            <p className="text-slate-600 mb-4">
              "OKR Sherpa" and associated logos are trademarks of OKR Sherpa Inc. You may not use our trademarks without prior written permission.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Privacy and Data Protection</h2>
            <p className="text-slate-600 mb-4">
              Your use of the Service is also governed by our Privacy Policy. By using OKR Sherpa, you consent to the collection and use of your information as described in the Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Disclaimers and Limitations of Liability</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">9.1 Service "As Is"</h3>
            <p className="text-slate-600 mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">9.2 Limitation of Liability</h3>
            <p className="text-slate-600 mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OKR SHERPA INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES ARISING FROM YOUR USE OF THE SERVICE.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">9.3 Professional Advice Disclaimer</h3>
            <p className="text-slate-600 mb-4">
              OKR Sherpa is a tool for planning and alignment. It does not provide legal, financial, or professional business consulting advice. Consult qualified professionals for specific business decisions.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. Indemnification</h2>
            <p className="text-slate-600 mb-4">
              You agree to indemnify and hold harmless OKR Sherpa Inc., its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Content you submit through the Service</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Third-Party Services</h2>
            <p className="text-slate-600 mb-4">
              Our Service integrates with third-party services including:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Google OAuth for authentication</li>
              <li>Google Gemini AI for content generation</li>
              <li>MongoDB for data storage</li>
            </ul>
            <p className="text-slate-600 mb-4">
              Your use of these third-party services is subject to their respective terms and policies. We are not responsible for third-party service interruptions or changes.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. Modifications to Terms</h2>
            <p className="text-slate-600 mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or prominent notice on the Service. Your continued use after changes become effective constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">13. Governing Law and Dispute Resolution</h2>
            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">13.1 Governing Law</h3>
            <p className="text-slate-600 mb-4">
              These Terms are governed by the laws of the jurisdiction in which OKR Sherpa Inc. is incorporated, without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">13.2 Dispute Resolution</h3>
            <p className="text-slate-600 mb-4">
              Any disputes arising from these Terms or your use of the Service shall first be resolved through good faith negotiation. If negotiation fails, disputes will be resolved through binding arbitration in accordance with applicable arbitration rules.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">14. Severability</h2>
            <p className="text-slate-600 mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">15. Entire Agreement</h2>
            <p className="text-slate-600 mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and OKR Sherpa Inc. regarding the use of our Service and supersede all prior agreements and understandings.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">16. Contact Information</h2>
            <p className="text-slate-600 mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
              <p className="text-slate-700 font-medium">Email: legal@okrsherpa.app</p>
              <p className="text-slate-700 font-medium">Address: OKR Sherpa Inc., Legal Department</p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200 mt-8">
              <p className="text-indigo-900 font-semibold mb-2">
                By using OKR Sherpa, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
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
