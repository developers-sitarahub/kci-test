"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

interface PropertyCardProps {
  prop: any;
  onInquire: (prop: any) => void;
  typeBadge: string;
}

export default function PropertyCard({ prop, onInquire, typeBadge }: PropertyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative w-full h-[540px] perspective-1000 group overflow-hidden rounded-2xl ${prop.description ? 'cursor-pointer' : 'cursor-default'}`}
      onClick={() => {
        if (prop.description) {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full h-full preserve-3d z-10"
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 backface-hidden w-full h-full rounded-2xl overflow-hidden bg-white shadow-lg">
          <div className="flex flex-col h-full border border-slate-100 rounded-2xl">
            <div className="relative h-72 w-full overflow-hidden">
              <Image 
                src={prop.image || "/images/building_1.png"} 
                alt={prop.title} 
                fill 
                unoptimized 
                className={`object-cover ${prop.description ? 'group-hover:scale-105' : ''} transition-transform duration-700`} 
              />
              <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur text-[10px] font-bold px-3 py-1.5 rounded-full text-white shadow-sm uppercase tracking-wider">
                {typeBadge}
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3 leading-snug">{prop.title}</h3>
              <div className="flex items-start gap-2 text-slate-500 mb-6">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#905e0e]" />
                <p className="text-sm">{prop.address}</p>
              </div>
              
              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                <div className="font-bold text-[#905e0e] text-lg flex flex-col items-start gap-1">
                  {prop.price && (
                    <span>
                      {prop.price_currency === 'INR' ? '₹' : '$'} {prop.price}
                    </span>
                  )}
                  {prop.size && (
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                      {prop.size} {prop.size_unit === 'ACRE' ? 'Acres' : prop.size_unit === 'SQM' ? 'Sq. M.' : 'Sq. Ft.'}
                    </span>
                  )}
                </div>
                {prop.description ? (
                  <div className="flex items-center text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-[#905e0e] transition-colors">
                    Inquiry <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onInquire(prop);
                    }}
                    className="flex items-center text-xs font-bold text-white bg-[#905e0e] px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-[#7a4f0c] transition-colors"
                  >
                    Inquiry <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full rounded-2xl overflow-hidden bg-white shadow-2xl p-8 border border-slate-100">
          <div className="flex flex-col h-full relative">
            <div className="absolute top-0 right-0 text-[#905e0e] text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
              Inquiry
            </div>

            <h3 className="text-2xl font-serif font-bold mb-6 text-slate-900 leading-snug">{prop.title}</h3>
            
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">About this Property</h4>
              <p className="text-slate-600 leading-relaxed text-sm mb-8">
                {prop.description || "Detailed description is being updated. Please inquire for more information."}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Area</h4>
                    <p className="text-slate-900 text-xs font-bold">
                        {prop.size} {prop.size_unit === 'ACRE' ? 'Acres' : prop.size_unit === 'SQM' ? 'Sq. M.' : 'Sq. Ft.'}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</h4>
                    <p className="text-[#905e0e] text-xs font-bold">
                        {prop.price_currency === 'INR' ? '₹' : '$'} {prop.price}
                    </p>
                  </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onInquire(prop);
                }}
                className="w-full bg-[#9c7c3d] hover:bg-[#856a34] text-white px-6 py-4 rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.98]"
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
