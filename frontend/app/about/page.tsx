"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, X, Building, MapPin, Leaf, Navigation } from "lucide-react";

export default function AboutPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/tenants/`)
      .then(res => res.json())
      .then(data => setTenants(data))
      .catch(err => console.error("Error fetching tenants:", err));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/site-stats/`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching site stats:", err));
  }, []);

  const iconMap: { [key: string]: any } = {
    Building: Building,
    MapPin: MapPin,
    Leaf: Leaf,
    Navigation: Navigation
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="w-full bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-white opacity-80" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight text-balance">
              About Us
            </h1>
            <div className="w-24 h-1 bg-[#905e0e] mx-auto mb-8 rounded-full" />
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed text-balance">
              Welcome to Kanji Capital Investments, a family-owned commercial real estate firm dedicated to serving the Houston, Texas community and beyond. With deep roots in the local market, we take pride in providing personalized, hands-on service to our clients, helping them achieve their real estate goals with integrity and expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Mission Section */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#c2a990] block" />
                  Our Story
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Founded by Anil Kanji in 2018, Kanji Capital Investments began as a vision to create a real estate firm focused on building lasting relationships and delivering exceptional results. As a family-owned business, we understand the importance of trust, reliability, and commitment, values that have guided us in the industry.
                </p>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-[#c2a990] block" />
                  Our Mission
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  At Kanji Capital Investments, our mission is simple: to exceed investor expectations by delivering unparalleled service, strategic insights, and innovative solutions tailored to their unique needs. Whether you&apos;re a local business owner seeking the perfect retail space, an investor looking to expand your portfolio, or a developer embarking on a new project, we&apos;re here to help you navigate the complexities of the commercial real estate market with confidence and clarity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
              }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] group"
            >
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500 z-10" />
              <Image
                src="/images/building_1.png"
                alt="Modern commercial real estate building"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Why Choose Us?</h2>
            <div className="w-24 h-1 bg-[#c2a990] mx-auto rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {[
              {
                title: "Local Expertise",
                desc: "With a deep understanding of the Houston market, we offer insider knowledge and valuable insights to help clients make informed decisions and capitalize on emerging opportunities."
              },
              {
                title: "Personalized Service",
                desc: "As a family-owned firm, we prioritize relationships and treat every client like a member of our own family. We take the time to understand your objectives, preferences, and concerns."
              },
              {
                title: "Dedicated Support",
                desc: "From the initial consultation to the closing table and beyond, our team provides dedicated support and guidance every step of the way. We're committed to your success."
              },
              {
                title: "Integrity and Transparency",
                desc: "Honesty, integrity, and transparency are the cornerstones of our business. We believe in open communication, ethical practices, and fair dealings."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-[#905e0e]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif group-hover:text-[#905e0e] transition-colors">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      {stats.length > 0 && (
        <section className="bg-white py-12 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:divide-x lg:divide-slate-100">
              {stats.map((stat, i) => {
                const IconComponent = iconMap[stat.icon] || Building;
                return (
                  <motion.div 
                    key={stat.label} 
                    custom={i} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={fadeInUp}
                    className="flex flex-col items-center justify-center text-center px-4"
                  >
                    <IconComponent size={28} className="text-[#905e0e] mb-4" strokeWidth={1.5} />
                    <span className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-2 truncate max-w-full">{stat.value}</span>
                    <span className="text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">{stat.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Our Portfolio Glimpse</h2>
          <div className="w-16 h-1 bg-[#c2a990] mt-4 rounded-full" />
        </div>
        <div className="flex flex-nowrap overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar pl-4 sm:pl-6 lg:pl-8 gap-6 max-w-[100vw]">
          {[1, 2, 3].map((num) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: num * 0.1, duration: 0.5 }}
              className="relative flex-none w-[80vw] sm:w-[50vw] lg:w-[30vw] aspect-[3/4] snap-center rounded-xl overflow-hidden shadow-lg group"
            >
              <Image
                src={`/images/building_${num}.png`}
                alt={`Real Estate Gallery ${num}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/building_2.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              Ready to embark on your next real estate journey?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Contact Kanji Capital Investments today to learn more about our services and how we can help you achieve your goals. We look forward to serving you and welcoming you into the Kanji Capital Investments family.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-[#905e0e] border border-transparent rounded-full hover:bg-[#7a4f0a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#905e0e] focus:ring-offset-slate-900 w-full sm:w-auto hover:-translate-y-1 shadow-lg"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 transition-all duration-200 bg-white border border-transparent rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-slate-900 w-full sm:w-auto hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                Our Tenants
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tenants Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Our Valued Tenants</h2>
                  <p className="text-sm text-slate-500">Trusted partners of Kanji Capital Investments</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
                  {tenants.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center aspect-square group hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={t.logo}
                          alt={t.name}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </motion.div>
                  ))}
                  {tenants.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-slate-400 font-medium">No tenants listed at this time.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}