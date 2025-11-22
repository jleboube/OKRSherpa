import React, { useState } from 'react';
import { Mountain, ArrowRight, CheckCircle, Zap, Brain, Target, BarChart, Users, ChevronDown, Plus, Minus, Star } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToTerms?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigateToPrivacy, onNavigateToTerms }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 scroll-smooth">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => scrollToSection(e, 'hero')}>
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <Mountain size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">OKR Sherpa</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-white transition-colors">Benefits</a>
              <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-white transition-colors">How it works</a>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-white transition-colors">FAQ</a>
            </div>
            <button 
              onClick={onStart}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO AREA --- */}
      <div id="hero" className="relative bg-slate-900 text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-700/50 rounded-full px-3 py-1 text-xs font-medium text-indigo-300 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Now powered by Gemini 3.0 Pro
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Align your team. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Crush your goals.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop struggling with vague ambitions. The OKR Sherpa uses Socratic reasoning to help you draft measurable, high-impact Objectives and Key Results that align perfectly with leadership goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2"
            >
              Start Drafting Free <ArrowRight size={20} />
            </button>
            <button 
              onClick={(e) => scrollToSection(e, 'benefits')}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold text-lg transition-all"
            >
              View Anatomy
            </button>
          </div>

          <div className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-400" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-indigo-400" /> Instant analysis
            </div>
          </div>
        </div>
      </div>

      {/* --- PARTNERS SECTION --- */}
      <div className="bg-slate-50 border-b border-slate-200 py-10">
        <p className="text-center text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Trusted by leaders moving fast</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
          {['Acme Corp', 'Globex', 'Soylent', 'Initech', 'Umbrella'].map((logo) => (
            <span key={logo} className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-400 rounded-full"></div> {logo}
            </span>
          ))}
        </div>
      </div>

      {/* --- BENEFITS (Bento Box) --- */}
      <section id="benefits" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Focus on outcomes, not output.</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">The Sherpa doesn't just write goals for you; it challenges you to think deeply about what success actually looks like.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Large */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain size={120} className="text-indigo-600" />
            </div>
            <div className="relative z-10">
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                <Brain size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Socratic Reasoning Engine</h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Most AI tools just autocomplete. OKR Sherpa asks probing questions: "How will you measure that?" or "Why does this matter now?" to ensure your goals are robust before you commit.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 p-8 rounded-3xl shadow-sm text-white relative overflow-hidden">
             <div className="absolute -bottom-4 -right-4 bg-indigo-600 w-24 h-24 rounded-full blur-2xl opacity-50"></div>
             <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">North Star Alignment</h3>
              <p className="text-slate-400">
                Every OKR is checked against your Organization's Context. No more siloed goals that don't move the needle.
              </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-green-600">
              <BarChart size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Measurable Results</h3>
            <p className="text-slate-600">
              We enforce quantitative Key Results. If it's not a number, percentage, or boolean, it's not a KR.
            </p>
          </div>

          {/* Card 4 - Large */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1">
                <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Fast & Deep Modes</h3>
                <p className="text-slate-600 text-lg">
                  Switch between <strong>Flash Lite</strong> for quick brainstorming and <strong>Gemini 3.0 Pro</strong> for deep strategic alignment checks.
                </p>
             </div>
             <div className="w-full md:w-1/3 bg-slate-100 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-red-400"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                   <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-2">
                   <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                   <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                   <div className="h-2 bg-indigo-200 rounded w-5/6"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Confusion to Clarity in 3 Steps</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-900 z-0"></div>

            {[
              { icon: Users, title: "1. Set Context", desc: "Input your Leadership or Board goals into Mission Control." },
              { icon: Mountain, title: "2. The Climb", desc: "Chat with the Sherpa. It will ask questions to refine your vague ideas." },
              { icon: CheckCircle, title: "3. Reach the Peak", desc: "Finalize your OKRs with specific metrics and timelines." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <step.icon size={32} className="text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-600">Invest in alignment, it pays dividends.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Starter */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Hiker</h3>
            <div className="my-4"><span className="text-4xl font-bold">$0</span><span className="text-slate-500">/mo</span></div>
            <p className="text-slate-500 text-sm mb-6">Perfect for individual contributors.</p>
            <button onClick={onStart} className="w-full py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors mb-6">Get Started</button>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> Unlimited Drafts</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> Basic Context Analysis</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> Fast Model Access</li>
            </ul>
          </div>

          {/* Pro (Highlighted) */}
          <div className="bg-slate-900 p-8 rounded-2xl border border-indigo-500 shadow-2xl relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">MOST POPULAR</div>
            <h3 className="text-xl font-semibold text-white">Guide</h3>
            <div className="my-4"><span className="text-4xl font-bold text-white">$19</span><span className="text-slate-400">/mo</span></div>
            <p className="text-slate-400 text-sm mb-6">For managers and team leads.</p>
            <button onClick={onStart} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors mb-6">Start Free Trial</button>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2"><CheckCircle size={16} className="text-indigo-400" /> Everything in Hiker</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-indigo-400" /> <strong>Deep Reasoning (Gemini 3.0)</strong></li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-indigo-400" /> PDF/CSV Export</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-indigo-400" /> Team Context Memory</li>
            </ul>
          </div>

          {/* Advanced */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">Expedition</h3>
            <div className="my-4"><span className="text-4xl font-bold">$99</span><span className="text-slate-500">/mo</span></div>
            <p className="text-slate-500 text-sm mb-6">For organizations scaling up.</p>
            <button onClick={onStart} className="w-full py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors mb-6">Contact Sales</button>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> Everything in Guide</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> SSO / SAML</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> Dedicated Success Manager</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500" /> Custom Model Training</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Loved by planners worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Finally, my team understands that 'working hard' isn't a Key Result. The Socratic method actually works.", role: "VP of Engineering", name: "Sarah J." },
              { quote: "The alignment with our board deck is seamless. It catches things I miss.", role: "Product Director", name: "Marcus T." },
              { quote: "I use the Deep Think mode for our annual planning. It's like having a consultant on retainer.", role: "CEO, Startup", name: "Elena R." },
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm text-left">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-yellow-400 fill-yellow-400"/>)}
                </div>
                <p className="text-slate-600 mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-slate-900">{t.name}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            { q: "What makes this different from ChatGPT?", a: "OKR Sherpa is specifically prompted with OKR frameworks (Measure What Matters) and uses a Socratic interaction model to force specific metrics, rather than just generating generic bullet points." },
            { q: "Can I import my existing goals?", a: "Yes! Just paste your current goals into the 'Leadership Goals' section in the Mission Control sidebar, and the Sherpa will help align your new objectives to them." },
            { q: "Is my data secure?", a: "We use enterprise-grade encryption. Your strategic goals are never used to train public models." },
            { q: "What is the 'Deep' model?", a: "The Deep model utilizes Gemini 3.0 Pro's extended thinking budget to perform complex chain-of-thought reasoning, perfect for checking alignment across multiple organizational layers." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between font-semibold text-slate-800 hover:bg-slate-50"
              >
                {item.q}
                {activeFaq === idx ? <Minus size={20} className="text-indigo-600"/> : <Plus size={20} className="text-slate-400"/>}
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-slate-600 leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 bg-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to reach the summit?</h2>
          <p className="text-indigo-100 text-xl mb-10">Join thousands of leaders setting better goals today.</p>
          <button 
            onClick={onStart}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-105"
          >
            Start Your First Draft
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 text-white mb-4 cursor-pointer" onClick={(e) => scrollToSection(e, 'hero')}>
                <Mountain size={20} />
                <span className="font-bold text-lg">OKR Sherpa</span>
             </div>
             <p className="text-sm">Helping teams align, measure, and achieve meaningful results since 2024.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#benefits" onClick={(e) => scrollToSection(e, 'benefits')} className="hover:text-white">Features</a></li>
              <li><a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-white">Pricing</a></li>
              <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-white">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={onStart} className="hover:text-white text-left">OKR Guide</button></li>
              <li><a href="#" className="hover:text-white cursor-default">Blog</a></li>
              <li><a href="#" className="hover:text-white cursor-default">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onNavigateToPrivacy}
                  className="hover:text-white text-left transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToTerms}
                  className="hover:text-white text-left transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs border-t border-slate-800 pt-8">
          &copy; 2024 OKR Sherpa Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};