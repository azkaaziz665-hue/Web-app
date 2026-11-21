import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import appScreenshot from "./assets/app-screenshot.png";
import { APP_CONFIG } from "./config";
import {
  FaBars, FaTimes, FaDownload, FaPlay, FaWifi,
  FaBatteryFull, FaCamera, FaTags, FaVideo,
  FaBullseye, FaArrowUp, FaClock, FaChartPie,
  FaSatelliteDish, FaMicrochip, FaPollH,
  FaExclamationTriangle, FaCheckCircle, FaCheck,
  FaMobileAlt, FaChevronDown, FaExpand, FaRedo,
  FaEnvelope, FaGithub, FaAndroid, FaApple, FaPaperPlane,
  FaShieldAlt, FaBuilding, FaFileDownload, FaFileExcel,
  FaSlidersH, FaLightbulb, FaSyncAlt,
} from "react-icons/fa";
import {
  FaXmark as FaX, FaBoltLightning, FaArrowTrendUp,
  FaClockRotateLeft,
} from "react-icons/fa6";

/* ============================================= */
/*  ANIMATION VARIANTS                           */
/* ============================================= */
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

const getAssetUrl = (path) => {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  if (typeof window === "undefined") return `/${clean}`;
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
  return `${currentPath}/${clean}`;
};

function AnimatedSection({ children, className = "", variants = fadeUp }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================= */
/*  1. NAVBAR (Floating Glassmorphic Header)     */
/* ============================================= */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#beranda");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Beranda", href: "#beranda" },
    { label: "Urgensi", href: "#tujuan" },
    { label: "Fitur IoT", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Kematangan", href: "#kematangan" },
    { label: "Demo Live", href: "#demo" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#032517]/92 backdrop-blur-xl shadow-2xl shadow-black/25 border-b border-[#83A590]/20"
          : "bg-[#032517]/98 border-b border-[#1B3B2B]"
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a className="flex items-center gap-3 group" href="#beranda">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#1B3B2B] to-[#032517] flex items-center justify-center shadow-lg border border-[#83A590]/35 group-hover:scale-105 group-hover:border-[#4CD6FB]/60 transition-all overflow-hidden p-1.5">
              <img src={getAssetUrl("ranum-kopi.svg")} alt="Ranum Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FCF9F3] leading-none">
                  Ranum
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  IoT + AI
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#4CD6FB] font-semibold block mt-0.5">
                Coffee Ripeness Vision
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#1B3B2B]/50 p-1.5 rounded-full border border-white/10">
            {links.map((l) => {
              const isActive = activeHash === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setActiveHash(l.href)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#10B981] text-[#032517] shadow-sm"
                      : "text-[#FCF9F3]/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#demo"
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#C7EBD4] hover:text-white border border-[#83A590]/30 hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <FaPlay className="text-[10px] text-[#4CD6FB]" /> Demo Web
            </a>
            <a
              href="#unduh"
              className="bg-gradient-to-r from-[#C0392B] to-[#d94637] hover:from-[#a5281b] hover:to-[#C0392B] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-[#C0392B]/35 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <FaDownload className="text-xs" /> Unduh APK ({APP_CONFIG.apkSize})
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            aria-label="Toggle navigation"
            className="lg:hidden text-white text-xl focus:outline-none p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden bg-[#032517] border-b border-[#1B3B2B] overflow-hidden"
      >
        <div className="px-5 py-4 space-y-1.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-[#FCF9F3] hover:text-[#4CD6FB] py-2.5 px-3 rounded-xl hover:bg-white/5 text-sm font-medium transition-colors"
              onClick={() => {
                setActiveHash(l.href);
                setOpen(false);
              }}
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 grid grid-cols-2 gap-2.5">
            <a
              href="#demo"
              className="bg-white/10 border border-white/15 text-center py-3 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-1.5"
              onClick={() => setOpen(false)}
            >
              <FaPlay className="text-[#4CD6FB]" /> Coba Demo
            </a>
            <a
              href="#unduh"
              className="bg-[#C0392B] text-center py-3 rounded-xl font-bold text-white text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-[#C0392B]/30"
              onClick={() => setOpen(false)}
            >
              <FaDownload /> Unduh APK
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

/* ============================================= */
/*  2. HERO SECTION                              */
/* ============================================= */
function Hero() {
  return (
    <section className="relative hero-pattern text-white pt-10 pb-16 sm:py-20 lg:py-24 overflow-hidden" id="beranda">
      {/* Ambient Decorative Glows */}
      <div className="absolute -top-36 -left-36 w-80 sm:w-[460px] h-80 sm:h-[460px] bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-36 w-80 sm:w-[440px] h-80 sm:h-[440px] bg-[#4CD6FB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline & Metrics */}
          <AnimatedSection className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Status Pill */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 px-3.5 py-1.5 rounded-full bg-[#1B3B2B]/90 backdrop-blur-md border border-[#83A590]/35 text-[11px] sm:text-xs text-[#C7EBD4] font-semibold shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
              <span>YOLOv8 TFLite On-Device</span>
              <span className="text-white/30">•</span>
              <span className="text-[#4CD6FB]">ESP32-CAM & Pan-Tilt Servo</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.15] text-[#FCF9F3] tracking-tight">
              Panen Kopi di Waktu Terbaik,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CD6FB] via-[#C7EBD4] to-[#10B981] block sm:inline">
                Dipandu Visi AI Presisi
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#FCF9F3]/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Sistem pemantauan kematangan ceri kopi berbasis <strong>ESP32-CAM</strong> dengan aktuator{" "}
              <strong>Servo Pan-Tilt 180° yang halus</strong>, lampu malam PWM jarak jauh, serta deteksi{" "}
              <strong>YOLOv8 real-time</strong> langsung di perangkat Android & Web.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#unduh"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#C0392B] to-[#d94637] hover:from-[#a5281b] hover:to-[#C0392B] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#C0392B]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 group"
              >
                <FaAndroid className="text-lg group-hover:scale-110 transition-transform" />
                <span>Unduh APK Android ({APP_CONFIG.apkSize})</span>
              </a>
              <a
                href="#demo"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-[#FCF9F3] font-bold text-sm sm:text-base hover:border-[#4CD6FB]/50 transition-all flex items-center justify-center gap-2.5"
              >
                <FaPlay className="text-xs text-[#4CD6FB]" />
                <span>Uji Coba Simulator Live</span>
              </a>
            </div>

            {/* Key Hardware & AI Telemetry Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-white/15">
              {[
                { val: "94.8%", label: "mAP50 Akurasi AI", color: "text-[#10B981]", sub: "Model best.tflite" },
                { val: "4 Kelas", label: "Level Kematangan", color: "text-[#FFD1B5]", sub: "Mentah – Lewat Matang" },
                { val: "180° Smooth", label: "Kontrol Pan-Tilt", color: "text-[#4CD6FB]", sub: "12 Titik Auto-Scan" },
                { val: "Hotspot AP", label: "Setup WiFi Mudah", color: "text-white", sub: "Portal 192.168.4.1" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3.5 text-left hover:bg-white/10 transition-colors"
                >
                  <div className={`text-lg sm:text-xl font-extrabold font-serif ${stat.color}`}>
                    {stat.val}
                  </div>
                  <div className="text-xs font-semibold text-[#FCF9F3] mt-0.5">{stat.label}</div>
                  <div className="text-[10px] text-[#83A590] mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right Column: Interactive Hero Visual Showcase */}
          <AnimatedSection className="lg:col-span-5 flex justify-center w-full" variants={scaleIn}>
            <HeroPhoneShowcase />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function HeroPhoneShowcase() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px]">
      {/* Floating Telemetry Badge - Top Left */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -left-10 top-14 z-30 glass-dark px-3.5 py-2.5 rounded-2xl shadow-xl animate-float">
        <div className="w-8 h-8 rounded-xl bg-[#10B981]/20 text-[#10B981] flex items-center justify-center text-sm">
          <FaWifi />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#83A590] font-bold">ESP32-CAM Stream</div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" /> HTTPS Relay Aktif
          </div>
        </div>
      </div>

      {/* Floating Telemetry Badge - Bottom Right */}
      <div className="hidden sm:flex items-center gap-2.5 absolute -right-8 bottom-24 z-30 glass-dark px-3.5 py-2.5 rounded-2xl shadow-xl animate-float">
        <div className="w-8 h-8 rounded-xl bg-[#C0392B]/25 text-[#FFD1B5] flex items-center justify-center text-sm">
          <FaSlidersH />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#83A590] font-bold">Servo Pan-Tilt</div>
          <div className="text-xs font-bold text-white">Smooth 1° / 15ms</div>
        </div>
      </div>

      {/* Phone Bezel */}
      <div className="relative rounded-[42px] bg-gradient-to-b from-[#1B3B2B] to-[#032517] p-3 shadow-2xl border-2 border-[#83A590]/40 ring-1 ring-black/40">
        {/* Top Dynamic Island */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20" />

        {/* Screen Content */}
        <div className="rounded-[32px] overflow-hidden bg-[#FCF9F3] text-[#1C1C18] relative">
          {/* App Header Preview */}
          <div className="bg-[#032517] text-white px-4 pt-8 pb-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1B3B2B] p-1 border border-[#83A590]/30">
                <img src={getAssetUrl("ranum-kopi.svg")} alt="Ranum" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-serif font-bold text-sm leading-none">Ranum</div>
                <div className="text-[9px] text-[#4CD6FB] font-semibold">ESP32 STREAM ACTIVE</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1B3B2B] px-2.5 py-1 rounded-full text-[10px] font-bold text-[#10B981] border border-[#10B981]/30">
              <FaBatteryFull /> 96% • 8.2V
            </div>
          </div>

          {/* Screenshot / Vision Preview */}
          <div className="p-3 space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-[#032517] aspect-[16/11] shadow-md border border-[#E5E2DC]">
              <img
                src={appScreenshot}
                alt="Ranum AI Detection Preview"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />

              {/* Simulated Live HUD Pill */}
              <div className="absolute top-2.5 left-2.5 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white flex items-center gap-1.5 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                STREAM ESP32 (cam-1)
              </div>
              <div className="absolute top-2.5 right-2.5 bg-amber-500/90 text-black px-2 py-0.5 rounded-full text-[9px] font-extrabold flex items-center gap-1">
                <FaLightbulb /> PWM 180
              </div>

              {/* Bottom Telemetry Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white font-semibold">
                <span className="bg-black/60 px-2 py-0.5 rounded-md">YOLOv8 • best.tflite</span>
                <span className="bg-[#10B981]/90 text-[#032517] font-bold px-2 py-0.5 rounded-md">
                  Siap Panen: 78%
                </span>
              </div>
            </div>

            {/* Mini Ripeness Distribution Cards */}
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { label: "Mentah", val: "3", bg: "bg-[#27AE60]/12 text-[#1E824C] border-[#27AE60]/30" },
                { label: "Semi", val: "5", bg: "bg-[#E67E22]/12 text-[#D35400] border-[#E67E22]/30" },
                { label: "Matang", val: "28", bg: "bg-[#C0392B]/15 text-[#C0392B] border-[#C0392B]/40" },
                { label: "Lewat", val: "1", bg: "bg-[#880E4F]/12 text-[#880E4F] border-[#880E4F]/30" },
              ].map((c) => (
                <div key={c.label} className={`p-2 rounded-xl border ${c.bg}`}>
                  <div className="text-sm font-extrabold font-serif">{c.val}</div>
                  <div className="text-[9px] font-bold">{c.label}</div>
                </div>
              ))}
            </div>

            {/* Interactive Trigger to Live Demo Section */}
            <a
              href="#demo"
              className="w-full py-3 rounded-xl bg-[#032517] hover:bg-[#1B3B2B] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <FaPlay className="text-[10px] text-[#4CD6FB]" />
              <span>Jalankan Aplikasi Interaktif di Bawah</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================= */
/*  3. TUJUAN (MASALAH & SOLUSI)                 */
/* ============================================= */
function Tujuan() {
  const benefits = [
    { icon: <FaBullseye />, title: "Presisi Objektif", desc: "Model YOLOv8 dilatih mengeliminasi bias visual pemetik pada berbagai kondisi cahaya kebun.", bg: "bg-[#C7EBD4]", color: "text-[#032517]" },
    { icon: <FaArrowTrendUp />, title: "Kualitas Specialty Grade", desc: "Meningkatkan rasio petik merah murni (>90%) untuk menembus harga jual biji kopi premium.", bg: "bg-[#FFD1B5]", color: "text-[#795741]" },
    { icon: <FaClock />, title: "Efisiensi Tenaga Petik", desc: "Kerahkan pemetik hanya pada blok kebun yang benar-benar mencapai puncak kematangan.", bg: "bg-[#B3EBFF]", color: "text-[#003A47]" },
    { icon: <FaFileExcel />, title: "Ekspor Laporan Excel", desc: "Unduh rekapitulasi hasil scan harian langsung ke format Excel (.xlsx) untuk pembukuan kebun.", bg: "bg-[#E5E2DC]", color: "text-[#032517]" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FCF9F3] grid-subtle" id="tujuan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#C0392B]/10 text-[#C0392B] text-xs uppercase tracking-widest font-bold">
            Tujuan & Urgensi
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#032517] mt-3">
            Mengapa Deteksi Otomatis Penting bagi Perkebunan Kopi?
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-4 text-sm sm:text-base leading-relaxed">
            Kualitas secangkir kopi berkelas ditentukan sejak di pohon. Pemantauan manual sering
            terkendala subjektivitas warna dan luasnya area kebun.
          </p>
        </AnimatedSection>

        {/* Problem vs Solution Comparison Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-14"
        >
          <AnimatedSection className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-t-4 border-t-[#C0392B] border border-[#E5E2DC] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#C0392B]/10 text-[#C0392B] font-bold text-xs sm:text-sm mb-4">
                <FaExclamationTriangle className="text-sm shrink-0" />
                <span>Masalah Panen Konvensional</span>
              </div>
              <ul className="space-y-3.5 text-[#424843] text-xs sm:text-sm leading-relaxed">
                {[
                  { title: "Subjektivitas Visual Pemetik:", text: "Penilaian warna buah sering tidak seragam sehingga ceri hijau (green defect) ikut terpetik." },
                  { title: "Penurunan Skor Cupping:", text: "Tercampurnya buah mentah atau busuk di pohon menurunkan cita rasa dan harga jual drastis." },
                  { title: "Biaya Sortasi Pasca-Panen Tinggi:", text: "Panen terlalu dini memaksa proses sortasi manual yang memakan waktu dan biaya ekstra." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#C0392B]/15 text-[#C0392B] flex items-center justify-center shrink-0 mt-0.5">
                      <FaX className="text-[10px]" />
                    </span>
                    <span><strong className="text-[#032517]">{item.title}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EEE8] text-xs text-[#C0392B] font-bold flex items-center justify-between">
              <span>Dampak Kerugian Finansial:</span>
              <span className="bg-[#C0392B]/10 px-2.5 py-1 rounded-lg">Harga Jual Turun 20–30%</span>
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-t-4 border-t-[#10B981] border border-[#E5E2DC] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 text-[#032517] font-bold text-xs sm:text-sm mb-4">
                <FaCheckCircle className="text-sm text-[#10B981] shrink-0" />
                <span>Transformasi Digital Ranum IoT</span>
              </div>
              <ul className="space-y-3.5 text-[#424843] text-xs sm:text-sm leading-relaxed">
                {[
                  { title: "Standardisasi AI YOLOv8:", text: "Klasifikasi otomatis 4 tingkat kematangan secara real-time langsung dari stream ESP32-CAM." },
                  { title: "Pemantauan Pan-Tilt & Auto-Scan:", text: "Kamera berputar halus memindai 12 titik kanopi pohon kopi secara terjadwal maupun manual." },
                  { title: "Kontrol Malam & Telemetri Baterai:", text: "Dilengkapi kontrol lampu Flash LED PWM untuk malam hari serta sensor voltase baterai ADC." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#10B981]/20 text-[#032517] flex items-center justify-center shrink-0 mt-0.5">
                      <FaCheck className="text-[10px] text-[#10B981]" />
                    </span>
                    <span><strong className="text-[#032517]">{item.title}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-[#F0EEE8] text-xs text-[#032517] font-bold flex items-center justify-between">
              <span>Hasil Optimasi Panen:</span>
              <span className="bg-[#10B981]/20 text-[#032517] px-2.5 py-1 rounded-lg">Rasio Petik Merah &gt; 90%</span>
            </div>
          </AnimatedSection>
        </motion.div>

        {/* 4 Value Pillars */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {benefits.map((b) => (
            <AnimatedSection
              key={b.title}
              className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${b.bg} ${b.color} flex items-center justify-center text-xl mb-4 shadow-sm`}>
                {b.icon}
              </div>
              <h4 className="font-serif font-bold text-lg text-[#032517] mb-1.5">{b.title}</h4>
              <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">{b.desc}</p>
            </AnimatedSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  4. FITUR UTAMA (Hardware + Software)         */
/* ============================================= */
function Fitur() {
  const features = [
    {
      badge: "Computer Vision",
      icon: <FaBoltLightning />,
      bg: "bg-[#032517]",
      title: "Deteksi YOLOv8 Lokal (best.tflite)",
      desc: "Inferensi AI berjalan langsung di perangkat menggunakan TensorFlow Lite tanpa membebani server VPS, mendeteksi multi-objek ceri kopi secara simultan.",
    },
    {
      badge: "Aktuator Halus",
      icon: <FaSlidersH />,
      bg: "bg-[#C0392B]",
      title: "Kontrol Servo Pan-Tilt Smooth 180°",
      desc: "Dilengkapi joystick interaktif dan interpolasi pergerakan halus (1° per 15ms) pada ESP32 Servo agar kamera tidak berguncang saat berpindah sudut bidik.",
    },
    {
      badge: "Otomasi Kebun",
      icon: <FaClockRotateLeft />,
      bg: "bg-[#003A47]",
      title: "Auto-Scan 12 Waypoint & Jadwal",
      desc: "Mode pemindaian menyeluruh 4×3 titik kanopi pohon kopi secara otomatis maupun terjadwal, lengkap dengan notifikasi hasil pemindaian.",
    },
    {
      badge: "Visi Malam & Daya",
      icon: <FaLightbulb />,
      bg: "bg-[#E67E22]",
      title: "Kontrol Flash PWM & Monitor Baterai",
      desc: "Atur kecerahan lampu LED ESP32-CAM (PWM 0–255) untuk pemantauan malam hari dan pantau persentase serta voltase baterai secara real-time.",
    },
    {
      badge: "Zero-Code Setup",
      icon: <FaWifi />,
      bg: "bg-[#1B3B2B]",
      title: "Hotspot Captive Portal WiFi",
      desc: "Kedua ESP32 memancarkan hotspot (Ranum-CAM-Setup & Ranum-Servo-Setup) di 192.168.4.1 agar petani bebas mengganti SSID & password WiFi kapan saja lewat HP.",
    },
    {
      badge: "Laporan Agronomi",
      icon: <FaFileExcel />,
      bg: "bg-[#27AE60]",
      title: " Analitik & Ekspor Excel (.xlsx)",
      desc: "Visualisasi grafik donat proporsi kematangan, riwayat inspeksi batch, dan unduh laporan panen langsung dalam format Microsoft Excel.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white" id="fitur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#10B981]/15 text-[#032517] text-xs uppercase tracking-widest font-bold">
            Ekosistem IoT & AI Terpadu
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#032517] mt-3">
            Fitur Unggulan Ranum Smart Coffee Monitor
          </h2>
          <div className="w-16 h-1 bg-[#C0392B] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-4 text-sm sm:text-base">
            Menggabungkan kehandalan perangkat keras dua mikrokontroler ESP32, server relay HTTPS, dan aplikasi multi-platform Flutter.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((f) => (
            <AnimatedSection
              key={f.title}
              className="border border-[#E5E2DC] rounded-3xl p-6 sm:p-7 hover:border-[#10B981] transition-all duration-300 hover:shadow-xl bg-[#FCF9F3] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${f.bg} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#E5E2DC] text-[#424843]">
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#032517] mb-2.5">{f.title}</h3>
                <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  5. CARA KERJA & PANDUAN WIFI PORTAL          */
/* ============================================= */
function CaraKerja() {
  const [activeTab, setActiveTab] = useState("ai");

  const workflows = {
    ai: [
      { num: "01", icon: <FaWifi />, iconBg: "bg-[#C7EBD4] text-[#032517]", title: "Koneksi WiFi & Relay VPS", desc: "ESP32-CAM dan ESP32 Servo terhubung ke jaringan WiFi kebun dan berkomunikasi dengan Relay Server VPS berprotokol HTTPS." },
      { num: "02", icon: <FaVideo />, iconBg: "bg-[#FFD1B5] text-[#795741]", title: "Streaming MJPEG Real-Time", desc: "ESP32-CAM mengirimkan tangkapan citra dahan kopi secara kontinu ke endpoint /upload/cam-1 dengan latensi rendah." },
      { num: "03", icon: <FaMicrochip />, iconBg: "bg-[#B3EBFF] text-[#003A47]", title: "Deteksi YOLOv8 (best.tflite)", desc: "Aplikasi Ranum memproses setiap frame menggunakan model YOLOv8 lokal, menggambar bounding box, dan menghitung tiap kelas ceri." },
      { num: "04", icon: <FaPollH />, iconBg: "bg-[#C7EBD4] text-[#032517]", title: "Keputusan Panen & Excel", desc: "Data kematangan tersimpan ke riwayat batch lengkap dengan rekomendasi kesiapan panen dan ekspor laporan Excel (.xlsx)." },
    ],
    wifi: [
      { num: "01", icon: <FaSatelliteDish />, iconBg: "bg-[#FFD1B5] text-[#795741]", title: "Hotspot Otomatis / Tombol BOOT", desc: "Saat WiFi belum diatur atau jaringan lag >12 detik (atau tombol BOOT ditekan 3 detik), ESP32 memancarkan WiFi Setup." },
      { num: "02", icon: <FaMobileAlt />, iconBg: "bg-[#B3EBFF] text-[#003A47]", title: "Sambungkan HP ke Hotspot ESP", desc: "Hubungkan ponsel Anda ke WiFi 'Ranum-CAM-Setup' atau 'Ranum-Servo-Setup' tanpa memerlukan password." },
      { num: "03", icon: <FaSlidersH />, iconBg: "bg-[#C7EBD4] text-[#032517]", title: "Buka Portal http://192.168.4.1", desc: "Halaman Captive Portal akan terbuka otomatis. Pilih jaringan WiFi sekitar dari daftar scan dan masukkan password-nya." },
      { num: "04", icon: <FaCheckCircle />, iconBg: "bg-[#C7EBD4] text-[#10B981]", title: "Tersimpan Permanen di Flash NVS", desc: "Klik Simpan & Sambungkan. ESP32 menyimpan WiFi baru di memori permanen NVS dan langsung me-restart ke jaringan baru." },
    ],
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F6F3ED] border-y border-[#E5E2DC]" id="cara-kerja">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#032517]/10 text-[#032517] text-xs uppercase tracking-widest font-bold">
            Alur Operasional
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#032517] mt-3">
            Bagaimana Sistem Ranum Bekerja?
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />

          {/* Interactive Workflow Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#E5E2DC] shadow-sm mt-6">
            <button
              onClick={() => setActiveTab("ai")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "ai"
                  ? "bg-[#032517] text-white shadow"
                  : "text-[#424843] hover:text-[#032517]"
              }`}
            >
              1. Alur Deteksi AI & IoT
            </button>
            <button
              onClick={() => setActiveTab("wifi")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "wifi"
                  ? "bg-[#C0392B] text-white shadow"
                  : "text-[#424843] hover:text-[#032517]"
              }`}
            >
              2. Cara Ganti WiFi ESP32 (Hotspot)
            </button>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {workflows[activeTab].map((s, i) => (
            <motion.div
              key={`${activeTab}-${s.num}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all border border-[#E5E2DC] relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${s.iconBg} flex items-center justify-center text-lg shadow-sm`}>
                  {s.icon}
                </div>
                <span className="font-serif text-2xl font-extrabold text-[#032517]/15">
                  STEP {s.num}
                </span>
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#032517] mb-2">{s.title}</h3>
              <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  6. KLASIFIKASI KEMATANGAN                    */
/* ============================================= */
function Kematangan() {
  const classes = [
    {
      label: "Kelas 0",
      readiness: "15%",
      color: "from-[#27AE60] to-[#1E824C]",
      barColor: "bg-[#27AE60]",
      subtitle: "Klorofil Dominan",
      title: "Mentah (Unripe)",
      desc: "Ceri berwarna hijau pekat, tekstur keras, kandungan gula buah belum terbentuk.",
      action: "Jangan dipetik. Biarkan di pohon dan pantau perkembangan warna secara berkala.",
      actionBg: "bg-[#27AE60]/10 text-[#1E824C] border-[#27AE60]/30",
    },
    {
      label: "Kelas 1",
      readiness: "55%",
      color: "from-[#E67E22] to-[#D35400]",
      barColor: "bg-[#E67E22]",
      subtitle: "Transisi Warna",
      title: "Setengah Matang (Semi-ripe)",
      desc: "Kulit ceri mulai kuning kemerahan, kadar asam masih tinggi dan aroma belum optimal.",
      action: "Tunggu 3–5 hari lagi hingga berubah merah penuh untuk hasil specialty grade.",
      actionBg: "bg-[#E67E22]/10 text-[#D35400] border-[#E67E22]/30",
    },
    {
      label: "Kelas 2",
      readiness: "100%",
      color: "from-[#C0392B] to-[#96281B]",
      barColor: "bg-[#C0392B]",
      subtitle: "Puncak Kualitas (Red Cherry)",
      title: "Matang (Ripe)",
      desc: "Merah ceri merata dengan keseimbangan gula (Brix) dan keasaman terbaik.",
      action: "SEGERA PETIK! Jendela panen emas untuk menghasilkan biji kopi bernilai jual tertinggi.",
      actionBg: "bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/30",
      highlight: true,
    },
    {
      label: "Kelas 3",
      readiness: "Lewat",
      color: "from-[#880E4F] to-[#4A148C]",
      barColor: "bg-[#880E4F]",
      subtitle: "Fermentasi Berlebih",
      title: "Lewat Matang (Overripe)",
      desc: "Merah kehitaman atau mulai mengering di dahan, berisiko menimbulkan rasa fermentasi berlebih.",
      action: "Petik dan pisahkan dari kelompok ceri merah prima agar tidak mencemari batch utama.",
      actionBg: "bg-[#880E4F]/10 text-[#880E4F] border-[#880E4F]/30",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FCF9F3]" id="kematangan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#C0392B]/10 text-[#C0392B] text-xs uppercase tracking-widest font-bold">
            Standar Klasifikasi AI
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#032517] mt-3">
            4 Kelas Kematangan Buah Kopi pada Model YOLOv8
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-4 text-sm sm:text-base leading-relaxed">
            Setiap objek buah kopi yang tertangkap kamera ESP32-CAM dikelompokkan secara otomatis ke dalam
            4 parameter agronomi berikut.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {classes.map((c) => (
            <AnimatedSection
              key={c.label}
              className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border flex flex-col justify-between ${
                c.highlight ? "border-[#C0392B] ring-2 ring-[#C0392B]/25" : "border-[#E5E2DC]"
              }`}
            >
              <div>
                <div className={`h-32 bg-gradient-to-br ${c.color} flex items-center justify-center text-white relative p-4`}>
                  <span className="absolute top-3 right-3 bg-black/25 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {c.label}
                  </span>
                  {c.highlight && (
                    <span className="absolute top-3 left-3 bg-white text-[#C0392B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shadow">
                      ★ Target Panen
                    </span>
                  )}
                  <div className="text-center">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mx-auto text-sm font-extrabold">
                      {c.readiness}
                    </div>
                    <div className="text-xs font-semibold mt-2 opacity-95">{c.subtitle}</div>
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="font-serif font-bold text-lg text-[#032517]">{c.title}</h4>
                  <p className="text-xs text-[#424843] mt-1.5 leading-relaxed">{c.desc}</p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className={`p-3 rounded-2xl text-[11px] font-medium border ${c.actionBg}`}>
                  <span className="font-bold block mb-0.5">Rekomendasi Tindakan:</span>
                  {c.action}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  7. DEMO APLIKASI (PRO INTERACTIVE STUDIO)    */
/* ============================================= */
function Demo() {
  const [iframeKey, setIframeKey] = useState(0);
  const demoSrc = getAssetUrl("app-web/index.html");

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#E5E2DC]" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#10B981]/15 text-[#032517] text-xs uppercase tracking-widest font-bold">
            Interactive Live Simulator
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#032517] mt-3">
            Uji Coba Langsung Aplikasi Ranum (Flutter Web)
          </h2>
          <div className="w-16 h-1 bg-[#C0392B] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-3 text-xs sm:text-base max-w-2xl mx-auto">
            Simulator di bawah ini menjalankan aplikasi <strong>Ranum versi terbaru</strong> yang sudah
            terhubung langsung ke Relay Server HTTPS (<code>https://80.43.0.86.nip.io</code>) dan khusus
            menggunakan stream <strong>ESP32-CAM</strong>.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Panel: Interactive Guide & Controls */}
          <AnimatedSection className="lg:col-span-5 space-y-5 order-2 lg:order-1">
            <div className="bg-[#FCF9F3] border border-[#E5E2DC] rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-3.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#10B981]">
                    Status Koneksi Cloud
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#032517]">
                    Panduan Uji Coba Cepat
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#032517] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  HTTPS Ready
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#424843]">
                {[
                  {
                    num: "1",
                    title: "Live Stream ESP32-CAM & Lampu Malam",
                    desc: "Di tab Beranda, pantau stream video langsung dari ESP32-CAM (cam-1) dan uji tombol/slider Lampu Flash Malam (PWM 0–255).",
                  },
                  {
                    num: "2",
                    title: "Kontrol Servo Pan-Tilt Halus",
                    desc: "Gunakan Joystick atau tombol arah untuk menggerakkan kamera secara smooth (1°/15ms), atau beralih ke tab Auto-Scan 12 titik.",
                  },
                  {
                    num: "3",
                    title: "Hasil Analitik & Ekspor Excel",
                    desc: "Buka tab Hasil untuk melihat grafik distribusi kematangan ceri dan mengunduh file laporan Excel (.xlsx).",
                  },
                  {
                    num: "4",
                    title: "Status Hardware & Baterai",
                    desc: "Buka tab Setelan untuk memantau status ESP32-CAM, persentase baterai ESP32 Servo, serta mengatur jadwal scan otomatis.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex gap-3 p-3 rounded-2xl bg-white border border-[#E5E2DC]">
                    <span className="w-6 h-6 rounded-full bg-[#032517] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <div className="font-bold text-[#032517]">{item.title}</div>
                      <div className="text-[#424843] mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Toolbar for Simulator */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  onClick={() => setIframeKey((k) => k + 1)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white hover:bg-[#F0EEE8] text-[#032517] border border-[#E5E2DC] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FaRedo className="text-[#C0392B]" /> Muat Ulang Demo
                </button>
                <a
                  href={demoSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#032517] hover:bg-[#1B3B2B] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <FaExpand className="text-[#4CD6FB]" /> Buka Layar Penuh
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Panel: Live Flutter Web Phone Frame */}
          <AnimatedSection className="lg:col-span-7 flex flex-col items-center order-1 lg:order-2" variants={scaleIn}>
            <div className="relative w-full max-w-[340px] sm:max-w-[385px] h-[660px] sm:h-[740px] rounded-[44px] sm:rounded-[50px] bg-gradient-to-b from-[#1B3B2B] to-[#032517] p-3 sm:p-3.5 shadow-2xl border-[3px] border-[#83A590]/40 ring-1 ring-black/30 mx-auto">
              {/* Top Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-5 bg-black rounded-full z-30 pointer-events-none" />

              {/* Iframe Flutter Web App */}
              <div className="w-full h-full rounded-[34px] sm:rounded-[38px] overflow-hidden bg-[#FCF9F3] relative shadow-inner">
                <iframe
                  key={iframeKey}
                  src={demoSrc}
                  title="Aplikasi Asli Flutter Ranum Coffee Ripeness"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              {/* Bottom Home Bar */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-1 bg-white/40 rounded-full pointer-events-none z-30" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  8. UNDUH                                     */
/* ============================================= */
function Unduh() {
  const apkUrl = APP_CONFIG.apkDownloadUrl.startsWith("http")
    ? APP_CONFIG.apkDownloadUrl
    : getAssetUrl(APP_CONFIG.apkDownloadUrl);

  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-[#032517] via-[#00232C] to-[#00181F] text-white relative overflow-hidden"
      id="unduh"
    >
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#4CD6FB]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B3B2B] border border-[#83A590]/40 text-[#4CD6FB] text-xs font-bold uppercase tracking-wider">
            <FaDownload /> Pusat Unduhan Resmi
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#FCF9F3] mt-3">
            Pasang Aplikasi Ranum di Perangkat Anda
          </h2>
          <p className="text-[#FCF9F3]/80 mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed">
            Unduh paket instalasi Android (APK) yang sudah dioptimasi dengan ukuran ramping ({APP_CONFIG.apkSize}),
            atau jalankan langsung melalui browser sebagai Web App.
          </p>
        </AnimatedSection>

        <AnimatedSection className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl" variants={scaleIn}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-7 border-b border-white/15">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#1B3B2B] to-[#032517] flex items-center justify-center shadow-xl border border-[#83A590]/40 shrink-0 overflow-hidden p-2.5">
                <img src={getAssetUrl("ranum-kopi.svg")} alt="Ranum Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                    Ranum Mobile App
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                    ARM64 Optimized
                  </span>
                </div>
                <p className="text-xs text-[#C7EBD4]/80 mt-1">
                  Deteksi Kematangan Kopi YOLOv8 • Stream ESP32-CAM & Kontrol Servo Pan-Tilt
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-3 text-xs text-[#FCF9F3]/85">
                  <span className="bg-white/15 px-3 py-1 rounded-full font-semibold">Versi: {APP_CONFIG.version}</span>
                  <span className="bg-white/15 px-3 py-1 rounded-full font-semibold">Ukuran: {APP_CONFIG.apkSize}</span>
                  <span className="text-[#10B981] font-semibold flex items-center gap-1">
                    <FaShieldAlt /> Terhubung HTTPS Relay
                  </span>
                </div>
              </div>
            </div>
            <a
              href={apkUrl}
              download="ranum.apk"
              className="w-full md:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-[#C0392B] to-[#d94637] hover:from-[#a5281b] hover:to-[#C0392B] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#C0392B]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 shrink-0"
            >
              <FaDownload className="text-base" />
              <span>Unduh ranum.apk</span>
            </a>
          </div>

          <div className="pt-7 grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base mb-2">
                  <FaAndroid className="text-[#10B981] text-xl" />
                  <h4>Paket APK Android Mandiri</h4>
                </div>
                <p className="text-xs text-[#FCF9F3]/75 leading-relaxed mb-4">
                  Termasuk model AI <code>best.tflite</code> di dalam aplikasi sehingga deteksi kematangan
                  berjalan cepat di ponsel Android tanpa membebani kuota server.
                </p>
              </div>
              <a
                href={apkUrl}
                download="ranum.apk"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-all hover:scale-[1.01] w-full sm:w-auto"
              >
                <FaFileDownload /> Unduh File APK ({APP_CONFIG.apkSize})
              </a>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 text-white font-bold text-sm sm:text-base mb-2">
                  <FaApple className="text-[#4CD6FB] text-xl" />
                  <h4>Akses Instan via Web / iOS Safari</h4>
                </div>
                <p className="text-xs text-[#FCF9F3]/75 leading-relaxed mb-4">
                  Pengguna iPhone, iPad, atau laptop dapat membuka versi Web App layar penuh secara
                  langsung atau menambahkannya ke Layar Utama (Add to Home Screen).
                </p>
              </div>
              <a
                href={getAssetUrl("app-web/index.html")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4CD6FB]/15 hover:bg-[#4CD6FB]/25 text-[#4CD6FB] font-bold text-xs border border-[#4CD6FB]/30 transition-all hover:scale-[1.01] w-full sm:w-auto"
              >
                <FaExpand /> Buka Web App Layar Penuh
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================= */
/*  9. FAQ                                       */
/* ============================================= */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    {
      q: "Bagaimana cara mengganti nama WiFi dan password pada kedua ESP32 jika pindah lokasi atau jaringan lag?",
      a: "Sangat mudah tanpa perlu koding ulang. Jika WiFi lama tidak terjangkau selama 12 detik (atau Anda menekan tombol BOOT 3 detik pada ESP32 Servo), alat akan memancarkan hotspot 'Ranum-CAM-Setup' dan 'Ranum-Servo-Setup'. Sambungkan HP ke hotspot tersebut, buka http://192.168.4.1 di browser, lalu pilih WiFi baru dan masukkan password-nya.",
    },
    {
      q: "Mengapa aplikasi hanya menggunakan kamera ESP32-CAM dan bukan kamera internal HP?",
      a: "Sistem Ranum dirancang khusus sebagai solusi pemantauan kebun berbasis IoT statis & Pan-Tilt jarak jauh. Seluruh deteksi difokuskan pada stream real-time dari modul ESP32-CAM yang terpasang pada dudukan servo di kebun kopi.",
    },
    {
      q: "Bagaimana cara kerja pergerakan servo Pan-Tilt agar hasil kamera tidak goyang/blur?",
      a: "Firmware ESP32 Servo telah dilengkapi algoritma interpolasi halus (smooth step 1 derajat setiap 15 milidetik). Saat Anda menggeser sudut dari 90° ke 180°, servo bergerak perlahan dan mulus tanpa menghentak dahan atau kamera.",
    },
    {
      q: "Apakah pemantauan tetap bisa dilakukan pada malam hari atau cuaca mendung gelap?",
      a: "Ya. Aplikasi dilengkapi fitur kontrol Lampu Flash Malam (PWM 0–255) yang terhubung langsung ke LED high-power GPIO 4 pada ESP32-CAM AI-Thinker, sehingga pencahayaan objek buah kopi dapat diatur dari jarak jauh.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FCF9F3]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#C0392B]/10 text-[#C0392B] text-xs uppercase tracking-widest font-bold">
            Pusat Bantuan
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#032517] mt-3">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
        </AnimatedSection>

        <div className="space-y-3.5">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <AnimatedSection
                key={i}
                className={`bg-white rounded-2xl shadow-sm border transition-colors overflow-hidden ${
                  isOpen ? "border-[#10B981]" : "border-[#E5E2DC]"
                }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-[#032517] text-sm sm:text-base hover:text-[#C0392B] transition-colors gap-4 cursor-pointer"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen ? "bg-[#032517] text-white rotate-180" : "bg-[#F6F3ED] text-[#032517]"
                    }`}
                  >
                    <FaChevronDown className="text-xs" />
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-xs sm:text-sm text-[#424843] leading-relaxed border-t border-[#F0EEE8] pt-3">
                    {faq.a}
                  </div>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  10. TENTANG & KONTAK                         */
/* ============================================= */
function Kontak() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E5E2DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-gradient-to-br from-[#FCF9F3] via-white to-[#F6F3ED] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E5E2DC] shadow-md">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3.5 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#10B981]/15 text-[#032517] text-xs uppercase tracking-widest font-bold">
                Kolaborasi & Penelitian
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#032517]">
                Tentang Tim Pengembang Ranum
              </h2>
              <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">
                Dikembangkan oleh <strong>Tim Riset Smart Farming Ranum</strong>, menggabungkan
                teknologi Internet of Things (ESP32 Dual-Node) dan Computer Vision YOLOv8 untuk
                mendukung modernisasi perkebunan kopi presisi di Indonesia.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-[#424843] pt-1">
                <span className="flex items-center gap-1.5">
                  <FaBuilding className="text-[#C0392B]" /> Laboratorium Smart Agro & IoT
                </span>
                <span className="flex items-center gap-1.5">
                  <FaEnvelope className="text-[#10B981]" /> kontak@ranum-kopi.id
                </span>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3 w-full">
              <a
                href="mailto:kontak@ranum-kopi.id"
                className="px-5 py-3.5 rounded-xl bg-[#032517] hover:bg-[#1B3B2B] text-white text-center text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <FaPaperPlane /> Hubungi Tim Pengembang
              </a>
              <a
                href="https://github.com/azkaaziz665-hue/Web-app"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-gray-50 border border-[#E5E2DC] text-[#032517] text-center text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaGithub className="text-sm" /> Repositori GitHub Proyek
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================= */
/*  11. FOOTER                                   */
/* ============================================= */
function Footer() {
  return (
    <footer className="bg-[#00181F] text-white pt-14 pb-10 border-t border-[#00232C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div className="space-y-3.5 sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1B3B2B] border border-[#83A590]/40 flex items-center justify-center overflow-hidden p-1.5">
                <img src={getAssetUrl("ranum-kopi.svg")} alt="Ranum Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                Ranum
              </span>
            </div>
            <p className="text-xs text-[#FCF9F3]/70 max-w-md leading-relaxed">
              Sistem Cerdas Deteksi Tingkat Kematangan Buah Kopi Otomatis Berbasis YOLOv8,
              ESP32-CAM, dan Aktuator Servo Pan-Tilt Halus.
            </p>
            <div className="text-[11px] text-[#FCF9F3]/50">
              Mendukung kemajuan pertanian kopi presisi nusantara.
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-white mb-3.5 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-xs text-[#FCF9F3]/75">
              {[
                { label: "Beranda", href: "#beranda" },
                { label: "Tujuan & Urgensi", href: "#tujuan" },
                { label: "Fitur IoT & AI", href: "#fitur" },
                { label: "Cara Kerja & Setup WiFi", href: "#cara-kerja" },
                { label: "Klasifikasi Kematangan", href: "#kematangan" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-[#4CD6FB] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-white mb-3.5 uppercase tracking-wider">Akses Cepat</h4>
            <ul className="space-y-2 text-xs text-[#FCF9F3]/75">
              <li><a href="#demo" className="hover:text-[#4CD6FB] transition-colors">Simulator Flutter Web</a></li>
              <li><a href="#unduh" className="hover:text-[#4CD6FB] transition-colors">Unduh APK Android ({APP_CONFIG.apkSize})</a></li>
              <li><a href={getAssetUrl("app-web/index.html")} target="_blank" rel="noreferrer" className="hover:text-[#4CD6FB] transition-colors">Buka Web App Layar Penuh</a></li>
              <li><a href="#faq" className="hover:text-[#4CD6FB] transition-colors">Panduan & FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FCF9F3]/50 gap-3 text-center sm:text-left">
          <div>© {new Date().getFullYear()} Ranum Coffee Ripeness AI. Hak cipta dilindungi.</div>
          <div className="flex items-center gap-3">
            <span>YOLOv8 TFLite</span>
            <span>•</span>
            <span>ESP32 Dual-Node IoT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================= */
/*  SCROLL TO TOP BUTTON                         */
/* ============================================= */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-11 h-11 rounded-full bg-[#C0392B] text-white shadow-xl shadow-[#C0392B]/40 flex items-center justify-center hover:bg-[#a5281b] transition-all cursor-pointer"
    >
      <FaArrowUp className="text-sm" />
    </motion.button>
  );
}

/* ============================================= */
/*  APP ROOT                                     */
/* ============================================= */
export default function App() {
  return (
    <div className="bg-[#FCF9F3] text-[#1C1C18] overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <Hero />
      <Tujuan />
      <Fitur />
      <CaraKerja />
      <Kematangan />
      <Demo />
      <Unduh />
      <FAQ />
      <Kontak />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
