import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Clock, ArrowRight, Instagram, Facebook, Music2, MessageCircle } from "lucide-react";
import { mockBusiness } from "../data/mockBusiness";
import heroImg from "../assets/img-hero.png";

function getLuminance(hex: string) {
  if (!hex) return 0;
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function FadeSection({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6 }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

export default function PreviewPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accentColor = mockBusiness.brand.primaryColor || "#B8952A";
  const btnTextColor = getLuminance(accentColor) < 0.4 ? "#FFFFFF" : "#1A1A1A";
  const whatsappUrl = `https://wa.me/54${mockBusiness.whatsapp}`;
  const mapAddress = encodeURIComponent(
    `${mockBusiness.location.address}, ${mockBusiness.location.neighborhood}, Buenos Aires`
  );
  const mapUrl = `https://maps.google.com/maps?q=${mapAddress}&output=embed`;
  const igHandle = mockBusiness.social.instagram?.replace("@", "");

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen text-[#1A1A1A] bg-white scroll-smooth relative">
      
      {/* 1. NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 64,
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.9)", // Always 0.9 as specified
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center justify-between h-full px-5 md:px-8 max-w-[1100px] mx-auto">
          <div className="flex items-center gap-2 font-bold text-[18px] text-[#1A1A1A]">
            {mockBusiness.brand.logoUrl && (
              <img
                src={mockBusiness.brand.logoUrl}
                alt="Logo"
                height="40"
                style={{ objectFit: "contain", maxHeight: "40px" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
            <span>{mockBusiness.name}</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-[14px] hover:opacity-90 transition-opacity"
            style={{
              padding: "10px 20px",
              borderRadius: 12,
              backgroundColor: accentColor,
              color: btnTextColor,
            }}
          >
            Book now
          </a>
        </div>
      </nav>

      {/* 2. HERO */}
      <FadeSection
        className="relative w-full flex items-center justify-center px-5 pt-[64px]"
        style={{
          minHeight: "85vh",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[600px] text-center flex flex-col items-center py-10 z-10 w-full">
          <h1 className="text-white text-[36px] md:text-[52px] font-semibold tracking-[-0.02em] leading-tight text-balance">
            {mockBusiness.name}
          </h1>
          <p className="text-white opacity-85 text-[18px] font-normal leading-[1.6] mt-4 max-w-[90%] md:max-w-full text-balance">
            {mockBusiness.description}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 hover:scale-[1.02] active:scale-95 transition-transform font-medium"
            style={{
              backgroundColor: accentColor,
              color: btnTextColor,
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: 16,
            }}
          >
            Book via WhatsApp
          </a>
          <div className="mt-8 flex items-center gap-1.5 text-white/70 text-[14px]">
            <MapPin size={16} />
            <span>
              {mockBusiness.location.neighborhood}, {mockBusiness.location.address}
            </span>
          </div>
        </div>
      </FadeSection>

      {/* 3. SERVICES SECTION */}
      <FadeSection className="bg-[#F9F9F9] py-[60px] md:py-[80px] px-5">
        <div className="max-w-[1100px] mx-auto text-center md:text-left">
          <div
            className="inline-block px-3 py-1 text-[12px] font-bold uppercase tracking-wider mb-4"
            style={{ color: accentColor, backgroundColor: `${accentColor}1A`, borderRadius: 6 }}
          >
            SERVICES
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#1A1A1A] mb-10">
            What we offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[20px]">
            {mockBusiness.services.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "100px" }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white text-left flex flex-col items-start"
                style={{
                  borderRadius: 16,
                  padding: 28,
                  boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
                  opacity: 1,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-2">{svc.name}</h3>
                <div className="text-[22px] font-semibold mb-2" style={{ color: accentColor }}>
                  ${svc.price}
                </div>
                {svc.duration && (
                  <div className="flex items-center gap-1.5 text-[13px] text-[#999999] mb-6">
                    <Clock size={14} />
                    {svc.duration}
                  </div>
                )}
                <a
                  href={`https://wa.me/54${mockBusiness.whatsapp}?text=${encodeURIComponent(
                    `Hola! Quiero reservar: ${svc.name}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto font-medium flex items-center gap-1 hover:opacity-80 transition-opacity text-[15px]"
                  style={{ color: accentColor }}
                >
                  Book this service <ArrowRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* 4. ABOUT + MAP SECTION */}
      <FadeSection className="bg-[#FFFFFF] py-[60px] md:py-[80px] px-5">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="w-full md:w-[55%] flex flex-col items-start text-left">
            <div
              className="inline-block px-3 py-1 text-[12px] font-bold uppercase tracking-wider mb-4"
              style={{ color: accentColor, backgroundColor: `${accentColor}1A`, borderRadius: 6 }}
            >
              ABOUT
            </div>
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#1A1A1A] mb-6">
              {mockBusiness.name}
            </h2>
            <p className="text-[16px] text-[#555555] leading-[1.7] mb-8">
              {mockBusiness.description}
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <Clock size={24} className="text-[#999999]" />
                <div>
                  <div className="text-[#999999] uppercase text-[12px] font-medium tracking-wider mb-1">
                    Hours
                  </div>
                  <div className="font-medium text-[#1A1A1A]">{mockBusiness.hours}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-[#999999]" />
                <div>
                  <div className="text-[#999999] uppercase text-[12px] font-medium tracking-wider mb-1">
                    Location
                  </div>
                  <div className="font-medium text-[#1A1A1A]">
                    {mockBusiness.location.address}, {mockBusiness.location.neighborhood}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[45%] flex items-center justify-center">
            <iframe
              title="Business Location Map"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: 16 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
            ></iframe>
          </div>
        </div>
      </FadeSection>

      {/* 5. INSTAGRAM EMBED (mock for MVP) */}
      <FadeSection className="bg-[#F9F9F9] py-[60px] md:py-[80px] px-5">
        <div className="max-w-[1100px] mx-auto text-center">
          <div
            className="inline-block px-3 py-1 text-[12px] font-bold uppercase tracking-wider mb-4"
            style={{ color: accentColor, backgroundColor: `${accentColor}1A`, borderRadius: 6 }}
          >
            FOLLOW US
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#1A1A1A] mb-8">
            Our work
          </h2>
          {igHandle && (
            <p className="text-[#555555] font-medium mb-6">@{igHandle}</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <a
                key={i}
                href={igHandle ? `https://instagram.com/${igHandle}` : "#"}
                target="_blank"
                rel="noreferrer"
                className="group relative bg-[#E8E8E8] flex items-center justify-center overflow-hidden"
                style={{ borderRadius: 12, aspectRatio: "1 / 1" }}
              >
                <Instagram size={32} color="#BBBBBB" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[14px] font-medium">
                  View on Instagram
                </div>
              </a>
            ))}
          </div>

          {igHandle && (
            <div className="mt-10">
              <a
                href={`https://instagram.com/${igHandle}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-8 py-3 font-medium transition-colors hover:bg-black/5"
                style={{
                  border: `1px solid ${accentColor}`,
                  color: accentColor,
                  borderRadius: 12,
                }}
              >
                Follow us on Instagram
              </a>
            </div>
          )}
        </div>
      </FadeSection>

      {/* 6. SOCIAL + CTA */}
      <FadeSection className="bg-[#1A1A1A] py-[80px] px-5 flex flex-col items-center text-center">
        <div className="max-w-[560px] w-full flex flex-col items-center">
          <h2 className="text-white text-[32px] md:text-[36px] font-semibold mb-4 text-balance">
            Ready for your next cut?
          </h2>
          <p className="text-[#A0A0A0] text-[16px] mb-8">
            Book directly via WhatsApp. No app needed.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {mockBusiness.social?.instagram && (
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: "all", once: true }}
                transition={{ delay: 0.05 }}
                href={`https://instagram.com/${mockBusiness.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-[44px] h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram size={20} color="white" />
              </motion.a>
            )}
            {mockBusiness.social?.facebook && (
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: "all", once: true }}
                transition={{ delay: 0.1 }}
                href={mockBusiness.social.facebook.startsWith('http') ? mockBusiness.social.facebook : `https://facebook.com/${mockBusiness.social.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="w-[44px] h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Facebook size={20} color="white" />
              </motion.a>
            )}
            {mockBusiness.social?.tiktok && (
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: "all", once: true }}
                transition={{ delay: 0.15 }}
                href={mockBusiness.social.tiktok.startsWith('http') ? mockBusiness.social.tiktok : `https://tiktok.com/@${mockBusiness.social.tiktok.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-[44px] h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Music2 size={20} color="white" />
              </motion.a>
            )}
          </div>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(37,211,102,0.5)",
                "0 0 0 12px rgba(37,211,102,0)",
                "0 0 0 0 rgba(37,211,102,0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-[#25D366] text-white w-full max-w-[360px] py-[16px] flex items-center justify-center gap-2 text-[16px] font-semibold hover:bg-[#20BE5A] transition-colors"
            style={{ borderRadius: 12 }}
          >
            <MessageCircle size={24} />
            Chat on WhatsApp
          </motion.a>

          <div className="mt-8 text-[#666666] text-[13px]">
            <p>{mockBusiness.whatsapp}</p>
            <p className="mt-1">{mockBusiness.location.address}</p>
          </div>
        </div>
      </FadeSection>

      {/* 7. FOOTER */}
      <footer className="bg-[#111111] text-[#666666] text-[13px] py-8 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center flex-col md:flex-row">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <img
              src={mockBusiness.brand.logoUrl}
              alt={mockBusiness.name}
              height="24"
              style={{ objectFit: "contain", maxHeight: "24px" }}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="font-semibold text-white/90">{mockBusiness.name}</span>
          </div>

          <div className="text-center">
            © 2026 {mockBusiness.name}.<br className="md:hidden" />
            <span className="hidden md:inline">{" "}</span>Powered by{" "}
            <Link to="/" className="hover:text-white transition-colors text-[#999999] ml-1">
              StudioClub
            </Link>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-4 flex-wrap">
            {mockBusiness.social?.instagram && (
              <a
                href={`https://instagram.com/${mockBusiness.social.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            )}
            {mockBusiness.social?.facebook && (
              <a
                href={mockBusiness.social.facebook.startsWith('http') ? mockBusiness.social.facebook : `https://facebook.com/${mockBusiness.social.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
            )}
            {mockBusiness.social?.tiktok && (
              <a
                href={mockBusiness.social.tiktok.startsWith('http') ? mockBusiness.social.tiktok : `https://tiktok.com/@${mockBusiness.social.tiktok.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

