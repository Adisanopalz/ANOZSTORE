import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, Check, Smartphone, CreditCard, ChevronLeft, Star, User, Zap, ShieldCheck, Moon, Sun, Crown, ChevronRight, Bell, Filter, Clock, MessageCircle, HelpCircle, ChevronDown, Trophy, Users, Activity, Quote } from 'lucide-react';

// --- HELPER COMPONENT: ANIMATED COUNTER ---
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const endValue = parseFloat(String(end).replace(/,/g, ''));

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentVal = Math.floor(easeProgress * endValue);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const AnozStore = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('home'); 
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default Dark Mode
  const [isHovering, setIsHovering] = useState(false);
  
  // NEW STATES
  const [currentBanner, setCurrentBanner] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeLeft, setTimeLeft] = useState(Math.floor(Math.random() * (18000 - 7200 + 1) + 7200)); 
  const [liveNotif, setLiveNotif] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- CUSTOM CURSOR LOGIC ---
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      if (cursor && cursorDot) {
        cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);

    const clickables = document.querySelectorAll('button, a, input, .cursor-pointer, .group');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [activeTab, selectedGame, isMenuOpen, selectedCategory]); 

  // --- FLASH SALE TIMER (LOOP & RANDOM) ---
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          return Math.floor(Math.random() * (18000 - 7200 + 1) + 7200);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  // --- LIVE NOTIFICATION SYSTEM (FAKE) ---
  const fakePurchases = [
    { name: 'Rian', item: '86 Diamonds', game: 'Mobile Legends' },
    { name: 'Dimas', item: 'Weekly Pass', game: 'Mobile Legends' },
    { name: 'Sarah', item: '60 UC', game: 'PUBG Mobile' },
    { name: 'Kevin', item: 'Welkin Moon', game: 'Genshin Impact' },
    { name: 'Budi', item: '140 Diamonds', game: 'Free Fire' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
       const randomData = fakePurchases[Math.floor(Math.random() * fakePurchases.length)];
       setLiveNotif(randomData);
       setTimeout(() => setLiveNotif(null), 3000); 
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // --- BANNER SLIDER LOGIC ---
  const banners = [
    {
      id: 1,
      title: "PROMO GAJIAN",
      subtitle: "Diskon up to 50% untuk semua game!",
      color: "from-red-600 to-rose-900",
      icon: <Zap size={40} className="text-yellow-400 fill-yellow-400 animate-pulse" />
    },
    {
      id: 2,
      title: "NEW ARRIVAL",
      subtitle: "Top Up Honor of Kings sekarang tersedia.",
      color: "from-indigo-600 to-blue-900",
      icon: <Star size={40} className="text-cyan-400 fill-cyan-400 animate-spin-slow" />
    },
    {
      id: 3,
      title: "EVENT SPESIAL",
      subtitle: "Bonus Diamond setiap pembelian via QRIS.",
      color: "from-emerald-600 to-teal-900",
      icon: <Crown size={40} className="text-amber-400 fill-amber-400" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Mock Data: Games
  const games = [
    { id: 1, category: 'game', name: 'Mobile Legends', publisher: 'Moonton', imgUrl: 'https://i.pinimg.com/1200x/d6/23/8e/d6238e6d724fddec242eaf389b67815a.jpg', image: 'bg-gradient-to-br from-indigo-900 to-purple-900', icon: 'M', items: [{ id: 'ml1', name: '86 Diamonds', price: 20000 }] },
    { id: 2, category: 'game', name: 'Free Fire', publisher: 'Garena', imgUrl: 'https://i.pinimg.com/736x/f2/3c/95/f23c95ed4421952cac128d0560ea1b73.jpg', image: 'bg-gradient-to-br from-orange-800 to-red-900', icon: 'F', items: [{ id: 'ff1', name: '70 Diamonds', price: 10000 }] },
    { id: 3, category: 'game', name: 'PUBG Mobile', publisher: 'Tencent', imgUrl: 'https://i.pinimg.com/1200x/5e/68/e4/5e68e4a0cbe4a056aca1c33c5c6dcbbc.jpg', image: 'bg-gradient-to-br from-yellow-800 to-amber-900', icon: 'P', items: [{ id: 'pm1', name: '60 UC', price: 14000 }] },
    { id: 4, category: 'game', name: 'Genshin Impact', publisher: 'HoYoverse', image: 'bg-gradient-to-br from-purple-800 to-pink-900', icon: 'G', items: [{ id: 'gi1', name: '60 Genesis Crystals', price: 16000 }] },
    { id: 5, category: 'game', name: 'Valorant', publisher: 'Riot Games', image: 'bg-gradient-to-br from-red-800 to-rose-950', icon: 'V', items: [{ id: 'vl1', name: '125 Points', price: 15000 }] },
    { id: 6, category: 'game', name: 'Honor of Kings', publisher: 'Level Infinite', image: 'bg-gradient-to-br from-amber-700 to-orange-900', icon: 'H', items: [{ id: 'hok1', name: '80 Tokens', price: 12000 }] },
    { id: 7, category: 'game', name: 'Honkai: Star Rail', publisher: 'HoYoverse', image: 'bg-gradient-to-br from-blue-800 to-indigo-950', icon: 'S', items: [{ id: 'hsr1', name: '60 Oneiric Shards', price: 16000 }] },
    { id: 8, category: 'game', name: 'Call of Duty: Mobile', publisher: 'Activision', image: 'bg-gradient-to-br from-gray-800 to-slate-900', icon: 'C', items: [{ id: 'codm1', name: '31 CP', price: 5000 }] },
    { id: 9, category: 'game', name: 'League of Legends: WR', publisher: 'Riot Games', image: 'bg-gradient-to-br from-cyan-700 to-blue-900', icon: 'L', items: [{ id: 'wr1', name: '420 Wild Cores', price: 50000 }] },
    { id: 10, category: 'game', name: 'Roblox', publisher: 'Roblox Corp', image: 'bg-gradient-to-br from-slate-700 to-gray-900', icon: 'R', items: [{ id: 'rb1', name: '80 Robux', price: 15000 }] },
    { id: 11, category: 'voucher', name: 'Steam Wallet', publisher: 'Valve', image: 'bg-gradient-to-br from-blue-900 to-slate-900', icon: 'SW', items: [{ id: 'sw1', name: 'IDR 12.000', price: 15000 }] },
    { id: 12, category: 'voucher', name: 'Google Play', publisher: 'Google', image: 'bg-gradient-to-br from-green-600 to-emerald-800', icon: 'GP', items: [{ id: 'gp1', name: 'Voucher 20.000', price: 22000 }] },
    { id: 13, category: 'game', name: 'FC Mobile (FIFA)', publisher: 'EA Sports', image: 'bg-gradient-to-br from-teal-700 to-emerald-900', icon: 'FC', items: [{ id: 'fc1', name: 'Silver Point', price: 15000 }] },
    { id: 14, category: 'game', name: 'eFootball 2024', publisher: 'Konami', image: 'bg-gradient-to-br from-blue-700 to-indigo-800', icon: 'E', items: [{ id: 'ef1', name: '130 Coins', price: 16000 }] },
    { id: 15, category: 'game', name: 'Clash of Clans', publisher: 'Supercell', image: 'bg-gradient-to-br from-yellow-600 to-orange-700', icon: 'CC', items: [{ id: 'coc1', name: '80 Gems', price: 15000 }] },
    { id: 16, category: 'app', name: 'Bigo Live', publisher: 'Bigo Tech', image: 'bg-gradient-to-br from-cyan-400 to-blue-500', icon: 'B', items: [{ id: 'bigo1', name: '40 Diamonds', price: 15000 }] },
    { id: 17, category: 'app', name: 'TikTok Live', publisher: 'ByteDance', image: 'bg-gradient-to-br from-slate-900 to-black', icon: 'TK', items: [{ id: 'tt1', name: '70 Coins', price: 12000 }] },
    { id: 18, category: 'app', name: 'Spotify Premium', publisher: 'Spotify', image: 'bg-gradient-to-br from-green-500 to-green-800', icon: 'SP', items: [{ id: 'sp1', name: 'Premium 1 Bulan', price: 55000 }] },
    { id: 19, category: 'app', name: 'Vidio', publisher: 'Emtek', image: 'bg-gradient-to-br from-pink-600 to-red-600', icon: 'VD', items: [{ id: 'vd1', name: 'Platinum 30 Hari', price: 39000 }] },
    { id: 20, category: 'game', name: 'Ragnarok Origin', publisher: 'Gravity', image: 'bg-gradient-to-br from-orange-300 to-amber-600', icon: 'RO', items: [{ id: 'ro1', name: 'Nyan Berry', price: 15000 }] },
    { id: 26, category: 'voucher', name: 'Growtopia', publisher: 'Ubisoft', image: 'bg-gradient-to-br from-green-400 to-yellow-400', icon: 'GT', items: [{ id: 'gt1', name: 'World Lock', price: 5000 }] },
  ];

  // Mock Data: Payment Methods
  const payments = [
    { id: 'qris', name: 'QRIS (All Payment)', fee: 0, icon: 'qr' },
    { id: 'dana', name: 'DANA', fee: 0, icon: 'wallet' },
    { id: 'gopay', name: 'GoPay', fee: 1000, icon: 'wallet' },
    { id: 'ovo', name: 'OVO', fee: 1000, icon: 'wallet' },
    { id: 'va', name: 'Virtual Account (BCA/Mandiri)', fee: 2500, icon: 'bank' },
  ];

  // FAQs
  const faqs = [
    { id: 1, q: "Apakah layanan ini buka 24 jam?", a: "Ya, sistem kami beroperasi otomatis 24 jam non-stop. Pesanan akan langsung diproses detik itu juga." },
    { id: 2, q: "Berapa lama proses masuknya?", a: "Estimasi proses 1-5 detik untuk Normal, dan maksimal 10 menit jika server game sedang padat." },
    { id: 3, q: "Apa yang harus dilakukan jika gagal?", a: "Jika status gagal, dana akan otomatis dikembalikan ke saldo akun atau hubungi CS kami dengan menyertakan Invoice." },
    { id: 4, q: "Metode pembayaran apa saja?", a: "Kami mendukung QRIS, E-Wallet (Dana, Ovo, ShopeePay), Transfer Bank, dan Virtual Account." }
  ];

  // TESTIMONIALS DATA
  const testimonials = [
    { id: 1, name: "Sultan Andara", role: "Mobile Legends Player", quote: "Gila sih, top up jam 3 pagi masuknya itungan detik. Recommended banget buat push rank!", rating: 5 },
    { id: 2, name: "Pro Player FF", role: "Free Fire User", quote: "Harga termurah se-Indonesia, adminnya juga fast respon parah. Langganan terus di sini.", rating: 5 },
    { id: 3, name: "Wibu Elite", role: "Genshin Impact", quote: "Buat gacha Aman banget, legal 100%. Nggak takut minus. Mantap AnozStore!", rating: 5 },
  ];

  // STATS DATA
  const stats = [
    { id: 1, label: "Transaksi Sukses", value: 99.9, suffix: "%", icon: <Check size={24} /> },
    { id: 2, label: "Total Transaksi", value: 50000, suffix: "+", icon: <Activity size={24} /> },
    { id: 3, label: "Pelanggan Puas", value: 10000, suffix: "+", icon: <Users size={24} /> },
    { id: 4, label: "Layanan Aktif", value: 24, suffix: "/7", icon: <Clock size={24} /> },
  ];

  // Helper: Format Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Logic: Handle WhatsApp Checkout
  const handleCheckout = () => {
    if (!userId || !selectedItem || !selectedPayment) {
      showNotification('Mohon lengkapi data pesanan!', 'error');
      return;
    }

    const total = selectedItem.price + selectedPayment.fee;
    const adminNumber = '6281234567890'; 
    
    let message = `Halo Admin AnozStore! 👋\n\n`;
    message += `Saya ingin order top-up PREMIUM:\n`;
    message += `🎮 Game: *${selectedGame.name}*\n`;
    message += `🆔 User ID: *${userId}* ${serverId ? `(${serverId})` : ''}\n`;
    message += `💎 Item: *${selectedItem.name}*\n`;
    message += `💳 Pembayaran: *${selectedPayment.name}*\n`;
    message += `💰 Total: *${formatRupiah(total)}*\n\n`;
    message += `Mohon diproses ya min! Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    window.open(waLink, '_blank');
    showNotification('Mengarahkan ke WhatsApp...', 'success');
  };

  const showNotification = (msg, type) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBack = () => {
    setSelectedGame(null);
    setUserId('');
    setServerId('');
    setSelectedItem(null);
    setSelectedPayment(null);
    window.scrollTo(0, 0);
  };

  // --- THEME STYLING CONFIG ---
  const theme = isDarkMode ? {
    bg: "bg-[#050505]", 
    text: "text-slate-100",
    textMuted: "text-slate-400",
    card: "bg-[#111111]/80 border-white/5", 
    nav: "bg-[#050505]/80 border-white/5",
    accent: "text-red-500",
    accentBg: "bg-red-600",
    accentHover: "hover:bg-red-700",
    border: "border-red-900/30",
    input: "bg-[#0a0a0a] border-white/10 focus:border-red-500 text-white",
    cardHover: "hover:border-red-500/50 hover:shadow-red-900/20",
    priceText: "text-amber-400", 
    gradientHero: "from-red-900 to-black",
    cursorFill: "#ef4444",
  } : {
    bg: "bg-rose-50/50", 
    text: "text-slate-900",
    textMuted: "text-slate-500",
    card: "bg-white/80 border-red-100 shadow-sm", 
    nav: "bg-white/80 border-red-100",
    accent: "text-red-600",
    accentBg: "bg-red-600",
    accentHover: "hover:bg-red-700",
    border: "border-red-200",
    input: "bg-white border-red-100 focus:border-red-500 text-slate-900",
    cardHover: "hover:border-red-400 hover:shadow-lg hover:shadow-red-100",
    priceText: "text-red-700", 
    gradientHero: "from-red-600 to-rose-400",
    cursorFill: "#dc2626", 
  };

  // Category Tabs List
  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'game', label: 'Games' },
    { id: 'voucher', label: 'Voucher' },
    { id: 'app', label: 'Entertainment' },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-red-500 selection:text-white pb-20 md:pb-0 transition-colors duration-500 ${theme.bg} ${theme.text} relative overflow-x-hidden app-container`}>
      
      {/* FORCE HIDE SYSTEM CURSOR & CUSTOM ANIMATIONS */}
      <style>{`
        .app-container, .app-container * {
          cursor: none !important;
        }
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${isDarkMode ? '#111' : '#f1f1f1'}; }
        ::-webkit-scrollbar-thumb { background: ${isDarkMode ? '#333' : '#ccc'}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${isDarkMode ? '#ef4444' : '#dc2626'}; }

        /* KEYFRAMES FOR ANIMATIONS */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; opacity: 0; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-scroll { animation: scroll 20s linear infinite; }
        .animate-scroll-fast { animation: scroll 15s linear infinite; }
        
        .animate-shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* --- RUNNING TEXT INFO BAR --- */}
      <div className={`w-full py-2 overflow-hidden z-50 relative ${isDarkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-600 text-white'}`}>
        <div className="flex animate-scroll whitespace-nowrap gap-10">
           <div className="flex items-center gap-10 text-xs font-bold tracking-widest uppercase">
             <span>⚡ Welcome to Official AnozStore!</span>
             <span>🛡️ Layanan Top Up 24 Jam Aman & Terpercaya</span>
             <span>⚠️ Hati-hati penipuan mengatasnamakan admin!</span>
             <span>🔥 Promo Gajian Sedang Berlangsung!</span>
             <span>🎮 Diskon 50% Mobile Legends & Valorant!</span>
           </div>
           {/* Duplicate for seamless scrolling */}
           <div className="flex items-center gap-10 text-xs font-bold tracking-widest uppercase">
             <span>⚡ Welcome to Official AnozStore!</span>
             <span>🛡️ Layanan Top Up 24 Jam Aman & Terpercaya</span>
             <span>⚠️ Hati-hati penipuan mengatasnamakan admin!</span>
             <span>🔥 Promo Gajian Sedang Berlangsung!</span>
             <span>🎮 Diskon 50% Mobile Legends & Valorant!</span>
           </div>
        </div>
      </div>

      {/* --- LIVE PURCHASE NOTIFICATION (FAKE GIMMICK) --- */}
      {liveNotif && (
        <div className={`fixed bottom-24 left-6 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-center gap-4 animate-fade-in-up max-w-sm ${theme.card}`}>
           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm shadow-lg animate-pulse-slow">
             {liveNotif.name.charAt(0)}
           </div>
           <div>
              <p className={`text-xs ${theme.textMuted}`}>Baru saja membeli:</p>
              <p className={`font-bold text-sm ${theme.text}`}>
                 <span className="text-green-500">{liveNotif.item}</span> - {liveNotif.game}
              </p>
              <p className="text-[10px] text-slate-500">Baru saja</p>
           </div>
        </div>
      )}

      {/* --- FLOATING CHAT BUTTON --- */}
      <a 
        href="https://wa.me/6281234567890" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300 animate-float"
        aria-label="Chat CS"
      >
        <MessageCircle size={28} fill="currentColor" />
        {/* Notif badge on chat */}
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </a>

      {/* --- NOISE EFFECT OVERLAY --- */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      ></div>

      {/* --- CUSTOM CURSOR --- */}
      <div 
        ref={cursorRef} 
        className={`hidden md:block fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out`}
        style={{ marginTop: '-12px', marginLeft: '-8px' }}
      >
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
              className={`drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-transform duration-300 ${isHovering ? 'scale-125 rotate-45' : 'rotate-0'}`}>
            <path d="M2 2L21 8L11 12L8 21L2 2Z" fill={theme.cursorFill} stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
         </svg>
      </div>

      <div 
        ref={cursorDotRef} 
        className={`hidden md:block fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out`}
      >
         <div className={`relative -top-3 -left-3 w-6 h-6 border border-dashed rounded-full flex items-center justify-center transition-all duration-300 ${isHovering ? 'scale-150 border-red-500 opacity-80 animate-spin-slow' : 'scale-50 border-red-400 opacity-40'}`}>
            <div className="w-0.5 h-full bg-red-500/20 absolute"></div>
            <div className="h-0.5 w-full bg-red-500/20 absolute"></div>
         </div>
      </div>

      {/* --- NOTIFICATION TOAST --- */}
      {notification && (
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce ${notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-emerald-500 text-white'}`}>
          {notification.type === 'error' ? <X size={20} /> : <Check size={20} />}
          <span className="font-bold text-sm tracking-wide">{notification.msg}</span>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${theme.nav}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => { setActiveTab('home'); setSelectedGame(null); }}
            >
              <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:rotate-6 transition duration-300">
                <Crown size={20} className="text-white fill-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter leading-none">
                  ANOZ<span className={theme.accent}>STORE</span>
                </h1>
                <p className={`text-[10px] font-bold tracking-widest uppercase ${theme.textMuted}`}>Official Gaming Shop</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setActiveTab('home')} className={`${activeTab === 'home' ? theme.accent : 'text-slate-400 hover:text-red-500'} font-bold text-sm tracking-wide transition cursor-pointer`}>BERANDA</button>
              <button onClick={() => setActiveTab('history')} className={`${activeTab === 'history' ? theme.accent : 'text-slate-400 hover:text-red-500'} font-bold text-sm tracking-wide transition cursor-pointer`}>RIWAYAT</button>
              <button onClick={() => setActiveTab('about')} className={`${activeTab === 'about' ? theme.accent : 'text-slate-400 hover:text-red-500'} font-bold text-sm tracking-wide transition cursor-pointer`}>TENTANG KAMI</button>
              
              {/* THEME TOGGLE BUTTON */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border cursor-pointer ${isDarkMode ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'}`}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} className="fill-current animate-spin-slow" /> : <Moon size={20} className="fill-current" />}
              </button>

              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Cari game..." 
                  className={`bg-transparent border ${theme.border} text-sm rounded-full pl-5 pr-10 py-2.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition w-56 ${theme.text} cursor-text`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className={`absolute right-4 top-3 ${theme.textMuted}`} size={16} />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-4">
               {/* Mobile Theme Toggle */}
               <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full cursor-pointer ${isDarkMode ? 'text-yellow-400' : 'text-red-600'}`}
              >
                {isDarkMode ? <Sun size={24} className="fill-current" /> : <Moon size={24} className="fill-current" />}
              </button>

               <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${theme.text} cursor-pointer`}>
                 {isMenuOpen ? <X /> : <Menu />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className={`md:hidden border-b p-6 space-y-4 animate-slide-down ${theme.card}`}>
             <input 
                  type="text" 
                  placeholder="Cari game..." 
                  className={`w-full ${theme.input} rounded-xl px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-red-500`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }} className={`block w-full text-left font-bold ${theme.text}`}>BERANDA</button>
              <button onClick={() => { setActiveTab('history'); setIsMenuOpen(false); }} className={`block w-full text-left font-bold ${theme.text}`}>RIWAYAT</button>
              <button onClick={() => { setActiveTab('about'); setIsMenuOpen(false); }} className={`block w-full text-left font-bold ${theme.text}`}>TENTANG KAMI</button>
          </div>
        )}
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 relative z-10">
        
        {/* VIEW: HOME (Game List) */}
        {!selectedGame && activeTab === 'home' && (
          <div className="animate-fade-in">
            
            {/* BANNER SLIDER */}
            <div className={`relative rounded-3xl overflow-hidden mb-8 border ${theme.border} shadow-2xl group h-[300px] md:h-[350px]`}>
               {/* Arrow Buttons */}
               <button 
                  onClick={prevBanner}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
               >
                  <ChevronLeft size={24} />
               </button>
               <button 
                  onClick={nextBanner}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 cursor-pointer"
               >
                  <ChevronRight size={24} />
               </button>

               {banners.map((banner, index) => (
                 <div 
                    key={banner.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex flex-col justify-center items-center md:items-start md:px-20 text-center md:text-left ${index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                 >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-90`}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    
                    {/* Content */}
                    <div className="relative z-20 max-w-2xl animate-fade-in-up">
                       <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                          <div className="p-3 bg-white/10 backdrop-blur rounded-full border border-white/20 animate-float">
                             {banner.icon}
                          </div>
                          <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-white tracking-widest border border-white/20 uppercase">Official Promo</span>
                       </div>
                       <h2 className="text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-lg mb-2">{banner.title}</h2>
                       <p className="text-white/80 text-lg md:text-xl font-medium mb-8">{banner.subtitle}</p>
                       <button className="bg-white text-red-700 font-black py-3 px-8 rounded-full transition transform hover:scale-105 shadow-xl flex items-center gap-2 mx-auto md:mx-0 cursor-pointer animate-shimmer-effect relative overflow-hidden">
                          LIHAT DETAIL <ChevronRight size={18} />
                       </button>
                    </div>
                 </div>
               ))}
               {/* Slider Dots */}
               <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
                 {banners.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentBanner(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentBanner ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
                    />
                 ))}
               </div>
            </div>

            {/* --- FLASH SALE SECTION --- */}
            <div className="mb-12">
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <Zap className="text-yellow-400 fill-yellow-400 animate-pulse" size={24} />
                    <h3 className={`text-xl font-black italic tracking-tighter ${theme.text}`}>FLASH SALE</h3>
                 </div>
                 <div className="flex items-center gap-2 bg-red-600 px-3 py-1 rounded-lg text-white font-mono font-bold text-sm animate-pulse-slow">
                    <Clock size={16} />
                    <span>{formatTime(timeLeft)}</span>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {name: '172 Diamonds', game: 'Mobile Legends', price: 40000, promo: 35000, img: 'bg-indigo-900'},
                    {name: '60 UC', game: 'PUBG Mobile', price: 14000, promo: 12500, img: 'bg-yellow-800'},
                    {name: 'Weekly Pass', game: 'Mobile Legends', price: 28000, promo: 24500, img: 'bg-blue-900'},
                    {name: 'Welkin Moon', game: 'Genshin Impact', price: 79000, promo: 69000, img: 'bg-purple-900'},
                  ].map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-2xl border relative overflow-hidden group cursor-pointer ${theme.card} ${theme.cardHover}`} style={{ animation: `fadeInUp 0.6s ease-out forwards ${idx * 0.1}s`, opacity: 0 }}>
                        <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 animate-pulse">
                           HEMAT {Math.round(((item.price - item.promo)/item.price)*100)}%
                        </div>
                        <div className={`h-24 rounded-xl ${item.img} mb-3 flex items-center justify-center`}>
                           <Zap className="text-white/50" />
                        </div>
                        <h4 className={`font-bold text-sm ${theme.text}`}>{item.name}</h4>
                        <p className="text-[10px] text-slate-500">{item.game}</p>
                        <div className="mt-2">
                           <p className="text-[10px] text-slate-400 line-through">Rp {item.price.toLocaleString()}</p>
                           <p className="text-red-500 font-bold text-sm">Rp {item.promo.toLocaleString()}</p>
                        </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Popular Section Header */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-500/10' : 'bg-red-100'}`}>
                    <Star className="text-red-500 fill-red-500" size={24} />
                  </div>
                  <h3 className={`text-2xl font-black tracking-tight ${theme.text}`}>SEMUA PRODUK</h3>
               </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="flex flex-wrap gap-2 mb-8 animate-fade-in-up">
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setSelectedCategory(cat.id)}
                   className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                     selectedCategory === cat.id 
                       ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/30' 
                       : `${theme.card} ${theme.textMuted} hover:border-red-500 hover:text-red-500`
                   }`}
                 >
                   {selectedCategory === cat.id && <Check size={14} strokeWidth={4} />}
                   {cat.label}
                 </button>
               ))}
            </div>

            {/* Game Grid Premium */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 min-h-[400px]">
              {games
                .filter(game => {
                   const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
                   const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
                   return matchesSearch && matchesCategory;
                })
                .map((game, index) => (
                <div 
                  key={game.id}
                  onClick={() => { setSelectedGame(game); window.scrollTo(0,0); }}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2 ${theme.card} ${theme.cardHover}`}
                  style={{ animation: `fadeInUp 0.6s ease-out forwards ${index * 0.05}s`, opacity: 0 }}
                >
                  {/* Image Area */}
                  <div className={`h-32 md:h-40 w-full ${game.image} flex items-center justify-center relative overflow-hidden`}>
                     {game.imgUrl ? (
                        <img 
                          src={game.imgUrl} 
                          alt={game.name} 
                          className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                        />
                     ) : (
                        <span className="text-5xl md:text-7xl font-black text-white/20 select-none group-hover:scale-110 group-hover:text-white/40 transition duration-500">{game.icon}</span>
                     )}
                     <div className={`absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500`}></div>
                     <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300 z-10">
                        <div className="bg-white text-red-600 p-2 rounded-full shadow-lg">
                           <Zap size={16} fill="currentColor" />
                        </div>
                     </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-4 md:p-5 relative z-10">
                    <h4 className={`font-bold text-sm md:text-base truncate ${theme.text} group-hover:text-red-500 transition`}>{game.name}</h4>
                    <p className={`text-[10px] md:text-xs ${theme.textMuted} mt-1 font-medium`}>{game.publisher}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features Section Premium */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-16 md:mt-20 pt-10 border-t ${theme.border}`}>
              <div className={`flex flex-col items-center text-center p-6 rounded-2xl ${theme.card} animate-fade-in-up`}>
                <div className="p-4 bg-red-500/10 rounded-full text-red-500 mb-4 animate-float"><Zap size={32} /></div>
                <h4 className={`font-bold text-lg ${theme.text}`}>Proses Kilat</h4>
                <p className={`text-sm ${theme.textMuted} mt-2 leading-relaxed`}>Sistem otomatis 24 jam. Hitungan detik langsung masuk.</p>
              </div>
              <div className={`flex flex-col items-center text-center p-6 rounded-2xl ${theme.card} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
                <div className="p-4 bg-green-500/10 rounded-full text-green-500 mb-4 animate-float" style={{ animationDelay: '1s' }}><ShieldCheck size={32} /></div>
                <h4 className={`font-bold text-lg ${theme.text}`}>100% Legal & Aman</h4>
                <p className={`text-sm ${theme.textMuted} mt-2 leading-relaxed`}>Transaksi terjamin aman. Garansi uang kembali jika gagal.</p>
              </div>
              <div className={`flex flex-col items-center text-center p-6 rounded-2xl ${theme.card} animate-fade-in-up`} style={{ animationDelay: '0.4s' }}>
                <div className="p-4 bg-yellow-500/10 rounded-full text-yellow-500 mb-4 animate-float" style={{ animationDelay: '2s' }}><Crown size={32} /></div>
                <h4 className={`font-bold text-lg ${theme.text}`}>Layanan VIP</h4>
                <p className={`text-sm ${theme.textMuted} mt-2 leading-relaxed`}>Prioritas pelayanan untuk kepuasan pengalaman belanja kamu.</p>
              </div>
            </div>

            {/* --- STATS COUNTER SECTION --- */}
            <div className={`mt-16 rounded-3xl p-8 border relative overflow-hidden ${theme.card}`}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                  {stats.map((stat, i) => (
                    <div key={stat.id} className="text-center" style={{ animation: `fadeInUp 0.5s ease-out forwards ${i * 0.2}s`, opacity: 0 }}>
                       <div className="inline-flex p-3 rounded-full bg-red-600/10 text-red-500 mb-3 animate-pulse-slow">
                          {stat.icon}
                       </div>
                       <h3 className={`text-2xl md:text-3xl font-black ${theme.text}`}>
                         <AnimatedCounter end={String(stat.value)} suffix={stat.suffix} />
                       </h3>
                       <p className={`text-xs md:text-sm uppercase tracking-widest font-bold ${theme.textMuted} mt-1`}>{stat.label}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* --- TESTIMONIALS SECTION --- */}
            <div className="mt-20">
               <div className="flex items-center gap-3 mb-8 justify-center">
                  <div className={`p-2 rounded-lg bg-red-500/10 animate-float`}>
                    <Quote className="text-red-500 fill-red-500" size={24} />
                  </div>
                  <h3 className={`text-2xl font-black tracking-tight ${theme.text} uppercase`}>Kata Mereka</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testimonials.map((testi, i) => (
                    <div key={testi.id} className={`p-6 rounded-2xl border transition-all hover:-translate-y-2 duration-300 ${theme.card}`} style={{ animation: `fadeInUp 0.5s ease-out forwards ${i * 0.2}s`, opacity: 0 }}>
                       <div className="flex items-center gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                          ))}
                       </div>
                       <p className={`text-sm italic mb-6 leading-relaxed ${theme.textMuted}`}>"{testi.quote}"</p>
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-white">
                             {testi.name.charAt(0)}
                          </div>
                          <div>
                             <h4 className={`font-bold text-sm ${theme.text}`}>{testi.name}</h4>
                             <p className="text-[10px] text-red-500 font-bold uppercase">{testi.role}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* --- FAQ SECTION --- */}
            <div className="mt-20 max-w-3xl mx-auto">
               <div className="text-center mb-10">
                  <h3 className={`text-2xl font-black ${theme.text}`}>PERTANYAAN UMUM</h3>
                  <p className={`${theme.textMuted} mt-2`}>Jawaban cepat untuk pertanyaan kamu</p>
               </div>
               <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div 
                      key={faq.id} 
                      className={`rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer ${theme.card} ${activeFaq === faq.id ? 'border-red-500 shadow-lg' : ''}`}
                      onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                    >
                       <div className="p-5 flex justify-between items-center">
                          <h4 className={`font-bold text-sm md:text-base ${theme.text}`}>{faq.q}</h4>
                          <ChevronDown className={`transition-transform duration-300 ${activeFaq === faq.id ? 'rotate-180 text-red-500' : theme.textMuted}`} />
                       </div>
                       <div className={`px-5 pb-5 text-sm ${theme.textMuted} leading-relaxed transition-all duration-300 ${activeFaq === faq.id ? 'block' : 'hidden'}`}>
                          {faq.a}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* --- PARTNER MARQUEE --- */}
            <div className="mt-20 py-8 overflow-hidden relative">
               <div className={`absolute inset-0 z-10 pointer-events-none bg-gradient-to-r ${isDarkMode ? 'from-[#050505] via-transparent to-[#050505]' : 'from-rose-50 via-transparent to-rose-50'}`}></div>
               <div className="flex gap-12 whitespace-nowrap animate-scroll-fast hover:[animation-play-state:paused]">
                  {[...Array(4)].map((_, i) => (
                     <React.Fragment key={i}>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">BCA</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">MANDIRI</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">BRI</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">DANA</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">OVO</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">GOPAY</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">SHOPEEPAY</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">QRIS</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">VISA</span>
                        <span className="text-2xl font-black text-slate-500/50 hover:text-slate-400 transition cursor-default">MASTERCARD</span>
                     </React.Fragment>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* VIEW: ABOUT US */}
        {activeTab === 'about' && (
           <div className="max-w-4xl mx-auto py-12 animate-fade-in px-4">
              <div className="text-center mb-16">
                 <h2 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${theme.text}`}>
                    THE STORY OF <span className="text-red-500 relative inline-block">
                       ANOZ
                       <svg className="absolute w-full h-3 -bottom-1 left-0 text-red-500 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                       </svg>
                    </span>
                 </h2>
                 <p className={`${theme.textMuted} text-lg max-w-2xl mx-auto`}>Mengenal lebih dekat sosok di balik brand gaming terpercaya.</p>
              </div>

              <div className={`rounded-3xl overflow-hidden border relative group hover:shadow-2xl transition-all duration-500 ${theme.card}`}>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-red-600/20 to-transparent rounded-bl-full -mr-16 -mt-16 z-0"></div>
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-red-600/10 to-transparent rounded-tr-full -ml-10 -mb-10 z-0"></div>

                 <div className="relative z-10 flex flex-col md:flex-row items-center p-8 md:p-12 gap-10">
                    <div className="flex-shrink-0 relative">
                       <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1.5 bg-gradient-to-br from-red-500 via-yellow-500 to-purple-600 animate-spin-slow">
                          <div className={`w-full h-full rounded-full overflow-hidden border-4 ${isDarkMode ? 'border-[#111]' : 'border-white'}`}>
                             <div className="w-full h-full bg-slate-800 flex items-center justify-center text-6xl font-black text-slate-700 select-none">
                                A
                             </div>
                          </div>
                       </div>
                       <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-2 rounded-full shadow-lg border-4 border-[#111] animate-bounce-slow">
                          <Crown size={24} fill="currentColor" />
                       </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-6">
                       <div>
                          <h3 className={`text-3xl font-black uppercase tracking-wide mb-1 ${theme.text}`}>Adisa Nawfal <span className="text-red-500">Zia-ul alam</span></h3>
                          <div className="inline-block px-4 py-1 rounded-full bg-red-600 text-white text-xs font-bold tracking-widest uppercase mb-4 shadow-lg shadow-red-600/20">Founder & CEO</div>
                       </div>
                       
                       <div className="space-y-4">
                          <p className={`leading-relaxed text-lg font-light ${theme.textMuted}`}>
                             <span className="font-bold text-red-500 text-xl">"ANOZ"</span> adalah sebuah brand dari sebuah nama individu personal bernama <strong className={theme.text}>Adisa Nawfal</strong>.
                          </p>
                          <p className={`leading-relaxed ${theme.textMuted}`}>
                             Nama ini sering diplesetin atau akrab dipanggil <strong className={`${theme.text} underline decoration-red-500 decoration-2 underline-offset-4`}>"NOpal"</strong> oleh teman-teman dan komunitasnya.
                          </p>
                          <p className={`leading-relaxed ${theme.textMuted}`}>
                             Dedikasi dan passion di dunia gaming melahirkan <strong>AnozStore</strong>, platform yang bertujuan memberikan kemudahan akses top-up game yang aman, cepat, dan terpercaya bagi seluruh gamers di Indonesia.
                          </p>
                       </div>

                       <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                          <p className="text-sm italic font-serif text-slate-500">"Gaming bukan sekadar hobi, tapi gaya hidup."</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                 <div className={`p-6 rounded-2xl border text-center ${theme.card} hover:-translate-y-2 transition-transform duration-300`}>
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-red-500">
                       <ShieldCheck size={28} />
                    </div>
                    <h4 className={`font-bold mb-2 ${theme.text}`}>Visi Kami</h4>
                    <p className={`text-sm ${theme.textMuted}`}>Menjadi platform top-up nomor 1 yang paling dipercaya gamers Indonesia.</p>
                 </div>
                 <div className={`p-6 rounded-2xl border text-center ${theme.card} hover:-translate-y-2 transition-transform duration-300`}>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-500">
                       <Zap size={28} />
                    </div>
                    <h4 className={`font-bold mb-2 ${theme.text}`}>Misi Kami</h4>
                    <p className={`text-sm ${theme.textMuted}`}>Memberikan pelayanan tercepat dengan harga termurah tanpa kompromi keamanan.</p>
                 </div>
                 <div className={`p-6 rounded-2xl border text-center ${theme.card} hover:-translate-y-2 transition-transform duration-300`}>
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-yellow-500">
                       <Users size={28} />
                    </div>
                    <h4 className={`font-bold mb-2 ${theme.text}`}>Komunitas</h4>
                    <p className={`text-sm ${theme.textMuted}`}>Membangun ekosistem gaming yang positif dan saling mendukung.</p>
                 </div>
              </div>
           </div>
        )}

        {/* VIEW: GAME DETAIL (Order Form) */}
        {selectedGame && (
          <div className="animate-fade-in max-w-5xl mx-auto">
            {/* Header / Back */}
            <button 
              onClick={handleBack} 
              className={`flex items-center ${theme.textMuted} hover:${theme.accent} mb-8 group font-bold tracking-wide transition cursor-pointer`}
            >
              <div className={`p-2 rounded-full mr-3 border ${theme.border} group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition`}>
                 <ChevronLeft size={20} />
              </div>
              Kembali ke Beranda
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Left Column: Game Info */}
              <div className="lg:col-span-1">
                <div className={`rounded-3xl p-6 border ${theme.card} lg:sticky lg:top-28 backdrop-blur-md animate-fade-in-up`}>
                  {/* Game Image Detail */}
                  <div className={`h-40 w-full rounded-2xl ${selectedGame.image} mb-6 flex items-center justify-center shadow-lg relative overflow-hidden`}>
                     {selectedGame.imgUrl ? (
                        <img 
                          src={selectedGame.imgUrl} 
                          alt={selectedGame.name} 
                          className="absolute inset-0 w-full h-full object-cover" 
                        />
                     ) : (
                        <span className="text-8xl font-black text-white/30 relative z-10">{selectedGame.icon}</span>
                     )}
                     {!selectedGame.imgUrl && <div className="absolute inset-0 bg-black/20"></div>}
                  </div>
                  
                  <h2 className={`text-2xl md:text-3xl font-black ${theme.text}`}>{selectedGame.name}</h2>
                  <p className={`${theme.textMuted} text-sm font-bold tracking-wider mt-1 uppercase`}>{selectedGame.publisher}</p>
                  
                  <div className={`mt-8 space-y-4 text-sm ${theme.textMuted} font-medium`}>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-red-500/20 bg-white/5 transition">
                      <Zap size={18} className="text-yellow-400 animate-pulse" />
                      <span>Proses Otomatis</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-red-500/20 bg-white/5 transition">
                      <Smartphone size={18} className="text-blue-400" />
                      <span>Layanan 24 Jam</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Form */}
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                {/* 1. Input Data */}
                <div className={`rounded-3xl p-6 md:p-8 border ${theme.card} animate-fade-in-up`} style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`bg-gradient-to-br from-red-500 to-red-700 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg shadow-lg shadow-red-500/30`}>1</span>
                    <h3 className={`text-xl font-bold ${theme.text}`}>Masukkan ID Akun</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 md:col-span-1">
                      <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted} mb-3 ml-1`}>User ID</label>
                      <input 
                        type="number" 
                        placeholder="Ketikan User ID" 
                        className={`w-full rounded-xl px-5 py-4 font-medium transition outline-none ${theme.input} cursor-text`}
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                    {(selectedGame.name === 'Mobile Legends' || selectedGame.name === 'Genshin Impact') && (
                      <div className="col-span-2 md:col-span-1">
                        <label className={`block text-xs font-bold uppercase tracking-wider ${theme.textMuted} mb-3 ml-1`}>Zone / Server</label>
                        <input 
                          type="number" 
                          placeholder="Contoh: (1234)" 
                          className={`w-full rounded-xl px-5 py-4 font-medium transition outline-none ${theme.input} cursor-text`}
                          value={serverId}
                          onChange={(e) => setServerId(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Pilih Item */}
                <div className={`rounded-3xl p-6 md:p-8 border ${theme.card} animate-fade-in-up`} style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`bg-gradient-to-br from-red-500 to-red-700 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg shadow-lg shadow-red-500/30`}>2</span>
                    <h3 className={`text-xl font-bold ${theme.text}`}>Pilih Nominal</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {selectedGame.items.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`cursor-pointer p-4 md:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                          selectedItem?.id === item.id 
                            ? `bg-red-500/10 border-red-500 ring-1 ring-red-500 shadow-xl shadow-red-900/10` 
                            : `${theme.bg} ${theme.border} hover:border-red-400`
                        }`}
                      >
                         <h4 className={`font-bold text-xs md:text-sm ${theme.text} group-hover:text-red-500 transition`}>{item.name}</h4>
                         <p className={`${theme.priceText} text-xs mt-2 font-bold`}>Rp {item.price.toLocaleString('id-ID')}</p>
                         
                         {selectedItem?.id === item.id && (
                           <div className="absolute top-0 right-0 p-1.5 bg-red-500 rounded-bl-xl shadow-md">
                             <Check size={14} className="text-white" />
                           </div>
                         )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Pilih Pembayaran */}
                <div className={`rounded-3xl p-6 md:p-8 border ${theme.card} animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`bg-gradient-to-br from-red-500 to-red-700 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg shadow-lg shadow-red-500/30`}>3</span>
                    <h3 className={`text-xl font-bold ${theme.text}`}>Pembayaran</h3>
                  </div>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div 
                        key={payment.id}
                        onClick={() => setSelectedPayment(payment)}
                        className={`flex items-center justify-between p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                          selectedPayment?.id === payment.id 
                           ? `bg-red-500/5 border-red-500 ring-1 ring-red-500` 
                           : `${theme.bg} ${theme.border} hover:border-red-400`
                        }`}
                      >
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-slate-900 font-black text-[10px] shadow-sm border border-slate-200">
                              {payment.id.toUpperCase().substring(0,4)}
                            </div>
                            <div>
                               <h4 className={`font-bold text-xs md:text-sm ${theme.text}`}>{payment.name}</h4>
                               <p className={`text-[10px] md:text-xs ${theme.textMuted}`}>Dicek Otomatis</p>
                            </div>
                         </div>
                         {selectedItem && (
                           <div className="text-right">
                              <p className={`font-bold ${theme.priceText} text-xs md:text-sm`}>
                                {formatRupiah(selectedItem.price + payment.fee)}
                              </p>
                              {payment.fee > 0 && <p className="text-[10px] text-red-500 font-medium">+Fee</p>}
                           </div>
                         )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Konfirmasi & Beli */}
                <div className="sticky bottom-6 z-30 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                   <div className={`p-4 md:p-6 rounded-3xl border ${theme.border} shadow-2xl backdrop-blur-xl ${isDarkMode ? 'bg-[#111111]/90' : 'bg-white/90'}`}>
                      <div className="flex justify-between items-end mb-4 md:mb-6">
                        <span className={`text-xs md:text-sm font-medium ${theme.textMuted}`}>Total Pembayaran</span>
                        <span className={`text-2xl md:text-3xl font-black ${theme.accent} tracking-tight`}>
                           {selectedItem && selectedPayment 
                             ? formatRupiah(selectedItem.price + selectedPayment.fee) 
                             : 'Rp 0'}
                        </span>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        disabled={!selectedItem || !selectedPayment || !userId}
                        className={`w-full py-3 md:py-4 rounded-2xl font-black text-base md:text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-lg cursor-pointer animate-shimmer-effect relative overflow-hidden ${
                          !selectedItem || !selectedPayment || !userId 
                            ? 'bg-slate-700/30 text-slate-500 cursor-not-allowed border border-transparent' 
                            : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-red-500/30 transform hover:-translate-y-1'
                        }`}
                      >
                        <CreditCard size={20} md={22} />
                        BELI SEKARANG
                      </button>
                   </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW: HISTORY */}
        {activeTab === 'history' && (
           <div className="max-w-3xl mx-auto py-16 text-center animate-fade-in">
              <div className={`rounded-3xl p-8 md:p-12 border ${theme.card} animate-fade-in-up`}>
                 <div className="w-20 h-20 md:w-24 md:h-24 bg-red-500/10 rounded-full mx-auto flex items-center justify-center mb-6 md:mb-8 border border-red-500/20 animate-pulse-slow">
                    <Search className="text-red-500" size={32} md={40} />
                 </div>
                 <h2 className={`text-2xl md:text-3xl font-black ${theme.text} mb-3`}>Lacak Pesanan</h2>
                 <p className={`${theme.textMuted} mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base`}>Masukkan nomor invoice transaksi kamu untuk melihat status pengiriman secara realtime.</p>
                 <div className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                    <input type="text" placeholder="INV-XXXXXX" className={`flex-1 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-red-500 transition ${theme.input} cursor-text`} />
                    <button className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-500 transition shadow-lg shadow-red-600/20 cursor-pointer">Cek</button>
                 </div>
              </div>
           </div>
        )}

      </main>

      {/* --- FOOTER PREMIUM --- */}
      <footer className={`border-t mt-20 pb-32 md:pb-12 transition-colors duration-500 ${isDarkMode ? 'bg-[#050505] border-white/5' : 'bg-white border-red-100'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center md:text-left">
           <div className="col-span-1 md:col-span-2 space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-red-400 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                    <Crown size={20} className="text-white fill-white" />
                  </div>
                  <h1 className={`text-2xl font-black ${theme.text}`}>ANOZ<span className="text-red-500">STORE</span></h1>
              </div>
              <p className={`text-sm max-w-sm leading-relaxed ${theme.textMuted}`}>
                Platform top-up game premium dengan standar keamanan tinggi. Nikmati kemudahan bertransaksi dengan harga kompetitif dan layanan prioritas.
              </p>

              {/* SOCIAL MEDIA ICONS */}
              <div className="flex items-center gap-4 mt-4">
                 {/* YouTube */}
                 <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group/social ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-red-600 hover:border-red-600' : 'bg-slate-100 border-slate-200 hover:bg-red-600 hover:border-red-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${theme.textMuted} group-hover/social:text-white`}>
                       <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                       <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                 </a>
                 {/* Instagram */}
                 <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group/social ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-pink-600 hover:border-pink-600' : 'bg-slate-100 border-slate-200 hover:bg-pink-600 hover:border-pink-600'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${theme.textMuted} group-hover/social:text-white`}>
                       <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                 </a>
                 {/* Discord (OFFICIAL LOGO) */}
                 <a href="#" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group/social ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-indigo-500 hover:border-indigo-500' : 'bg-slate-100 border-slate-200 hover:bg-indigo-500 hover:border-indigo-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={`transition-colors ${theme.textMuted} group-hover/social:text-white`}>
                       <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.772-.608 1.158a18.757 18.757 0 0 0-5.593 0c-.16-.386-.4-.783-.615-1.158a.074.074 0 0 0-.078-.037 19.742 19.742 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057c2.053 1.508 4.042 2.423 5.993 3.03a.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.653-.248-1.275-.55-1.872-.892a.077.077 0 0 1-.008-.128 10.2 10.2 0 0 1 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028c1.961-.607 3.95-1.522 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.533-9.748-3.567-13.636a.064.064 0 0 0-.031-.029zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
                    </svg>
                 </a>
              </div>
           </div>
           
           <div>
              <h4 className={`font-bold mb-4 md:mb-6 ${theme.text}`}>Navigasi</h4>
              <ul className={`space-y-3 text-sm ${theme.textMuted}`}>
                 <li><button onClick={() => setActiveTab('home')} className="hover:text-red-500 transition cursor-pointer">Beranda Utama</button></li>
                 <li><button onClick={() => setActiveTab('history')} className="hover:text-red-500 transition cursor-pointer">Cek Status Pesanan</button></li>
                 <li><a href="#" className="hover:text-red-500 transition cursor-pointer">Hubungi Support</a></li>
              </ul>
           </div>

           <div>
              <h4 className={`font-bold mb-4 md:mb-6 ${theme.text}`}>Pembayaran Resmi</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                 {['QRIS', 'DANA', 'OVO', 'GOPAY', 'BCA', 'MANDIRI'].map(m => (
                    <span key={m} className={`text-[10px] px-3 py-1.5 rounded-lg border font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>{m}</span>
                 ))}
              </div>
           </div>
        </div>
        <div className={`text-center text-xs py-8 border-t ${isDarkMode ? 'border-white/5 text-slate-600' : 'border-slate-100 text-slate-400'}`}>
           &copy; 2024 Official AnozStore Premium. All rights reserved.
        </div>
      </footer>
      
      {/* Mobile Bottom Navigation (Glassmorphism) */}
      <div className={`md:hidden fixed bottom-6 left-6 right-6 rounded-2xl border backdrop-blur-xl flex justify-around items-center p-4 z-50 shadow-2xl ${theme.nav}`}>
          <button onClick={() => { setActiveTab('home'); setSelectedGame(null); }} className={`flex flex-col items-center gap-1 transition cursor-pointer ${activeTab === 'home' && !selectedGame ? 'text-red-500 scale-110' : theme.textMuted}`}>
             <User size={22} className={activeTab === 'home' && !selectedGame ? 'fill-current' : ''} />
          </button>
           <div 
             className="w-14 h-14 bg-gradient-to-tr from-red-600 to-red-500 rounded-full -mt-10 border-[6px] flex items-center justify-center shadow-lg shadow-red-500/40 transform hover:scale-110 transition cursor-pointer"
             style={{ borderColor: isDarkMode ? '#111' : '#fff' }}
           >
             <ShoppingCart size={24} className="text-white fill-white" />
           </div>
          <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 transition cursor-pointer ${activeTab === 'history' ? 'text-red-500 scale-110' : theme.textMuted}`}>
             <Search size={22} />
          </button>
      </div>

    </div>
  );
};

export default AnozStore;