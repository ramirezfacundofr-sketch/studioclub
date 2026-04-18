/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus } from 'lucide-react';

// --- Primitive components ---

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

// --- Logo mark ---
const LogoMark = () => (
  <div className="relative w-[22px] h-[22px] rounded-[6px] bg-[#1A1A1A] flex-shrink-0">
    <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] rounded-[2px] bg-[#6366F1]" />
  </div>
);

// --- WhatsApp SVG (reused in multiple places) ---
const WaIcon = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5zM12 22c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A10 10 0 1 1 22 12a10 10 0 0 1-10 10zm5.5-7.5l-2.1-.9c-.3-.1-.5-.1-.7.1l-1 1c-.1.1-.3.2-.5.1a8 8 0 0 1-4-3.5c-.1-.3 0-.5.1-.6l.7-.8c.1-.2.2-.4.1-.6l-.9-2.1c-.1-.3-.4-.4-.7-.4h-.9c-.3 0-.7.1-1 .5-.4.4-1.2 1.2-1.2 2.8s1.2 3.3 1.4 3.5a12 12 0 0 0 4.7 4.1c2.2 1 2.6.8 3.1.8.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3l-.2-.3z" />
  </svg>
);

// --- Marquee logo row (rendered twice for seamless loop) ---
const marqueeLogos = [
  {
    key: 'google', cls: 'ml-google',
    svg: (
      <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 11.2c0-.7-.1-1.4-.2-2H11v3.9h5.9c-.3 1.4-1 2.5-2.2 3.3v2.8h3.6c2.1-1.9 3.2-4.7 3.2-8z" fill="#4285F4" />
        <path d="M11 22c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.7 1.1-2.8 0-5.2-1.9-6.1-4.5H1.2v2.9A11 11 0 0 0 11 22z" fill="#34A853" />
        <path d="M4.9 13.1c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V6H1.2A11 11 0 0 0 0 11c0 1.8.4 3.5 1.2 5l3.7-2.9z" fill="#FBBC05" />
        <path d="M11 4.4c1.6 0 3 .6 4.1 1.6L18.3 3A11 11 0 0 0 11 0 11 11 0 0 0 1.2 6l3.7 2.9C5.8 6.3 8.2 4.4 11 4.4z" fill="#EA4335" />
      </svg>
    ),
    label: 'Google',
  },
  {
    key: 'gmaps', cls: 'ml-gmaps',
    svg: (
      <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 0a8 8 0 0 0-8 8c0 5.6 8 14 8 14s8-8.4 8-14a8 8 0 0 0-8-8z" fill="#EA4335" />
        <circle cx="11" cy="8" r="3" fill="#FFFFFF" />
      </svg>
    ),
    label: 'Google Maps',
  },
  {
    key: 'openai', cls: 'ml-openai',
    svg: (
      <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M20.5 9a5.5 5.5 0 0 0-.5-4.5 5.6 5.6 0 0 0-6-2.7 5.5 5.5 0 0 0-9.3 2 5.5 5.5 0 0 0-3.7 2.7 5.5 5.5 0 0 0 .7 6.5 5.5 5.5 0 0 0 .5 4.5 5.6 5.6 0 0 0 6 2.7 5.5 5.5 0 0 0 9.3-2 5.5 5.5 0 0 0 3.7-2.7 5.5 5.5 0 0 0-.7-6.5zM12.8 20.1a4.1 4.1 0 0 1-2.6-.9l.1-.1 4.4-2.5a.7.7 0 0 0 .4-.6v-6.2l1.9 1.1v5.1a4.1 4.1 0 0 1-4.2 4.1zM4 16.5a4.1 4.1 0 0 1-.5-2.8v-.1l4.4 2.6a.7.7 0 0 0 .7 0l5.4-3.1v2.2l-4.5 2.6a4.1 4.1 0 0 1-5.6-1.4zM2.8 6.9a4.1 4.1 0 0 1 2.1-1.8v5.2a.7.7 0 0 0 .4.6l5.4 3.1L8.8 15l-4.5-2.6a4.1 4.1 0 0 1-1.5-5.5zm15.1 3.5l-5.4-3.1L14.5 6.2l4.5 2.6a4.1 4.1 0 0 1-.6 7.4v-5.3a.7.7 0 0 0-.5-.6zm1.9-2.8l-.1-.1-4.4-2.6a.7.7 0 0 0-.7 0l-5.4 3.1V5.8l4.5-2.6a4.1 4.1 0 0 1 6.1 4.4zm-11.7 4l-1.9-1.1V5.5a4.1 4.1 0 0 1 6.8-3.2l-.1.1L8.4 4.9a.7.7 0 0 0-.4.6zm1-2.3l2.4-1.4 2.4 1.4v2.8l-2.4 1.4-2.4-1.4V9.4z" />
      </svg>
    ),
    label: 'ChatGPT',
  },
  {
    key: 'facebook', cls: 'ml-facebook',
    svg: (
      <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11" cy="11" r="11" fill="#1877F2" />
        <path d="M14.5 11.5h-2.2V18h-2.7v-6.5H8V9.3h1.6V7.8c0-1.8 1-2.8 2.7-2.8h2v2.3h-1.4c-.5 0-.6.2-.6.6v1.4h2l-.3 2.2z" fill="#fff" />
      </svg>
    ),
    label: 'Facebook',
  },
  {
    key: 'tiktok', cls: 'ml-tiktok',
    svg: (
      <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 2h-2.8v12.2a2.3 2.3 0 1 1-2.3-2.3v-2.8a5.1 5.1 0 1 0 5.1 5.1V8.5a6.3 6.3 0 0 0 3.8 1.3V7a3.7 3.7 0 0 1-3.8-3.7V2z" fill="currentColor" />
      </svg>
    ),
    label: 'TikTok',
  },
  {
    key: 'youtube', cls: 'ml-youtube',
    svg: (
      <svg viewBox="0 0 28 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="2" width="28" height="18" rx="5" fill="#FF0000" />
        <path d="M11 7l7 4-7 4V7z" fill="#fff" />
      </svg>
    ),
    label: 'YouTube',
  },
  {
    key: 'whatsapp', cls: 'ml-whatsapp',
    svg: (
      <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8 3.2A11 11 0 0 0 .8 16.4L0 22l5.8-.8A11 11 0 1 0 18.8 3.2zM11 20a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-3.4.9.9-3.3-.2-.3a8.9 8.9 0 1 1 7.5 4.1zm5-6.7l-1.9-.8c-.3-.1-.5-.1-.6.1l-.9.9c-.1.1-.3.1-.5 0a7.3 7.3 0 0 1-3.6-3.2c-.1-.2 0-.4.1-.5l.6-.7c.1-.1.2-.3.1-.5L8.4 6.7c-.1-.3-.3-.3-.6-.3h-.8c-.3 0-.6.1-.9.5-.3.3-1.1 1.1-1.1 2.7s1.1 3 1.3 3.2a10.7 10.7 0 0 0 4.3 3.7c2 .8 2.4.7 2.8.7s1.4-.6 1.6-1.1c.2-.6.2-1 .1-1.2l-.3-.1z" fill="#25D366" />
      </svg>
    ),
    label: 'WhatsApp',
  },
];

const MarqueeRow = ({ suffix }: { suffix: string }) => (
  <div className="flex items-center gap-[56px] pr-[56px] flex-shrink-0">
    {marqueeLogos.map((logo) => (
      <span
        key={logo.key + suffix}
        className={`${logo.cls} h-[22px] inline-flex items-center gap-[10px] grayscale opacity-45 hover:grayscale-0 hover:opacity-100 transition-all duration-300 text-white flex-shrink-0 cursor-default`}
        title={logo.label}
      >
        {logo.key === 'instagram' ? (
          <svg viewBox="0 0 22 22" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id={`igGrad${suffix}`} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FEDA77" />
                <stop offset="40%" stopColor="#F58529" />
                <stop offset="70%" stopColor="#DD2A7B" />
                <stop offset="100%" stopColor="#8134AF" />
              </linearGradient>
            </defs>
            <rect x="1" y="1" width="20" height="20" rx="5.5" fill={`url(#igGrad${suffix})`} />
            <rect x="4.5" y="4.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.7" />
            <circle cx="11" cy="11" r="3.5" fill="none" stroke="#fff" strokeWidth="1.7" />
            <circle cx="16" cy="6" r="1.1" fill="#fff" />
          </svg>
        ) : logo.svg}
        <span className="text-[16px] font-semibold tracking-[-0.015em] text-inherit leading-none">
          {logo.label}
        </span>
      </span>
    ))}
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white">

      {/* ===== NAVBAR ===== */}
      <header
        className="sticky top-0 z-50 border-b border-black/[0.06]"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'saturate(180%) blur(12px)', WebkitBackdropFilter: 'saturate(180%) blur(12px)' }}
      >
        <nav className="max-w-[1280px] mx-auto px-4 lg:px-[88px] py-[18px] flex items-center justify-between">
          <div className="flex items-center gap-[10px] text-[18px] font-semibold tracking-[-0.02em] text-[#1A1A1A]">
            <LogoMark />
            StudioClub
          </div>
          <div className="hidden md:flex items-center gap-9">
            <a href="#how-it-works" className="text-[14px] font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200">How it works</a>
            <a href="#benefits" className="text-[14px] font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200">Benefits</a>
            <a href="#pricing" className="text-[14px] font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors duration-200">Pricing</a>
            <a
              href="/onboarding"
              className="bg-[#1A1A1A] text-white text-[14px] font-medium px-[18px] py-[10px] rounded-[10px] hover:bg-[#6366F1] transition-colors duration-200"
            >
              Get started
            </a>
          </div>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative max-w-[1280px] mx-auto px-4 lg:px-16 pt-[104px] pb-[120px] grid grid-cols-1 xl:grid-cols-2 gap-[72px] items-center overflow-hidden">
        {/* Background radial glow */}
        <div
          className="absolute -left-[120px] top-[40px] w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)' }}
        />

        {/* Left: copy */}
        <div className="relative z-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0 }}
            className="inline-flex items-center gap-[10px] bg-[#EEF0FF] rounded-full px-3 py-[6px] mb-7"
          >
            <span
              className="w-[6px] h-[6px] rounded-full bg-[#6366F1] flex-shrink-0"
              style={{ boxShadow: '0 0 0 4px rgba(99,102,241,0.15)' }}
            />
            <span className="text-[12px] font-medium text-[#6366F1] tracking-[0.01em]">
              New · Now indexed by ChatGPT Search
            </span>
            <span className="bg-white text-[#1A1A1A] text-[11px] font-medium px-2 py-[2px] rounded-full">
              v2.4
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
            className="text-[40px] md:text-[52px] xl:text-[64px] leading-[1.04] font-semibold tracking-[-0.035em] text-[#1A1A1A] mb-6 max-w-[560px]"
          >
            Your business deserves more than an{' '}
            <span className="italic font-[500] text-[#666666]">Instagram link</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.16 }}
            className="text-[18px] leading-[1.55] text-[#666666] mb-10 max-w-[500px]"
          >
            Create a professional website with your services, prices, and location. Be found on Google and ChatGPT — in under 5 minutes.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.24 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-9"
          >
            <a
              href="/onboarding"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-[15px] font-medium px-[22px] py-[14px] rounded-[10px] transition-all duration-300 hover:bg-[#6366F1] hover:-translate-y-px"
              style={{ boxShadow: '0 1px 0 rgba(255,255,255,0.08) inset, 0 4px 14px rgba(26,26,26,0.18)' }}
            >
              Create my site for free
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-1 text-[15px] font-medium text-[#1A1A1A] hover:text-[#6366F1] transition-colors duration-200 group px-[10px] py-[14px]"
            >
              See how it works
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.32 }}
            className="flex items-center gap-[14px] text-[13px] text-[#666666]"
          >
            <div className="flex items-center">
              {[
                { i: 'MG', bg: 'linear-gradient(135deg,#FDE68A,#F59E0B)', color: '#78350F' },
                { i: 'DR', bg: 'linear-gradient(135deg,#C7D2FE,#6366F1)', color: '#fff' },
                { i: 'CT', bg: 'linear-gradient(135deg,#BBF7D0,#22C55E)', color: '#052e16' },
                { i: 'LF', bg: 'linear-gradient(135deg,#FBCFE8,#EC4899)', color: '#500724' },
                { i: '+',  bg: 'linear-gradient(135deg,#E5E7EB,#D1D5DB)', color: '#666' },
              ].map((a, idx) => (
                <span
                  key={idx}
                  className="w-[28px] h-[28px] rounded-full border-2 border-white inline-flex items-center justify-center text-[11px] font-medium"
                  style={{ background: a.bg, color: a.color, marginLeft: idx === 0 ? 0 : '-8px' }}
                >
                  {a.i}
                </span>
              ))}
            </div>
            <span>
              <strong className="font-medium text-[#1A1A1A]">+120 businesses</strong> already have their site
            </span>
          </motion.div>
        </div>

        {/* Right: browser mockup */}
        <div className="relative z-10">
          {/* Float tag: Google */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
            className="hidden xl:flex absolute top-[30px] -left-[32px] z-10 bg-white rounded-[12px] px-[14px] py-[10px] items-center gap-[10px] text-[12px] font-medium text-[#1A1A1A]"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <span className="w-[28px] h-[28px] rounded-[8px] bg-white border border-black/[0.06] inline-flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9c-.3 1.4-1.1 2.6-2.3 3.4v2.9h3.7c2.2-2 3.2-4.9 3.2-8.4z" fill="#4285F4" />
                <path d="M12 23c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 20.6 7.5 23 12 23z" fill="#34A853" />
                <path d="M5.6 13.7c-.2-.7-.4-1.4-.4-2.2s.1-1.5.4-2.2V6.3H1.8C1 7.9.5 9.9.5 12s.5 4.1 1.3 5.7l3.8-4z" fill="#FBBC05" />
                <path d="M12 5.4c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 2 15.1 1 12 1 7.5 1 3.7 3.4 1.8 6.3l3.8 3c.9-2.7 3.4-4.7 6.4-4.9z" fill="#EA4335" />
              </svg>
            </span>
            <div>
              <div className="leading-[1.25]">Ranked #1 on Google</div>
              <div className="text-[11px] font-normal text-[#666666] mt-[2px]">"barbershop villa crespo"</div>
            </div>
          </motion.div>

          {/* Float tag: WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.9 }}
            className="hidden xl:flex absolute bottom-[48px] -right-[28px] z-10 bg-white rounded-[12px] px-[14px] py-[10px] items-center gap-[10px] text-[12px] font-medium text-[#1A1A1A]"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <span className="w-[28px] h-[28px] rounded-[8px] bg-[#E7F9EE] text-[#25D366] inline-flex items-center justify-center flex-shrink-0">
              <WaIcon size={15} />
            </span>
            <div>
              <div className="leading-[1.25]">+38 messages this week</div>
              <div className="text-[11px] font-normal text-[#666666] mt-[2px]">Direct to WhatsApp</div>
            </div>
          </motion.div>

          {/* Browser shell */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="rounded-[14px] overflow-hidden bg-white"
            style={{
              boxShadow: '0 20px 60px -20px rgba(15,15,30,0.18), 0 8px 24px -12px rgba(15,15,30,0.10)',
              transform: 'perspective(2000px) rotateY(-3deg) rotateX(2deg)',
              transformOrigin: 'left center',
            }}
          >
            {/* Browser chrome */}
            <div className="bg-[#F5F5F5] border-b border-black/[0.06] px-[14px] py-[10px] flex items-center gap-3">
              <div className="flex gap-[6px]">
                <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
                <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
                <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-white border border-black/[0.06] rounded-[6px] px-[10px] py-[5px] flex items-center gap-[6px]">
                <svg className="w-[10px] h-[10px] text-[#A0A0A0] flex-shrink-0" viewBox="0 0 14 14" fill="none">
                  <rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M5 6V4a2 2 0 0 1 4 0v2" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="text-[11px] font-medium text-[#1A1A1A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>thecornerbarbershop</span>
                <span className="text-[11px] text-[#666666]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>.studioclub.com</span>
              </div>
              <svg className="w-[14px] h-[14px] text-[#A0A0A0]" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="3.5" r="1" fill="currentColor" />
                <circle cx="7" cy="7" r="1" fill="currentColor" />
                <circle cx="7" cy="10.5" r="1" fill="currentColor" />
              </svg>
            </div>

            {/* Demo site */}
            <div className="bg-[#FAF8F4] text-[#1A1A1A]">
              {/* Site nav */}
              <div className="px-6 py-[14px] flex justify-between items-center border-b border-black/[0.05]" style={{ background: 'rgba(250,248,244,0.85)', backdropFilter: 'blur(6px)' }}>
                <div className="flex items-center gap-[7px] font-semibold text-[13px] tracking-[-0.01em]">
                  <span className="w-[18px] h-[18px] rounded-[4px] bg-[#1A1A1A] inline-flex items-center justify-center text-[10px] font-semibold text-[#FAF8F4]">C</span>
                  The Corner Barbershop
                </div>
                <div className="hidden sm:flex gap-[18px] text-[11px] text-[#666666] font-medium">
                  <span>Services</span><span>Hours</span><span>Find us</span>
                </div>
                <span className="text-[11px] font-medium bg-[#25D366] text-white px-[10px] py-[5px] rounded-[6px] inline-flex items-center gap-[5px]">
                  <WaIcon size={10} />
                  WhatsApp
                </span>
              </div>

              {/* Site hero */}
              <div className="px-7 pt-9 pb-7 grid grid-cols-2 gap-6 items-center">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.14em] text-[#9A8E7A] font-medium mb-[10px]">Villa Crespo · Since 2019</div>
                  <h2 className="text-[30px] font-semibold tracking-[-0.025em] leading-[1.05] mb-3">
                    Classic cuts.<br />
                    <em className="italic font-[500] text-[#7C6F5A]">Modern hands.</em>
                  </h2>
                  <p className="text-[11.5px] leading-[1.5] text-[#666666] mb-4 max-w-[280px]">
                    Precision fades, straight-razor shaves, and warm hospitality. Walk in or book ahead on WhatsApp.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-[11px] font-medium px-3 py-2 rounded-[6px] bg-[#1A1A1A] text-[#FAF8F4]">Book a seat</span>
                    <span className="text-[11px] font-medium px-3 py-2 rounded-[6px] bg-[#25D366] text-white inline-flex items-center gap-[5px]">
                      <WaIcon size={9} />
                      Message us
                    </span>
                  </div>
                </div>
                {/* Photo placeholder */}
                <div
                  className="aspect-[4/5] rounded-[8px] relative overflow-hidden flex items-end p-[10px]"
                  style={{ background: 'repeating-linear-gradient(135deg, #E8DFCE 0 10px, #DFD5C0 10px 20px)' }}
                >
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent 50%)' }} />
                  <span
                    className="relative text-[9px] text-[#FAF8F4] bg-[rgba(26,26,26,0.6)] px-[6px] py-[3px] rounded-[3px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.02em' }}
                  >
                    barbershop-hero.jpg
                  </span>
                </div>
              </div>

              {/* Services */}
              <div className="px-7 pb-5">
                <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.14em] text-[#9A8E7A] font-medium mb-[10px]">
                  <span>Services &amp; prices</span>
                  <span className="text-[#1A1A1A] underline underline-offset-[3px]">See all</span>
                </div>
                {[
                  { name: 'Haircut', price: '$8,500' },
                  { name: 'Beard trim', price: '$5,000' },
                  { name: 'Fade', price: '$9,500' },
                  { name: 'Hot towel shave', price: '$6,500' },
                ].map((s, i, arr) => (
                  <div key={s.name} className={`flex justify-between items-center py-[9px] text-[12px] ${i < arr.length - 1 ? 'border-b border-dashed border-black/[0.08]' : ''}`}>
                    <span className="font-medium">{s.name}</span>
                    <span className="text-[#666666]">{s.price}</span>
                  </div>
                ))}
              </div>

              {/* Site footer bar */}
              <div className="px-7 py-3 flex justify-between items-center border-t border-black/[0.06] text-[10.5px] text-[#666666]">
                <span className="flex items-center gap-[6px]">
                  <svg className="w-[10px] h-[10px]" viewBox="0 0 12 12" fill="none">
                    <path d="M6 11s4-3.5 4-6.5A4 4 0 0 0 2 4.5C2 7.5 6 11 6 11z" stroke="currentColor" strokeWidth="1" />
                    <circle cx="6" cy="4.5" r="1.2" fill="currentColor" />
                  </svg>
                  Corrientes 5320, Villa Crespo
                </span>
                <span>Open today · <strong className="font-medium text-[#1A1A1A]">9am–8pm</strong></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== LOGO STRIP ===== */}
      <section className="bg-[#0F0F0F] h-[200px] overflow-hidden flex flex-col items-center justify-center gap-6">
        <span className="text-[18px] font-medium tracking-[0.08em] uppercase text-[#A0A0A0]">Built to be found</span>
        <div
          className="relative w-full overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div
            className="flex w-max"
            style={{ animation: 'marquee-scroll 35s linear infinite', willChange: 'transform' }}
          >
            <MarqueeRow suffix="a" />
            <MarqueeRow suffix="b" />
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section id="benefits" className="bg-[#F5F5F5] py-[120px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[80px]">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#6366F1] mb-5">Benefits</div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.15] font-semibold tracking-[-0.025em] text-[#1A1A1A] max-w-[720px] mx-auto mb-5">
              Instagram convinces the human. Your website{' '}
              <em className="italic font-[500] text-[#666666]">convinces the algorithm.</em>
            </h2>
            <p className="text-[17px] leading-[1.55] text-[#666666] max-w-[560px] mx-auto">
              Search engines and AIs like ChatGPT can't read your Instagram stories. With a website, your business shows up when someone searches for what you offer.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

            {/* Hero card: Google SERP — 4×2 */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 flex flex-col md:col-span-2 xl:col-span-4 xl:row-span-2">
              <div className="flex-1 bg-[#FAFAFA] m-4 rounded-[12px] p-8 relative flex items-stretch" style={{ minHeight: 320 }}>
                {/* Ranked badge */}
                <div
                  className="absolute -top-[10px] -right-[10px] z-10 bg-white rounded-full px-3 py-[6px] text-[11px] font-medium text-[#1A1A1A] inline-flex items-center gap-[6px]"
                  style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}
                >
                  <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E]" style={{ boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
                  Ranked #1 on Google
                </div>
                {/* SERP mockup */}
                <div className="w-full bg-white rounded-[10px] border border-black/[0.06] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
                  <div className="flex items-center gap-[10px] bg-[#F5F5F5] rounded-full px-[14px] py-2 text-[13px] text-[#1A1A1A] mb-[14px]">
                    <svg className="w-[14px] h-[14px] text-[#666666] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    barbershop villa crespo
                  </div>
                  <div className="flex gap-2 mb-3">
                    {['All', 'Maps', 'Images', 'News'].map((chip, i) => (
                      <span key={chip} className={`text-[11px] px-[10px] py-1 rounded-full border ${i === 0 ? 'text-[#1A1A1A] border-[#1A1A1A]' : 'text-[#666666] border-black/[0.08]'}`}>{chip}</span>
                    ))}
                  </div>
                  <div className="pt-[10px]">
                    <div className="text-[11px] text-[#666666] flex items-center gap-[6px] mb-[2px]">
                      <span className="w-[14px] h-[14px] rounded-full bg-[#1A1A1A] inline-flex items-center justify-center text-[8px] font-semibold text-white flex-shrink-0">C</span>
                      thecornerbarbershop.studioclub.com
                    </div>
                    <div className="text-[14px] text-[#6366F1] font-medium mb-[2px]">The Corner Barbershop — Classic cuts, modern hands</div>
                    <div className="text-[11px] text-[#666666] leading-[1.45]">Precision fades, straight-razor shaves, and warm hospitality in Villa Crespo.</div>
                  </div>
                  {[0, 1].map(i => (
                    <div key={i} className="pt-[10px] mt-[2px] border-t border-black/[0.05]">
                      <div className="h-2 w-[40%] bg-[#EEEEEE] rounded mb-[6px]" />
                      <div className="h-3 w-[65%] bg-[#EEEEEE] rounded mb-[6px]" />
                      <div className="h-2 w-[90%] bg-[#EEEEEE] rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">Show up on Google and ChatGPT</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">When someone searches for a service like yours nearby, your site appears. Instagram doesn't.</p>
              </div>
            </article>

            {/* Side top: WhatsApp chat — 2×1 */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 xl:col-span-2">
              <div className="bg-[#FAFAFA] m-4 rounded-[12px] h-[160px] p-6 flex flex-col gap-[6px] justify-center">
                {['prices?', 'hours?', 'where are you?'].map(msg => (
                  <div key={msg} className="text-[11px] px-3 py-[7px] rounded-[12px] bg-[#F5F5F5] text-[#A0A0A0] line-through self-start">{msg}</div>
                ))}
                <div className="text-[11px] px-3 py-[7px] rounded-[12px] bg-[#1A1A1A] text-white self-end inline-flex items-center gap-[6px] font-medium">
                  <span className="bg-white/[0.12] px-[6px] py-[2px] rounded text-[10px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>thecorner.studioclub.com</span>
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">Stop repeating yourself on WhatsApp</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">Your prices, services, and location in one link. Send it once and done.</p>
              </div>
            </article>

            {/* Side bot: Brand kit — 2×1 */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 xl:col-span-2">
              <div className="bg-[#FAFAFA] m-4 rounded-[12px] h-[160px] p-6 flex items-center">
                <div className="flex items-center gap-[14px]">
                  <div className="w-[56px] h-[56px] bg-[#1A1A1A] text-white rounded-[14px] inline-flex items-center justify-center text-[22px] font-semibold tracking-[-0.02em] flex-shrink-0" style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.10)' }}>C</div>
                  <div className="flex flex-col gap-[6px]">
                    {[
                      { color: '#1A1A1A', label: '#1A1A1A', border: false },
                      { color: '#6366F1', label: '#6366F1', border: false },
                      { color: '#F5F5F5', label: '#F5F5F5', border: true },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-2 text-[10px] text-[#666666]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <span className="w-[14px] h-[14px] rounded-[4px] flex-shrink-0" style={{ background: s.color, border: s.border ? '1px solid rgba(0,0,0,0.06)' : undefined }} />
                        {s.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">Your brand, your style</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">Pick your colors, upload your logo. Looks professional and 100% yours.</p>
              </div>
            </article>

            {/* R2-A: Trend chart — 2×1 */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 xl:col-span-2">
              <div className="bg-[#FAFAFA] m-4 rounded-[12px] h-[160px] p-6 relative overflow-hidden">
                <div className="absolute top-[10%] right-[10%] bg-[#1A1A1A] text-white text-[11px] font-medium px-[10px] py-[5px] rounded-[6px] z-10">
                  +38%<span className="block text-[14px] font-semibold leading-tight">this month</span>
                </div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 85 L40 75 L80 65 L120 48 L160 32 L200 15 L200 100 L0 100 Z" fill="url(#trendGrad)" />
                  <path d="M0 85 L40 75 L80 65 L120 48 L160 32 L200 15" fill="none" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="0" cy="85" r="3" fill="#6366F1" />
                  <circle cx="80" cy="65" r="3" fill="#6366F1" />
                  <circle cx="200" cy="15" r="4" fill="#6366F1" stroke="#FFF" strokeWidth="2" />
                </svg>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">More clients, less effort</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">A link in your bio that works for you 24/7.</p>
              </div>
            </article>

            {/* R2-B: Night/notification — 2×1 */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 xl:col-span-2">
              <div className="bg-[#FAFAFA] m-4 rounded-[12px] h-[160px] p-6 relative flex items-center justify-center">
                <span className="absolute top-[18%] left-[22%] w-1 h-1 rounded-full bg-[#1A1A1A] opacity-40" />
                <span className="absolute top-[30%] right-[18%] w-[3px] h-[3px] rounded-full bg-[#1A1A1A] opacity-30" />
                <span className="absolute bottom-[22%] left-[18%] w-[5px] h-[5px] rounded-full bg-[#1A1A1A] opacity-50" />
                <div className="w-[64px] h-[64px] rounded-full bg-[#1A1A1A] relative" style={{ boxShadow: '0 8px 24px rgba(26,26,26,0.15)' }}>
                  <div className="absolute w-[50px] h-[50px] rounded-full bg-[#FAFAFA] top-1 right-1" />
                </div>
                <div className="absolute bottom-[12%] right-[8%] bg-white rounded-[10px] px-3 py-2 flex items-center gap-2 max-w-[70%]" style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
                  <span className="w-[18px] h-[18px] rounded-full bg-[#22C55E] text-white inline-flex items-center justify-center flex-shrink-0">
                    <svg className="w-[10px] h-[10px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.7 6L0 24l6.2-1.6A12 12 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.2-1.2-6.2-3.5-8.5z" />
                    </svg>
                  </span>
                  <div>
                    <span className="text-[11px] font-medium text-[#1A1A1A]">New lead</span>
                    <small className="block text-[9px] text-[#A0A0A0] font-normal mt-px">2:14 AM</small>
                  </div>
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">Works while you sleep</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">Your site is live around the clock. New clients find you even when you're busy.</p>
              </div>
            </article>

            {/* R2-C: Steps — 2×1 */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 xl:col-span-2">
              <div className="bg-[#FAFAFA] m-4 rounded-[12px] h-[160px] p-6 flex flex-col justify-center gap-[14px]">
                <div className="h-1 bg-[#E5E5E5] rounded-full relative">
                  <div className="absolute inset-0 bg-[#6366F1] rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                  {['Fill in', 'Preview', 'Live'].map((label, i) => (
                    <span key={label} className="flex flex-col items-center gap-[6px] text-[10px] font-medium text-[#1A1A1A]">
                      <span className="w-[22px] h-[22px] rounded-full bg-[#6366F1] text-white inline-flex items-center justify-center text-[11px] font-semibold">{i + 1}</span>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">Ready in under 5 minutes</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">Fill in your info, see the preview, publish. No waiting, no back-and-forth.</p>
              </div>
            </article>

            {/* R3-A: WhatsApp message — full width */}
            <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 md:col-span-2 xl:col-span-6">
              <div className="bg-[#FAFAFA] m-4 rounded-[12px] h-[160px] p-6 flex flex-col items-center justify-center gap-2">
                <div
                  className="bg-[#22C55E] text-white px-[14px] py-[10px] text-[13px] font-medium max-w-[85%]"
                  style={{ borderRadius: '14px 14px 14px 2px', boxShadow: '0 4px 14px rgba(34,197,94,0.18)' }}
                >
                  Just sent my first message!
                </div>
                <div className="text-[10px] text-[#A0A0A0] flex items-center gap-[6px] self-end mr-8">
                  Delivered
                  <svg className="w-3 h-3 text-[#22C55E]" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 6l4 4 8-8" /><path d="M7 10l6-6" />
                  </svg>
                </div>
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] tracking-[-0.01em]">No technical skills needed</h3>
                <p className="text-[15px] leading-[1.6] text-[#666666] mt-2">If you can send a WhatsApp message, you can build your site with StudioClub.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
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

      {/* ===== PRICING ===== */}
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

      {/* ===== TESTIMONIALS ===== */}
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
                <p className="text-[15px] italic leading-[1.7] text-[#D0D0D0] mb-8 flex-grow">"{t.quote}"</p>
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

      {/* ===== FAQ ===== */}
      <Section id="faq" className="bg-[#FAFAFA]">
        <div className="text-center mb-16">
          <Badge className="text-[#6366F1] mb-4">FAQ</Badge>
          <h2 className="text-[32px] md:text-[48px] font-semibold tracking-[-0.02em] text-[#1A1A1A] mb-4">
            Questions? We've got answers.
          </h2>
        </div>

        <div className="max-w-[640px] mx-auto">
          {[
            { q: "Do I need to know how to code?", a: "Not at all. You fill out a form with your business info and we generate your site automatically. If you can type on WhatsApp, you can use StudioClub." },
            { q: "Can I use my own domain?", a: "Your site launches on a free subdomain (yourname.studioclub.com). Custom domains available for an additional fee." },
            { q: "How do clients find my site?", a: "Your site is optimized for Google and AI assistants like ChatGPT. When someone searches for services in your area, you show up." },
            { q: "Can I edit my site after publishing?", a: "Contact us via WhatsApp and we'll update it for you. A self-service editor is coming soon." },
            { q: "What if I want to cancel?", a: "Cancel anytime. No contracts, no penalties." }
          ].map((faq, i) => (
            <div key={i}>
              <FAQItem question={faq.q} answer={faq.a} />
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-[#0F0F0F] py-[120px] md:py-[160px] px-6 md:px-12 lg:px-[120px] text-center">
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

      {/* ===== FOOTER ===== */}
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
