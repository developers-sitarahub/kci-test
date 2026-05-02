"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import InquiryModal from "../components/InquiryModal";
import PropertyCard from "../components/PropertyCard";

export default function ForLeasePage() {
  const [selectedProperty, setSelectedProperty] = useState<{
    title: string;
    address: string;
  } | null>(null);

  const [activeProperties, setActiveProperties] = useState<any[]>([]);
  const [leasedProperties, setLeasedProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/properties/?property_type=FOR_LEASE`)
      .then((res) => res.json())
      .then((data: any[]) => {
        setActiveProperties(data.filter((p) => p.status === "ACTIVE"));
        setLeasedProperties(data.filter((p) => p.status === "LEASED"));
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  return (
    <div className="w-full bg-slate-50">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/building_2.png"
            alt="For Lease"
            fill
            className="object-cover opacity-20 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              Properties For Lease
            </h1>
            <div className="w-24 h-1 bg-[#c2a990] mx-auto mb-8 rounded-full" />
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-balance">
              Explore our current portfolio of prime commercial properties
              available for lease in the Houston area and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12 flex items-center gap-4">
            <span className="w-10 h-1 bg-[#905e0e] block rounded-full" />
            Available Now
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {activeProperties.map((prop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PropertyCard
                  prop={prop}
                  typeBadge="For Lease"
                  onInquire={(p) =>
                    setSelectedProperty({ title: p.title, address: p.address })
                  }
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12 flex items-center gap-4">
              <span className="w-10 h-1 bg-[#c2a990] block rounded-full" />
              Recently Leased
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leasedProperties.map((prop, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow border border-slate-100 flex flex-col sm:flex-row gap-6 relative overflow-hidden items-start"
                >
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-slate-50 rounded-full opacity-50" />
                  <div className="relative w-full sm:w-32 h-32 rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                    <Image
                      src={prop.image || "/images/building_2.png"}
                      alt={prop.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        {prop.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-[#905e0e] mb-3">
                      {prop.price && `${prop.price_currency === 'INR' ? '₹' : '$'} ${prop.price}`}
                      {prop.price && prop.size && ' · '}
                      {prop.size && `${prop.size} ${prop.size_unit === 'ACRE' ? 'Acres' : prop.size_unit === 'SQM' ? 'Sq. M.' : 'Sq. Ft.'}`}
                    </p>
                    <div className="flex items-start gap-2 text-slate-500 text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <p>{prop.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryModal
        isOpen={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
        propertyTitle={selectedProperty?.title || ""}
        propertyAddress={selectedProperty?.address || ""}
      />
    </div>
  );
}
