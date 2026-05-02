'use client';


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, ArrowRight, ChevronDown, TrendingUp, PieChart, RefreshCcw, Building2, UserCog, FileText, History, Building, Leaf, Navigation } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.12 } }),
};



export default function Home() {
  const [stats, setStats] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);

  const iconMap: { [key: string]: any } = {
    Building: Building,
    MapPin: MapPin,
    Leaf: Leaf,
    Navigation: Navigation
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/site-stats/`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching site stats:", err));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/tenants/`)
      .then(res => res.json())
      .then(data => setTenants(data))
      .catch(err => console.error("Error fetching tenants:", err));
  }, []);

  return (
    <main className="flex flex-col flex-1 bg-white">
      {/* ── HERO ── */}
      <section className="relative w-full min-h-[88vh] flex items-center justify-center overflow-hidden">
        <Image
          src="5-2.png"
          alt="Houston skyline at night"
          fill
          className="object-cover object-center"
          priority
          unoptimized
          sizes="100vw"
        />
        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[#D4AF6A] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
            Houston, Texas · Est. 2018
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-cardo font-bold text-white leading-[1.15]">
            Building Dreams,<br />Investing in the Future.
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-xl">
            Kanji Capital Investments is a family owned and operated company that invests in real estate deals — actively buying and selling, along with investing in private equity deals.
          </motion.p>
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Link href="/about"
              className="inline-flex items-center gap-2 bg-[#9c7c3d] hover:bg-[#7a5f2a] text-white font-semibold px-8 py-3.5 rounded-lg transition-colors duration-300 group">
              About Us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/properties"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-medium px-8 py-3.5 rounded-lg transition-colors duration-300 backdrop-blur-sm">
              View Properties
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
          <ChevronDown size={26} />
        </motion.div>
      </section>

      {/* ── INTRO TEXT ── */}
      <section className="py-24 px-6 bg-[#FAF8F4]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="max-w-3xl mx-auto text-center">
          <p className="text-[#9c7c3d] text-xs font-bold tracking-[0.2em] uppercase mb-4">Who We Are</p>
          <h2 className="text-3xl md:text-[40px] font-cardo font-bold text-gray-900 leading-tight mb-6">
            A Family-Owned Real Estate Firm Built on Trust
          </h2>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            Founded by Anil Kanji in 2018, Kanji Capital Investments has deep roots in the Houston community. Our drive and passion for real estate has blossomed into a thriving enterprise — guided by family values and a commitment to excellence.
          </p>
          <Link href="/about"
            className="inline-flex items-center gap-2 bg-[#9c7c3d] hover:bg-[#7a5f2a] text-white font-medium px-8 py-3.5 rounded-xl transition-colors duration-300 shadow-md">
            Our Story
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      {stats.length > 0 && (
        <section className="bg-white py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-gray-100">
              {stats.map((stat, i) => {
                const IconComponent = iconMap[stat.icon] || Building;
                return (
                  <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="flex flex-col items-center justify-center text-center">
                    <IconComponent size={28} className="text-[#9c7c3d] mb-4" strokeWidth={1.5} />
                    <span className="text-3xl md:text-5xl font-cardo font-bold text-gray-900 mb-2 truncate max-w-full px-2">{stat.value}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── OUR TENANTS ── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="w-full max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-[36px] font-cardo font-bold text-gray-900">Our Tenants</h2>
          </div>
          {/* Mobile & Tablet Grid */}
          <div className="flex min-[1367px]:hidden flex-wrap justify-center items-center gap-x-4 gap-y-8 sm:gap-10 px-2 lg:px-8">
            {tenants.map((t, i) => (
              <motion.div key={`${t.id}-mob`} custom={i}
                initial={{ opacity: 0, y: 30, filter: 'grayscale(100%)' }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: 'grayscale(0%)',
                  transition: {
                    opacity: { duration: 0.6, delay: i * 0.1 },
                    y: { duration: 0.6, delay: i * 0.1 },
                    filter: { duration: 0.6, delay: 1.2 + (i * 0.2) }
                  }
                }}
                viewport={{ once: true }}
                className="relative w-[42%] h-28 sm:w-[30%] sm:h-36 md:w-[28%] md:h-44 lg:h-48 flex items-center justify-center">
                <Image src={t.logo} alt={t.name} fill className="object-contain" sizes="(max-width: 1366px) 300px, 0px" unoptimized />
              </motion.div>
            ))}
          </div>

          {/* Desktop Display */}
          <div className="hidden min-[1367px]:flex flex-nowrap justify-center items-center gap-8">
            {tenants.map((t, i) => (
              <motion.div key={`${t.id}-desk`} custom={i}
                initial={{ opacity: 0, y: 30, filter: 'grayscale(100%)' }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: 'grayscale(0%)',
                  transition: {
                    opacity: { duration: 0.6, delay: i * 0.1 },
                    y: { duration: 0.6, delay: i * 0.1 },
                    filter: { duration: 0.6, delay: 1.2 + (i * 0.2) }
                  }
                }}
                viewport={{ once: true }}
                className="relative w-auto h-[220px] xl:h-[280px] flex-1 flex items-center justify-center transition-transform duration(500) hover:scale-105">
                <Image src={t.logo} alt={t.name} fill className="object-contain" sizes="300px" unoptimized />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── INVESTMENT HIGHLIGHTS ── */}
      <section className="bg-gradient-to-r from-[#7a5f2a] via-[#8B6E2A] to-[#7a5f2a] py-16 lg:py-24 px-6 shadow-inner">
        <div className="w-full max-w-[1700px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-14 gap-x-8 text-center text-white">
            {[
              { icon: TrendingUp, label: "Higher Returns" },
              { icon: PieChart, label: "Diverse Assets" },
              { icon: RefreshCcw, label: "Stable Cashflow" },
              { icon: Building2, label: "Asset Growth" },
              { icon: UserCog, label: "Control Overtime" },
              { icon: FileText, label: "Tax Benefits" },
              { icon: History, label: "Longterm Stability" },
            ].map((item, i) => (
              <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-center lg:gap-5 gap-4 group cursor-default">
                <item.icon strokeWidth={1.5} className="w-12 h-12 lg:w-[60px] lg:h-[60px] text-[#E5D8B8] group-hover:scale-110 group-hover:-translate-y-2 group-hover:text-white transition-all duration-300 drop-shadow-sm" />
                <span className="font-cardo font-bold text-sm md:text-base lg:text-lg tracking-wider text-white/95 group-hover:text-white transition-colors duration-300 whitespace-nowrap">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT BAR ── */}
      <section className="py-24 px-6 bg-white border-b border-gray-100">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7c3d] text-sm font-bold tracking-[0.2em] uppercase mb-4">
              One Step Closer to Your Future Growth!
            </p>
            <h2 className="text-3xl font-cardo font-bold text-gray-900">Get in Touch</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { href: "tel:+18322124089", icon: Phone, title: "Call Us", sub: "832-212-4089" },
              { href: null, icon: MapPin, title: "Find Us", sub: "6655 Harwin Drive Ste.101-B\nHouston, Texas 77036" },
              { href: "mailto:anil@kanjicapitalinvestments.com", icon: Mail, title: "Email Us", sub: "anil@kanjicapitalinvestments.com" },
            ].map(({ href, icon: Icon, title, sub }) => {
              const inner = (
                <div className="flex flex-col items-center gap-5 p-12 rounded-3xl bg-white border border-gray-200 hover:border-[#9c7c3d]/40 shadow-sm hover:shadow-xl transition-all duration-300 text-center h-full group">
                  <div className="w-16 h-16 rounded-2xl bg-[#FAF8F4] flex items-center justify-center mb-2 group-hover:bg-[#9c7c3d] transition-colors duration-300">
                    <Icon size={26} className="text-[#8B6E2A] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="font-bold text-gray-900 text-xl">{title}</p>
                  <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">{sub}</p>
                </div>
              );
              return href
                ? <a key={title} href={href}>{inner}</a>
                : <div key={title}>{inner}</div>;
            })}
          </div>
        </motion.div>
      </section>


    </main>
  );
}
