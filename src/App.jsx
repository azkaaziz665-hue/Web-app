import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import appScreenshot from "./assets/app-screenshot.png";
import { APP_CONFIG } from "./config";
import {
  FaSeedling, FaBars, FaTimes, FaDownload, FaPlay, FaWifi,
  FaBatteryFull, FaCamera, FaBolt, FaTags, FaVideo, FaCalculator,
  FaHistory, FaWifi as FaWifiSlash, FaBullseye, FaArrowUp,
  FaClock, FaChartPie, FaSatelliteDish, FaMicrochip,
  FaPollH, FaExclamationTriangle, FaCheckCircle, FaCheck,
  FaMobileAlt, FaChevronDown, FaExpand, FaRedo,
  FaEnvelope, FaGithub, FaAndroid, FaApple, FaPaperPlane,
  FaShieldAlt, FaChartLine, FaCog,
  FaBuilding, FaFileDownload,
} from "react-icons/fa";
import {
  FaXmark as FaX, FaBoltLightning, FaArrowTrendUp,
  FaClockRotateLeft, FaCameraRotate,
} from "react-icons/fa6";

/* ============================================= */
/*  ANIMATION VARIANTS                           */
/* ============================================= */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
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
/*  1. NAVBAR                                    */
/* ============================================= */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Beranda", href: "#beranda" },
    { label: "Tujuan", href: "#tujuan" },
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Kematangan", href: "#kematangan" },
    { label: "Demo", href: "#demo" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-[#032517]/95 backdrop-blur-md text-white border-b border-[#1B3B2B] transition-all duration-300 ${
        scrolled ? "shadow-xl" : "shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a className="flex items-center gap-2.5 sm:gap-3 group" href="#beranda">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#1B3B2B] to-[#032517] flex items-center justify-center shadow-md border border-[#83A590]/30 group-hover:scale-105 transition-transform overflow-hidden p-1.5">
              <img src="./ranum-kopi.svg" alt="Ranum Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FCF9F3] block leading-tight">
                Ranum
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#4CD6FB] font-semibold block">
                Coffee Ripeness AI
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#FCF9F3]/80">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[#4CD6FB] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#unduh"
              className="bg-[#C0392B] hover:bg-[#a5281b] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-[#C0392B]/30 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <FaDownload className="text-xs" /> Unduh Aplikasi
            </a>
          </div>

          <button
            aria-label="Toggle navigation"
            className="lg:hidden text-white text-xl sm:text-2xl focus:outline-none p-2 rounded-lg hover:bg-white/10"
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
        <div className="px-5 py-4 space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-[#FCF9F3] hover:text-[#4CD6FB] py-2 text-base font-medium border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#unduh"
            className="block bg-[#C0392B] text-center py-3 rounded-xl font-bold text-white mt-3 text-sm"
            onClick={() => setOpen(false)}
          >
            Unduh Aplikasi
          </a>
        </div>
      </motion.div>
    </header>
  );
}

/* ============================================= */
/*  2. HERO                                      */
/* ============================================= */
function Hero() {
  return (
    <section className="relative hero-pattern text-white py-12 sm:py-20 lg:py-28 overflow-hidden" id="beranda">
      {/* Background Ambience / Glows */}
      <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#1B3B2B]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#003A47]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Text Content */}
          <AnimatedSection className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B3B2B]/90 backdrop-blur-md border border-[#83A590]/30 text-[11px] sm:text-xs text-[#C7EBD4] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
              <span>Didukung Model Computer Vision YOLOv8</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-[#FCF9F3] tracking-tight">
              Panen Kopi di Waktu yang Tepat,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CD6FB] to-[#C7EBD4] block sm:inline">
                Dipandu AI Presisi
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#FCF9F3]/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Deteksi otomatis tingkat kematangan ceri kopi (mentah, setengah matang, matang, dan lewat
              matang) menggunakan kamera statis di kebun. Cegah panen asal petik dan maksimalkan harga
              jual biji kopi premium Anda.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="#unduh"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C0392B] hover:bg-[#a5281b] text-white font-semibold text-sm sm:text-base shadow-xl shadow-[#C0392B]/40 transition-all flex items-center justify-center gap-2.5 group"
              >
                <FaMobileAlt className="group-hover:scale-110 transition-transform" />
                <span>Unduh / Pasang PWA</span>
              </a>
              <a
                href="#demo"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-[#FCF9F3] font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2"
              >
                <FaPlay className="text-xs text-[#4CD6FB]" />
                <span>Coba Demo Online</span>
              </a>
            </div>
            {/* Stats */}
            <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-white/15 max-w-lg mx-auto lg:mx-0">
              <div className="px-1">
                <div className="text-xl sm:text-2xl font-bold font-serif text-white">Real-Time</div>
                <div className="text-[11px] sm:text-xs text-[#83A590] mt-0.5">Analisis Langsung</div>
              </div>
              <div className="px-1">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#10B981]">[XX%]</div>
                <div className="text-[11px] sm:text-xs text-[#83A590] mt-0.5">Akurasi Deteksi</div>
              </div>
              <div className="px-1">
                <div className="text-xl sm:text-2xl font-bold font-serif text-[#FFD1B5]">5 Kelas</div>
                <div className="text-[11px] sm:text-xs text-[#83A590] mt-0.5">Level Kematangan</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Phone Mockup (Responsive Mobile Frame) */}
          <AnimatedSection className="lg:col-span-5 flex justify-center w-full" variants={scaleIn}>
            <PhoneMockup />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[360px] h-[600px] xs:h-[650px] sm:h-[700px] rounded-[40px] sm:rounded-[48px] bg-[#032517] p-2.5 sm:p-3 shadow-2xl border-[3px] sm:border-[4px] border-[#1B3B2B] ring-1 ring-[#83A590]/40 transition-transform hover:scale-[1.01] duration-300 mx-auto">
      {/* Top Notch */}
      <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-5 bg-black rounded-full z-30 pointer-events-none" />

      {/* Frame Flutter Web Interaktif */}
      <div className="w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-[#FCF9F3] relative shadow-inner">
        <iframe
          src="./app-web/index.html"
          title="Ranum Live App"
          className="w-full h-full border-0"
        />
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-1 bg-white/40 rounded-full pointer-events-none z-30" />
    </div>
  );
}

/* ============================================= */
/*  3. TUJUAN (MASALAH & SOLUSI)                */
/* ============================================= */
function Tujuan() {
  const benefits = [
    { icon: <FaBullseye />, title: "Presisi Objektif", desc: "Model AI dilatih mengeliminasi keraguan warna buah pada kondisi pencahayaan alami kebun.", bg: "bg-[#C7EBD4]", color: "text-[#032517]" },
    { icon: <FaArrowTrendUp />, title: "Nilai Jual Maksimal", desc: "Meningkatkan rasio kopi petik merah untuk menembus standar Specialty Grade berharga tinggi.", bg: "bg-[#FFD1B5]", color: "text-[#795741]" },
    { icon: <FaClock />, title: "Efisiensi Tenaga Kerja", desc: "Jadwalkan buruh petik hanya saat pohon di blok tertentu memang telah siap panen serempak.", bg: "bg-[#B3EBFF]", color: "text-[#003A47]" },
    { icon: <FaChartPie />, title: "Arsip Digital Musim", desc: "Riwayat kematangan harian tersimpan sebagai bahan evaluasi agronomi dan riset musim tanam.", bg: "bg-[#E5E2DC]", color: "text-[#424843]" },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FCF9F3]" id="tujuan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C0392B] font-bold">
            Tujuan & Urgensi
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517] mt-2">
            Mengapa Deteksi Otomatis Penting bagi Petani Kopi?
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
            Kualitas secangkir kopi berkelas ditentukan sejak di pohon. Metode konvensional seringkali
            menemui kendala subjektivitas pemetik yang merugikan hasil panen.
          </p>
        </AnimatedSection>

        {/* Problem vs Solution */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          <AnimatedSection className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-l-8 border-[#C0392B] flex flex-col justify-between border border-[#E5E2DC]">
            <div>
              <div className="flex items-center gap-3 text-[#C0392B] font-bold text-base sm:text-lg mb-3">
                <FaExclamationTriangle className="text-xl sm:text-2xl shrink-0" />
                <h3>Masalah Metode Manual Tradisional</h3>
              </div>
              <ul className="space-y-3 text-[#424843] text-xs sm:text-sm leading-relaxed mt-4">
                {[
                  { title: "Subjektivitas Tinggi:", text: "Penentuan warna merah buah sering berbeda antar pemetik, menyebabkan tercampurnya ceri mentah (green defect)." },
                  { title: "Penurunan Skor Cupping:", text: "Ceri mentah dan lewat matang menurunkan nilai rasa specialty coffee secara drastis di pasar global." },
                  { title: "Pemborosan Biaya Tenaga Kerja:", text: "Panen sebelum saatnya menuntut proses sortasi manual yang lama dan mahal." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <FaX className="text-[#C0392B] mt-1 shrink-0 text-xs" />
                    <span><strong>{item.title}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 pt-4 border-t border-[#F0EEE8] text-xs text-[#C0392B] font-semibold">
              Dampak: Harga jual biji mentah (green bean) merosot hingga 20–30%.
            </div>
          </AnimatedSection>

          <AnimatedSection className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border-l-8 border-[#10B981] flex flex-col justify-between border border-[#E5E2DC]">
            <div>
              <div className="flex items-center gap-3 text-[#032517] font-bold text-base sm:text-lg mb-3">
                <FaCheckCircle className="text-xl sm:text-2xl text-[#10B981] shrink-0" />
                <h3>Solusi Cerdas Bersama Ranum</h3>
              </div>
              <ul className="space-y-3 text-[#424843] text-xs sm:text-sm leading-relaxed mt-4">
                {[
                  { title: "Standardisasi Berbasis Data:", text: "AI YOLOv8 menilai kematangan secara objektif tanpa bias kelelahan manusia." },
                  { title: "Pemantauan Kontinu Tanpa Masuk Kebun:", text: "Kamera statis mengamati kanopi tanaman secara periodik dari titik tetap." },
                  { title: "Keputusan Panen Tepat Waktu:", text: "Dapatkan notifikasi waktu petik optimum saat mayoritas buah mencapai kondisi red cherry." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-2.5">
                    <FaCheck className="text-[#10B981] mt-1 shrink-0 text-xs" />
                    <span><strong>{item.title}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 pt-4 border-t border-[#F0EEE8] text-xs text-[#032517] font-semibold">
              Dampak: Meningkatkan proporsi ceri merah prima hingga di atas 90%.
            </div>
          </AnimatedSection>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {benefits.map((b) => (
            <AnimatedSection
              key={b.title}
              className="glass-card p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${b.bg} ${b.color} flex items-center justify-center text-lg sm:text-xl mb-3 sm:mb-4`}>
                {b.icon}
              </div>
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#032517] mb-1.5">{b.title}</h4>
              <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">{b.desc}</p>
            </AnimatedSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  4. FITUR UTAMA                               */
/* ============================================= */
function Fitur() {
  const features = [
    { icon: <FaBoltLightning />, bg: "bg-[#032517]", title: "Deteksi Real-Time YOLOv8", desc: "Arsitektur deteksi objek generasi mutakhir yang mampu mengenali puluhan kelompok buah kopi secara simultan dalam satu tangkapan frame kamera." },
    { icon: <FaTags />, bg: "bg-[#C0392B]", title: "Klasifikasi Tingkat Kematangan", desc: "Kategori terstandar: Mentah (Hijau), Setengah Matang (Kuning/Oranye), Matang Penuh (Merah Ceri), dan Lewat Matang (Hitam/Kering)." },
    { icon: <FaVideo />, bg: "bg-[#795741]", title: "Integrasi Kamera Statis Kebun", desc: "Dukungan RTSP / HTTP snapshot dari modul kamera mikro (ESP32-CAM, Raspberry Pi, atau IP Cam bertenaga surya) yang terpasang tetap di tiang kebun." },
    { icon: <FaCalculator />, bg: "bg-[#E67E22]", title: "Kalkulasi Otomatis Jumlah Buah", desc: "Sistem menghitung persentase agregat buah matang vs mentah dan menampilkan rekomendasi siap panen secara otomatis." },
    { icon: <FaClockRotateLeft />, bg: "bg-[#003A47]", title: "Riwayat & Log Deteksi Harian", desc: "Catatan log berkala untuk memantau laju pematangan buah dari hari ke hari sehingga petani dapat menjadwalkan rotasi blok panen." },
    { icon: <FaWifi />, bg: "bg-[#1B3B2B]", title: "Dukungan PWA & Mode Offline", desc: "Dapat dipasang langsung ke layar beranda ponsel (Android / iOS) dan tetap menyajikan data cache lokal saat sinyal di pedalaman kebun minim." },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white" id="fitur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#10B981] font-bold">
            Kapabilitas Teknologi
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517] mt-2">
            Fitur Utama Sistem Pemantauan Ranum
          </h2>
          <div className="w-16 h-1 bg-[#C0392B] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-3 sm:mt-4 text-sm sm:text-base">
            Dirancang tangguh, ringan, dan mudah dioperasikan baik oleh kelompok tani di pelosok maupun
            peneliti agro-teknologi.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8"
        >
          {features.map((f) => (
            <AnimatedSection
              key={f.title}
              className="border border-[#E5E2DC] rounded-2xl p-5 sm:p-7 hover:border-[#10B981] transition-all hover:shadow-lg bg-[#FCF9F3] group"
            >
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${f.bg} text-white flex items-center justify-center text-lg sm:text-xl mb-4 sm:mb-5 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#032517] mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">{f.desc}</p>
            </AnimatedSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  5. CARA KERJA (4 Steps)                      */
/* ============================================= */
function CaraKerja() {
  const steps = [
    { num: "01", icon: <FaCamera />, iconBg: "bg-[#C7EBD4] text-[#032517]", title: "Pemasangan Kamera", desc: "Kamera dipasang statis di titik strategis blok kebun, menghadap ke dahan representatif dengan jarak dan sudut konstan." },
    { num: "02", icon: <FaSatelliteDish />, iconBg: "bg-[#FFD1B5] text-[#795741]", title: "Pengambilan Citra", desc: "Kamera menangkap frame foto berkala (misal: setiap jam 08.00 & 14.00) dan mengirimkannya ke modul pemrosesan aplikasi." },
    { num: "03", icon: <FaMicrochip />, iconBg: "bg-[#B3EBFF] text-[#003A47]", title: "Inferensi YOLOv8", desc: "Model AI melacak tiap buah dalam gambar, memberi bounding box, dan mengklasifikasikan tingkat kematangan dalam sekejap." },
    { num: "04", icon: <FaPollH />, iconBg: "bg-[#C7EBD4] text-[#10B981]", title: "Rekomendasi Panen", desc: "Hasil tampil di layar petani lengkap dengan grafik kematangan dan notifikasi kesiapan panen untuk tim pemetik." },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F6F3ED] border-y border-[#E5E2DC]" id="cara-kerja">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C0392B] font-bold">
            Alur Kerja Sistem
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517] mt-2">
            Bagaimana AI Menjaga Kualitas Panen Anda?
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {steps.map((s, i) => (
            <AnimatedSection key={s.num} className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#E5E2DC] relative">
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${i === 3 ? "bg-[#C0392B]" : "bg-[#032517]"} text-white font-bold flex items-center justify-center mb-3 sm:mb-4 text-xs sm:text-sm`}>
                {s.num}
              </div>
              <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${s.iconBg} flex items-center justify-center text-base sm:text-lg mb-2.5 sm:mb-3`}>
                {s.icon}
              </div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-[#032517] mb-1.5">{s.title}</h3>
              <p className="text-xs text-[#424843] leading-relaxed">{s.desc}</p>
            </AnimatedSection>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  6. PANDUAN PENGGUNAAN                        */
/* ============================================= */
function Panduan() {
  const steps = [
    { title: "Buka Aplikasi & Hubungkan Perangkat", desc: "Buka aplikasi Ranum, masuk ke menu Pengaturan Kamera, masukkan IP atau URL stream kamera kebun Anda." },
    { title: "Lakukan Kalibrasi Titik Bidik", desc: "Pastikan kluster buah kopi berada di area tengah fokus lensa tanpa terhalang daun lebat." },
    { title: "Mulai Monitoring & Dapatkan Laporan", desc: "Tekan tombol Mulai Deteksi. Laporan persentase ceri matang akan diperbarui secara kontinu." },
  ];

  const tips = [
    { icon: "☀️", title: "Waktu Ideal Pemotretan", desc: "Ambil citra pada pagi hari (08.00–10.00) saat sinar matahari merata dan bayangan minimal." },
    { icon: "📐", title: "Jarak Optimal Kamera", desc: "Posisikan kamera 50–80 cm dari kluster buah agar objek terdeteksi jelas." },
    { icon: "🧹", title: "Bersihkan Lensa", desc: "Lap lensa kamera secara berkala dari embun, debu, dan getah tanaman yang menghalangi akurasi." },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <AnimatedSection className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#10B981] font-bold">
              Panduan Pengguna
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517]">
              Langkah Cepat Memulai Penggunaan Aplikasi
            </h2>
            <p className="text-[#424843] text-xs sm:text-sm leading-relaxed">
              Ikuti 3 tahapan ringkas berikut untuk menghubungkan modul deteksi kebun Anda ke aplikasi Ranum.
            </p>
            <div className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[#FCF9F3] border border-[#E5E2DC]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#032517] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#032517] text-xs sm:text-sm">{s.title}</h4>
                    <p className="text-[11px] sm:text-xs text-[#424843] mt-0.5 sm:mt-1">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="lg:col-span-6">
            <div className="bg-[#F0EEE8] border border-[#E5E2DC] rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-5">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#032517] flex items-center gap-2">
                <FaCamera className="text-[#10B981]" /> Tips Kamera & Hasil Optimal
              </h3>
              {tips.map((t) => (
                <div key={t.title} className="flex gap-3 p-3.5 sm:p-4 bg-white rounded-xl border border-[#E5E2DC]">
                  <span className="text-xl sm:text-2xl shrink-0">{t.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#032517]">{t.title}</h4>
                    <p className="text-[11px] sm:text-xs text-[#424843] mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  7. KLASIFIKASI KEMATANGAN                    */
/* ============================================= */
function Kematangan() {
  const classes = [
    {
      label: "Kelas 0",
      color: "from-[#27AE60] to-[#1E824C]",
      dotColor: "text-[#27AE60]",
      subtitle: "Klorofil Dominan",
      title: "Mentah (Unripe)",
      desc: "Ceri berwarna hijau penuh, tekstur keras, kandungan gula belum terbentuk sempurna.",
      action: "Biarkan di pohon dan pantau secara berkala hingga perubahan warna terjadi.",
      actionBg: "bg-[#27AE60]/10 text-[#1E824C] border-[#27AE60]/30",
    },
    {
      label: "Kelas 1",
      color: "from-[#E67E22] to-[#D35400]",
      dotColor: "text-[#E67E22]",
      subtitle: "Transisi Warna",
      title: "Setengah Matang (Semi-ripe)",
      desc: "Mulai berubah kuning-oranye, kadar asam masih tinggi, rasa belum optimal.",
      action: "Pantau ketat 3–5 hari lagi. Belum ideal untuk dipetik kecuali produksi biji robusta mass-market.",
      actionBg: "bg-[#E67E22]/10 text-[#D35400] border-[#E67E22]/30",
    },
    {
      label: "Kelas 2",
      color: "from-[#C0392B] to-[#96281B]",
      dotColor: "text-[#C0392B]",
      subtitle: "Puncak Rasa",
      title: "Matang (Ripe)",
      desc: "Merah ceri sempurna dengan kadar gula dan asam seimbang — puncak kualitas cupping.",
      action: "SEGERA PETIK. Inilah jendela panen terbaik untuk mendapatkan skor specialty tertinggi.",
      actionBg: "bg-[#C0392B]/10 text-[#C0392B] border-[#C0392B]/30",
      highlight: true,
    },
    {
      label: "Kelas 3",
      color: "from-[#880E4F] to-[#4A148C]",
      dotColor: "text-[#880E4F]",
      subtitle: "Fermentasi Berlebih",
      title: "Lewat Matang (Overripe)",
      desc: "Warna merah kehitaman atau keriput kecokelatan, rentan pembusukan jamur.",
      action: "Petik dan pisahkan segera agar tidak merusak aroma ceri lainnya.",
      actionBg: "bg-[#880E4F]/10 text-[#880E4F] border-[#880E4F]/30",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FCF9F3] border-t border-[#E5E2DC]" id="kematangan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C0392B] font-bold">
            Referensi Visual
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517] mt-2">
            4 Tingkat Kematangan Ceri Kopi
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed">
            Setiap ceri diklasifikasikan ke dalam salah satu tingkat berikut oleh model YOLOv8, lengkap
            dengan rekomendasi tindakan untuk petani.
          </p>
        </AnimatedSection>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {classes.map((c) => (
            <AnimatedSection
              key={c.label}
              className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border ${
                c.highlight ? "border-[#C0392B] ring-2 ring-[#C0392B]/30" : "border-[#E5E2DC]"
              }`}
            >
              <div className={`h-28 sm:h-36 bg-gradient-to-br ${c.color} flex items-center justify-center text-white relative p-4`}>
                <span className="absolute top-3 right-3 bg-white/20 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {c.label}
                </span>
                {c.highlight && (
                  <span className="absolute top-3 left-3 bg-white text-[#C0392B] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow">
                    Target Panen
                  </span>
                )}
                <div className="text-center">
                  <span className="text-3xl sm:text-4xl text-white drop-shadow">●</span>
                  <div className="text-[11px] sm:text-xs font-semibold mt-1.5 opacity-90">{c.subtitle}</div>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h4 className="font-serif font-bold text-lg sm:text-xl text-[#032517]">{c.title}</h4>
                <p className="text-xs text-[#424843] mt-1 mb-3 sm:mb-4 leading-relaxed">{c.desc}</p>
                <div className={`p-2.5 sm:p-3 rounded-xl text-[10px] sm:text-[11px] font-medium border ${c.actionBg}`}>
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
/*  8. DEMO APLIKASI (LIVE FLUTTER WEB APP)      */
/* ============================================= */
function Demo() {
  return (
    <section className="py-14 sm:py-20 bg-white" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#10B981] font-bold">Simulasi Nyata</span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517] mt-2">
            Demo Antarmuka Langsung Aplikasi Ranum
          </h2>
          <div className="w-16 h-1 bg-[#C0392B] mx-auto mt-4 rounded-full" />
          <p className="text-[#424843] mt-3 sm:mt-4 text-xs sm:text-base max-w-2xl mx-auto">
            Jalankan dan uji coba antarmuka asli aplikasi Flutter secara langsung di dalam peramban Anda melalui Flutter Web interaktif.
          </p>
        </AnimatedSection>

        <AnimatedSection className="flex flex-col items-center w-full" variants={scaleIn}>
          {/* Live Interactive Flutter Web Frame */}
          <div className="relative w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[380px] h-[620px] xs:h-[660px] sm:h-[720px] rounded-[40px] sm:rounded-[48px] bg-[#032517] p-2.5 sm:p-3 shadow-2xl border-[3px] sm:border-[4px] border-[#1B3B2B] ring-1 ring-[#83A590]/40 transition-transform hover:scale-[1.01] duration-300 mx-auto">
            {/* Dynamic Island / Top Notch */}
            <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4 sm:h-5 bg-black rounded-full z-30 pointer-events-none" />

            {/* Iframe Flutter Web App */}
            <div className="w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-[#FCF9F3] relative shadow-inner">
              <iframe
                src="./app-web/index.html"
                title="Aplikasi Asli Flutter Ranum Coffee Ripeness"
                className="w-full h-full border-0"
              />
            </div>

            {/* Bottom Home Indicator */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-1 bg-white/40 rounded-full pointer-events-none z-30" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================= */
/*  9. UNDUH                                     */
/* ============================================= */
function Unduh() {
  return (
    <section
      className="py-16 sm:py-24 bg-gradient-to-b from-[#032517] via-[#00232C] to-[#00181F] text-white relative overflow-hidden"
      id="unduh"
    >
      <div className="absolute -bottom-24 -left-24 w-72 sm:w-80 h-72 sm:h-80 bg-[#1B3B2B]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 sm:w-80 h-72 sm:h-80 bg-[#003A47]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B3B2B] border border-[#83A590]/40 text-[#4CD6FB] text-xs font-bold uppercase tracking-wider">
            <FaDownload /> Instalasi & Unduhan
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#FCF9F3] mt-3">
            Pasang Aplikasi Ranum Sekarang
          </h2>
          <p className="text-[#FCF9F3]/80 mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed">
            Gunakan sebagai aplikasi web progresif (PWA) instan tanpa perlu ke Play Store, atau unduh paket file APK mandiri.
          </p>
        </AnimatedSection>

        <AnimatedSection className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 sm:p-8 lg:p-12 shadow-2xl" variants={scaleIn}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/15">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#1B3B2B] to-[#032517] flex items-center justify-center shadow-xl border border-[#83A590]/30 shrink-0 overflow-hidden p-2">
                <img src="./ranum-kopi.svg" alt="Ranum Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white">Ranum Mobile App</h3>
                <p className="text-xs text-[#C7EBD4]/70 mt-1">Sistem Deteksi Kematangan Kopi YOLOv8</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-2 text-[11px] sm:text-xs text-[#FCF9F3]/80">
                  <span className="bg-white/15 px-2.5 py-0.5 rounded-full">Versi: {APP_CONFIG.version}</span>
                  <span className="bg-white/15 px-2.5 py-0.5 rounded-full">Ukuran: {APP_CONFIG.apkSize}</span>
                  <span className="text-[#10B981] font-medium flex items-center gap-1">
                    <FaShieldAlt /> Bebas Iklan
                  </span>
                </div>
              </div>
            </div>
            <a
              href={APP_CONFIG.apkDownloadUrl}
              download="ranum.apk"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-[#C0392B] hover:bg-[#a5281b] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#C0392B]/40 hover:shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <FaDownload className="text-base sm:text-lg" />
              <span>Unduh Aplikasi Sekarang</span>
            </a>
          </div>

          <div className="pt-6 sm:pt-8 grid md:grid-cols-2 gap-5 sm:gap-8">
            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base mb-2">
                  <FaAndroid className="text-[#10B981] text-lg sm:text-xl" />
                  <h4>Unduh Paket APK Android</h4>
                </div>
                <p className="text-xs text-[#FCF9F3]/70 leading-relaxed mb-4">
                  Pasang file APK instalasi mandiri untuk perangkat Android di lapangan tanpa ketergantungan koneksi Google Play Store.
                </p>
              </div>
              <a
                href={APP_CONFIG.apkDownloadUrl}
                download="ranum.apk"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 transition-all hover:scale-[1.02] w-full sm:w-auto"
              >
                <FaFileDownload /> Unduh File APK (.apk)
              </a>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base mb-2">
                <FaApple className="text-lg sm:text-xl" />
                <h4>Pengguna iPhone / iPad (iOS Safari)</h4>
              </div>
              <p className="text-xs text-[#FCF9F3]/70 leading-relaxed mb-3">
                Buka landing page ini di peramban <strong>Safari</strong>, lalu ikuti langkah mudah berikut:
              </p>
              <div className="space-y-1.5 text-xs text-[#FCF9F3]/90 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] shrink-0">1</span>
                  <span>Tekan tombol <strong>Bagikan (Share)</strong> di Safari</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] shrink-0">2</span>
                  <span>Pilih menu <strong>"Tambahkan ke Layar Utama"</strong></span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================= */
/*  10. FAQ                                      */
/* ============================================= */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: "Apakah aplikasi ini membutuhkan koneksi internet konstan di kebun?", a: "Tidak harus. Model inferensi YOLOv8 dapat dijalankan di edge node lokal (misalnya Raspberry Pi atau laptop pos kebun via WiFi lokal / hotspot mini). Saat ada sinyal, data agregat baru disinkronkan ke server pusat." },
    { q: "Jenis perangkat kamera apa saja yang didukung?", a: "Sistem mendukung kamera dengan output protokol standar IP RTSP, HTTP snapshot, webcam USB, maupun modul IoT berdaya rendah seperti ESP32-CAM dengan resolusi minimum 720p (disarankan 1080p)." },
    { q: "Seberapa tinggi akurasi deteksi model YOLOv8 pada kondisi cahaya mendung atau silau?", a: "Dataset pelatihan model telah diaugmentasi dengan berbagai variasi intensitas cahaya matahari, bayangan dedaunan, dan kondisi basah setelah hujan. Akurasi mAP mencapai kisaran tinggi pada dataset pengujian lapang kami." },
    { q: "Bagaimana cara menguji aplikasi jika saya belum memasang kamera di kebun?", a: 'Di dalam aplikasi tersedia opsi "Mode Simulasi / Upload Gambar". Anda dapat mengunggah foto dahan kopi dari galeri HP Anda untuk mencoba deteksi YOLOv8 secara langsung.' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FCF9F3]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C0392B] font-bold">
            Pertanyaan Populer
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#032517] mt-2">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#10B981] mx-auto mt-4 rounded-full" />
        </AnimatedSection>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} className="bg-white rounded-2xl shadow-sm border border-[#E5E2DC] overflow-hidden">
              <button
                className="w-full px-5 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between font-bold text-[#032517] text-sm sm:text-base hover:text-[#C0392B] transition-colors gap-3"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span>{faq.q}</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 shrink-0 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={openIdx === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-[#424843] leading-relaxed border-t border-gray-50 pt-2">{faq.a}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================= */
/*  11. TENTANG & KONTAK                         */
/* ============================================= */
function Kontak() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-[#E5E2DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-gradient-to-r from-[#FCF9F3] to-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E5E2DC] shadow-sm">
          <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-center">
            <div className="md:col-span-8 space-y-3 sm:space-y-4 text-center md:text-left">
              <span className="text-xs uppercase tracking-widest text-[#10B981] font-bold">
                Kolaborasi & Penelitian
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#032517]">
                Tentang Tim Pengembang Ranum
              </h2>
              <p className="text-xs sm:text-sm text-[#424843] leading-relaxed">
                Inisiatif ini dikembangkan oleh <strong>Tim Riset Smart Farming Ranum</strong>,
                menggabungkan kepakaran ilmu pertanian presisi dan teknik kecerdasan buatan untuk
                memberdayakan kelompok tani kopi nusantara.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-xs font-semibold text-[#424843] pt-1">
                <span className="flex items-center gap-1.5">
                  <FaBuilding className="text-[#C0392B]" /> Laboratorium Smart Agro
                </span>
                <span className="flex items-center gap-1.5">
                  <FaEnvelope className="text-[#10B981]" /> kontak@ranum-kopi.id
                </span>
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col gap-2.5 sm:gap-3 w-full">
              <a
                href="mailto:kontak@ranum-kopi.id"
                className="px-5 py-3 rounded-xl bg-[#032517] hover:bg-[#1B3B2B] text-white text-center text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaPaperPlane /> Hubungi Tim Pengembang
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-gray-50 border border-[#E5E2DC] text-[#032517] text-center text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <FaGithub className="text-sm" /> Repositori & Riset
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ============================================= */
/*  12. FOOTER                                   */
/* ============================================= */
function Footer() {
  return (
    <footer className="bg-[#00181F] text-white pt-12 sm:pt-16 pb-10 border-t border-[#00232C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          <div className="space-y-3 sm:space-y-4 sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1B3B2B] border border-[#83A590]/40 flex items-center justify-center overflow-hidden p-1.5">
                <img src="./ranum-kopi.svg" alt="Ranum Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">Ranum</span>
            </div>
            <p className="text-xs text-[#FCF9F3]/70 max-w-md leading-relaxed">
              Sistem Cerdas Deteksi Tingkat Kematangan Buah Kopi Otomatis Berbasis YOLOv8 & Kamera Statis.
              Mendukung kemajuan perkebunan kopi presisi Indonesia.
            </p>
            <div className="text-[11px] text-[#FCF9F3]/50">
              Terima kasih kepada para petani mitra dan pegiat kopi nusantara.
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white mb-3 sm:mb-4 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-xs text-[#FCF9F3]/75">
              {["Beranda", "Tujuan", "Fitur", "Cara Kerja", "Kematangan"].map(
                (l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/ /g, "-")}`} className="hover:text-[#4CD6FB] transition-colors">
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-white mb-3 sm:mb-4 uppercase tracking-wider">Aplikasi</h4>
            <ul className="space-y-2 text-xs text-[#FCF9F3]/75">
              <li><a href="#unduh" className="hover:text-[#4CD6FB] transition-colors">Instal PWA</a></li>
              <li><a href="#unduh" className="hover:text-[#4CD6FB] transition-colors">Unduh APK Android</a></li>
              <li><a href="#demo" className="hover:text-[#4CD6FB] transition-colors">Coba Demo Interaktif</a></li>
              <li><a href="#faq" className="hover:text-[#4CD6FB] transition-colors">Bantuan & FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-[#FCF9F3]/50 gap-3 sm:gap-4 text-center sm:text-left">
          <div>© {new Date().getFullYear()} Ranum Coffee Ripeness AI. Hak cipta dilindungi.</div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-[#4CD6FB] transition-colors">Kebijakan Privasi</a>
            <span>•</span>
            <a href="#" className="hover:text-[#4CD6FB] transition-colors">Ketentuan Layanan</a>
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
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C0392B] text-white shadow-xl shadow-[#C0392B]/40 flex items-center justify-center hover:bg-[#a5281b] transition-all"
    >
      <FaArrowUp className="text-sm sm:text-base" />
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
      <Panduan />
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
