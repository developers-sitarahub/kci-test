'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Building, Leaf, Navigation, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function ProjectsInvestedIn() {
  const [properties, setProperties] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const iconMap: { [key: string]: any } = {
    Building: Building,
    MapPin: MapPin,
    Leaf: Leaf,
    Navigation: Navigation
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/invested-projects/`)
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error("Error fetching invested projects:", err));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/site-stats/`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching site stats:", err));
  }, []);

  return (
    <main className="flex flex-col flex-1 bg-white">
      {/* ── HERO ── */}
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden bg-gray-900 border-b-8 border-[#9c7c3d]">
        <div className="absolute inset-0 z-0">
          <Image
            src="5-2.png"
            alt="Houston skyline"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[#D4AF6A] text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-2">
            <Building size={14} />
            Our Portfolio
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-6xl font-cardo font-bold text-white leading-tight">
            Projects Invested In
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-gray-400 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
            A comprehensive look at our strategic investments across the Greater Houston area, featuring diverse assets from retail centers and multi-family developments to raw land.
          </motion.p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#FAF8F4] py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-200/50">
            {stats.length > 0 ? stats.map((stat, i) => {
              const IconComponent = iconMap[stat.icon] || Building;
              return (
                <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="flex flex-col items-center justify-center text-center px-4">
                  <IconComponent size={20} className="text-[#9c7c3d] mb-2" />
                  <span className="text-2xl md:text-3xl font-cardo font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</span>
                </motion.div>
              );
            }) : [
              { label: 'Total Projects', value: '12+', icon: Building },
              { label: 'Communities', value: '5+', icon: MapPin },
              { label: 'Asset Types', value: '4', icon: Leaf },
              { label: 'Region Focus', value: 'Texas', icon: Navigation }
            ].map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="flex flex-col items-center justify-center text-center px-4">
                <stat.icon size={20} className="text-[#9c7c3d] mb-2" />
                <span className="text-2xl md:text-3xl font-cardo font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {properties.map((p, i) => (
              <motion.div
                key={p.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div
                  className="relative w-full aspect-[4/3] overflow-hidden cursor-zoom-in"
                  onClick={() => setSelectedImage(p.image || "/images/building_1.png")}
                >
                  <Image
                    src={p.image || "/images/building_1.png"}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Tags */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    {(p.tags_list || []).map((tag: string) => (
                      <span key={tag} className="bg-white/95 text-gray-900 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#9c7c3d] transition-colors leading-snug">{p.title}</h3>
                  {p.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-auto">
                      <MapPin size={12} className="text-[#9c7c3d]" />
                      {p.location}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size project view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-white">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="max-w-3xl mx-auto text-center bg-[#FAF8F4] p-10 rounded-3xl border border-[#9c7c3d]/20">
          <h2 className="text-2xl md:text-3xl font-cardo font-bold text-gray-900 mb-4">Interested in Partnering With Us?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            We are actively seeking new investment opportunities and partnerships in the Houston metropolitan area. Let&apos;s discuss how we can build success together.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-[#9c7c3d] text-white font-medium px-8 py-3 rounded-lg hover:bg-[#7a5f2a] transition-colors">
            Contact Our Team
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
