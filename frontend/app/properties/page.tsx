'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Key } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function Properties() {
  return (
    <main className="flex flex-col flex-1 bg-[#FAF8F4]">
      {/* ── HERO ── */}
      <section className="relative w-full py-24 md:py-32 flex items-center justify-center overflow-hidden bg-gray-900 border-b-[6px] border-[#9c7c3d]">
        <div className="absolute inset-0 z-0">
          <Image
            src="5-2.png"
            alt="Houston properties"
            fill
            className="object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4">
          <motion.p custom={0} initial="hidden" animate="visible" variants={fadeUp}
            className="text-[#D4AF6A] text-xs font-bold tracking-[0.25em] uppercase">
            Our Portfolio
          </motion.p>
          <motion.h1 custom={1} initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-6xl font-cardo font-bold text-white leading-tight">
            Explore Properties
          </motion.h1>
          <motion.p custom={2} initial="hidden" animate="visible" variants={fadeUp}
            className="text-gray-400 text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
            Discover premier real estate investments across Greater Houston, from prime retail locations to available pad sites for development.
          </motion.p>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-6xl mx-auto w-full px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* For Lease */}
          <motion.div custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/for-lease" className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="for.png"
                  alt="Property For Lease"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-[#9c7c3d]">
                  <Key size={26} />
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <h2 className="text-3xl font-cardo font-bold text-gray-900 mb-4 group-hover:text-[#9c7c3d] transition-colors">Properties For Lease</h2>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  Find the perfect location for your business. We offer highly visible, high-traffic retail spaces and suites in thriving communities across Houston and Stafford.
                </p>
                <span className="inline-flex items-center gap-2 font-bold text-[#9c7c3d] group-hover:text-gray-900 transition-colors uppercase tracking-widest text-xs">
                  View Listings <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* For Sale */}
          <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Link href="/for-sale" className="group flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2 h-full">
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="for-sale.jpg"
                  alt="Property For Sale"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-[#9c7c3d]">
                  <Building size={26} />
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                <h2 className="text-3xl font-cardo font-bold text-gray-900 mb-4 group-hover:text-[#9c7c3d] transition-colors">Properties For Sale</h2>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  Seize new investment opportunities. Browse our active portfolio of commercial land, ready-to-build pad sites, and existing retail centers on the market.
                </p>
                <span className="inline-flex items-center gap-2 font-bold text-[#9c7c3d] group-hover:text-gray-900 transition-colors uppercase tracking-widest text-xs">
                  View Listings <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── INFO BANNER ── */}
      <section className="bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex-1">
            <h3 className="text-2xl font-cardo font-bold text-white mb-2">Looking for something specific?</h3>
            <p className="text-gray-400">Our brokers can help you find off-market deals and upcoming availabilities before they hit the market.</p>
          </div>
          <Link href="/contact" className="shrink-0 bg-[#9c7c3d] hover:bg-[#7a5f2a] text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-colors">
            Contact A Broker
          </Link>
        </div>
      </section>

    </main>
  );
}
