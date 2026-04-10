/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MessageCircle, 
  Paintbrush, 
  TrendingUp, 
  Moon, 
  Zap, 
  Check, 
  Plus, 
  ArrowRight,
  X
} from 'lucide-react';

// --- Components ---

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-medium tracking-widest uppercase ${className}`}>
    {children}
  </span>
);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-[100px] md:py-[140px] px-6 md:px-12 lg:px-[120px] ${className}`}>
    <div className="max-w-[1200px] mx-auto">
      {children}
    </div>
  </section>
);

const Card = ({ children, className = "", isDark = false }: { children: React.ReactNode, className?: string, isDark?: boolean }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    className={`rounded-[20px] p-8 md:p-10 ${
      isDark 
        ? "bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20" 
        : "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    } ${className}`}
  >
    {children}
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-[16px] font-medium text-[#1A1A1A]">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#999999] group-hover:text-[#1A1A1A]"
        >
          <Plus size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[15px] leading-[1.7] text-[#555555]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SVG Wordmarks for Partners ---

const Wordmark = ({ name }: { name: string }) => (
  <span className="text-[20px] font-semibold tracking-tight text-white opacity-25 hover:opacity-60 transition-opacity duration-200 cursor-default">
    {name}
  </span>
);

// --- Main App ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
  };

  const stagger = (index: number) => ({
    ...fadeIn,
    transition: { ...fadeIn.transition, delay: index * 0.06 }
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[60px] flex items-center px-6 md:px-12 lg:px-[120px] transition-all duration-400 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5" : "bg-transparent"
      }`}>
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between">
          <a href="/" className="text-[18px] font-semibold text-[#1A1A1A]">StudioClub</a>
          
          <div className="hidden md:flex items-center gap-8">
            {["How it works", "Benefits", "Pricing", "FAQ"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[14px] text-[#666666] hover:text-[#1A1A1A] transition-colors">
                {link}
              </a>
            ))}
          </div>

          <a 
            href="/onboarding"
            className="bg-[#1A1A1A] text-[#FAFAFA] px-[22px] py-[10px] rounded-[10px] text-[14px] font-medium hover:scale-[1.03] active:scale-[0.97] transition-all"
          >
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <Section className="bg-[#FAFAFA] pt-[160px] md:pt-[200px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeIn} className="max-w-[560px]">
            <div className="inline-flex items-center gap-2 bg-[#F0F0F0] rounded-full px-3.5 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[12px] font-medium text-[#888888]">+500 businesses online</span>
            </div>
            
            <h1 className="text-[48px] md:text-[72px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-4 max-w-[520px]">
              Your business deserves more than an Instagram link
            </h1>
            
            <p className="text-[17px] leading-[1.7] text-[#555555] mb-12 max-w-[480px]">
              Create a professional site with your services, prices, and a WhatsApp button. No coding, no hiring anyone. Ready in minutes.
            </p>

            <div className="flex items-center gap-4 mb-3">
              <a 
                href="/onboarding"
                className="bg-[#1A1A1A] text-[#FAFAFA] px-7 py-3.5 rounded-[12px] text-[15px] font-medium hover:scale-[1.03] active:scale-[0.97] transition-all"
              >
                Create my site for free
              </a>
              <a 
                href="#how-it-works"
                className="group text-[15px] text-[#888888] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
              >
                See how it works 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="text-[12px] text-[#AAAAAA]">No credit card · No commitment</p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-full aspect-[4/3] bg-[#F0F0F0] rounded-[20px] shadow-[0_24px_60px_rgba(0,0,0,0.06)] flex items-center justify-center"
          >
            <span className="text-[13px] text-[#BBBBBB]">Product screenshot</span>
          </motion.div>
        </div>
      </Section>

      {/* Partners */}
      <section className="bg-[#0F0F0F] py-12 px-6 md:px-12 lg:px-[120px]">
        <div className="max-w-[1200px] mx-auto text-center">
          <Badge className="text-[#555555] mb-8">Built with the best tools</Badge>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["Slack", "OpenAI", "Claude", "Grok", "Notion", "Vercel", "Linear"].map((name) => (
              <div key={name}>
                <Wordmark name={name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section id="benefits" className="bg-[#FAFAFA]">
        <div className="text-center mb-16">
          <Badge className="text-[#6366F1] mb-4">BENEFITS</Badge>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] text-[#1A1A1A] mb-4">
            Instagram convinces the human. Your website convinces the algorithm.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#555555] max-w-[540px] mx-auto">
            Search engines and AIs like ChatGPT can’t read your Instagram stories. With a website, your business shows up when someone searches for what you offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Grid Layout */}
          <Card className="md:col-span-2">
            <Search size={32} className="text-[#6366F1] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Show up on Google and ChatGPT</h3>
            <p className="text-[15px] leading-[1.6] text-[#555555]">Your business visible to clients searching for services like yours in your area.</p>
          </Card>
          <Card>
            <MessageCircle size={32} className="text-[#6366F1] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Stop repeating yourself on WhatsApp</h3>
            <p className="text-[15px] leading-[1.6] text-[#555555]">Your prices, services, and location in one link. Send it and done.</p>
          </Card>
          <Card>
            <Paintbrush size={32} className="text-[#6366F1] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Your brand, your style</h3>
            <p className="text-[15px] leading-[1.6] text-[#555555]">Pick your color, upload your logo. Looks professional and 100% yours.</p>
          </Card>
          <Card>
            <TrendingUp size={32} className="text-[#6366F1] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">More clients, less effort</h3>
            <p className="text-[15px] leading-[1.6] text-[#555555]">A link in your bio that works for you 24/7.</p>
          </Card>
          <Card>
            <Moon size={32} className="text-[#6366F1] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Works while you sleep</h3>
            <p className="text-[15px] leading-[1.6] text-[#555555]">Your site is live around the clock. New clients find you even when you’re with someone.</p>
          </Card>
          <Card className="md:col-span-3">
            <Zap size={32} className="text-[#6366F1] mb-4" />
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">Ready in under 5 minutes</h3>
            <p className="text-[15px] leading-[1.6] text-[#555555]">Fill in your info, see the preview, publish. No waiting, no back-and-forth.</p>
          </Card>
        </div>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="bg-[#0F0F0F] text-white">
        <div className="text-center mb-16">
          <Badge className="text-[#6366F1] mb-4">PROCESS</Badge>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] text-[#F5F5F5] mb-4">
            Your site in 3 steps
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#A0A0A0] max-w-[540px] mx-auto">
            No hassle. Fill in your info and we do the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Fill in your details", desc: "Business name, services, prices, location, and WhatsApp." },
            { step: "02", title: "See the preview", desc: "Your site is generated instantly with your info and branding." },
            { step: "03", title: "Publish and share", desc: "Get your link ready to put in your Instagram bio." }
          ].map((item, i) => (
            <div key={i}>
              <Card isDark className="relative overflow-hidden h-full">
                <span className="absolute top-8 left-8 text-[13px] font-medium text-white/15 tracking-widest">{item.step}</span>
                <div className="pt-8">
                  <h3 className="text-[18px] font-semibold text-[#F5F5F5] mb-2">{item.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-[#A0A0A0]">{item.desc}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-[#FAFAFA]">
        <div className="text-center mb-16">
          <Badge className="text-[#6366F1] mb-4">PRICING</Badge>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] text-[#1A1A1A] mb-4">
            Simple pricing. No surprises.
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#555555] max-w-[540px] mx-auto">
            Try it free for 14 days. No credit card required.
          </p>
        </div>

        <div className="max-w-[400px] mx-auto">
          <Card className="shadow-[0_0_40px_rgba(99,102,241,0.06)] border border-transparent hover:border-[#6366F1]/10">
            <span className="text-[14px] font-medium text-[#999999] mb-4 block">Pro</span>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[56px] font-semibold text-[#1A1A1A]">$5</span>
              <span className="text-[16px] text-[#999999]">/month</span>
            </div>
            <p className="text-[12px] text-[#BBBBBB] mb-8">USD · billed monthly</p>
            
            <div className="space-y-4 mb-10">
              {[
                "Professional website with your branding",
                "Custom subdomain (yourname.studioclub.com)",
                "SEO optimized (Google + AI discovery)",
                "WhatsApp button with click tracking",
                "Mobile-first responsive design",
                "Analytics dashboard"
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <Check size={18} className="text-[#22C55E] mt-0.5 shrink-0" />
                  <span className="text-[15px] text-[#555555]">{feature}</span>
                </div>
              ))}
            </div>

            <a 
              href="/onboarding"
              className="block w-full bg-[#1A1A1A] text-[#FAFAFA] text-center py-4 rounded-[12px] text-[15px] font-medium hover:scale-[1.03] active:scale-[0.97] transition-all mb-4"
            >
              Start free trial
            </a>
            <p className="text-[12px] text-[#BBBBBB] text-center">No credit card needed · Cancel anytime</p>
          </Card>
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="bg-[#0F0F0F] text-white">
        <div className="text-center mb-16">
          <Badge className="text-[#6366F1] mb-4">TESTIMONIALS</Badge>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] text-[#F5F5F5] mb-4">
            What business owners are saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: "I spent months thinking about making a website. With StudioClub I had it ready in 5 minutes. My clients love it.", name: "Mariana G.", detail: "Hair salon, Palermo" },
            { quote: "I used to send my price list as a WhatsApp photo. Now I just share my link. Way more professional.", name: "Diego R.", detail: "Barbershop, Villa Crespo" },
            { quote: "A client told me she found me through Google. That never happened before I had my site.", name: "Camila T.", detail: "Nail studio, Belgrano" }
          ].map((t, i) => (
            <div key={i}>
              <Card isDark className="flex flex-col h-full">
                <p className="text-[15px] italic leading-[1.7] text-[#D0D0D0] mb-8 flex-grow">“{t.quote}”</p>
                <div className="h-px bg-white/10 w-full mb-6" />
                <div>
                  <p className="text-[14px] font-semibold text-[#F5F5F5]">{t.name}</p>
                  <p className="text-[13px] text-[#666666]">{t.detail}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-[#555555] italic text-center mt-12">Names changed. Based on early user feedback.</p>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-[#FAFAFA]">
        <div className="text-center mb-16">
          <Badge className="text-[#6366F1] mb-4">FAQ</Badge>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] text-[#1A1A1A] mb-4">
            Questions? We’ve got answers.
          </h2>
        </div>

        <div className="max-w-[640px] mx-auto">
          {[
            { q: "Do I need to know how to code?", a: "Not at all. You fill out a form with your business info and we generate your site automatically. If you can type on WhatsApp, you can use StudioClub." },
            { q: "Can I use my own domain?", a: "Your site launches on a free subdomain (yourname.studioclub.com). Custom domains available for an additional fee." },
            { q: "How do clients find my site?", a: "Your site is optimized for Google and AI assistants like ChatGPT. When someone searches for services in your area, you show up." },
            { q: "Can I edit my site after publishing?", a: "Contact us via WhatsApp and we’ll update it for you. A self-service editor is coming soon." },
            { q: "What if I want to cancel?", a: "Cancel anytime. No contracts, no penalties." }
          ].map((faq, i) => (
            <div key={i}>
              <FAQItem question={faq.q} answer={faq.a} />
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-[#0F0F0F] bg-gradient-to-b from-[#0F0F0F] to-[#111111] py-[120px] md:py-[160px] px-6 md:px-12 lg:px-[120px] text-center">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-[40px] md:text-[56px] font-semibold text-[#F5F5F5] mb-12 max-w-[640px] mx-auto leading-tight">
            Your next client is searching for you. Will they find you?
          </h2>
          <a 
            href="/onboarding"
            className="inline-block bg-white text-[#0F0F0F] px-10 py-5 rounded-[12px] text-[16px] font-medium hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_32px_rgba(255,255,255,0.06)] transition-all mb-4"
          >
            Create my site for free
          </a>
          <p className="text-[13px] text-[#555555]">Ready in under 5 minutes. No credit card.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#090909] py-[60px] pb-[32px] px-6 md:px-12 lg:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="text-[18px] font-semibold text-[#F5F5F5]">StudioClub</a>
            </div>
            
            <div>
              <h4 className="text-[13px] font-medium text-white/40 uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4">
                {["How it works", "Benefits", "Pricing"].map(l => (
                  <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`} className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-medium text-white/40 uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4">
                {["Privacy Policy", "Terms of Service"].map(l => (
                  <li key={l}><a href="#" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-medium text-white/40 uppercase tracking-widest mb-6">Connect</h4>
              <ul className="space-y-4">
                {["Instagram", "Twitter", "LinkedIn"].map(l => (
                  <li key={l}><a href="#" className="text-[14px] text-[#666666] hover:text-[#F5F5F5] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <p className="text-[13px] text-[#555555]">© 2026 StudioClub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
