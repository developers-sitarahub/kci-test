'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '/about' },
  {
    label: 'Properties',
    href: '/properties',
    children: [
      { label: 'For Lease', href: '/for-lease' },
      { label: 'For Sale', href: '/for-sale' },
    ],
  },
  { label: 'Projects Invested In', href: '/projects-invested-in' },
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const [propOpen, setPropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePropOpen, setMobilePropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : 'border-b border-gray-100'}`}>
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="logo.png"
            alt="KCI"
            width={240}
            height={70}
            priority
            style={{ height: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => setPropOpen(true)}
                onMouseLeave={() => setPropOpen(false)}
              >
                <button className="flex items-center gap-1.5 text-[15px] font-normal text-[#4a4a4a] hover:text-[#9c7c3d] transition-colors py-2">
                  {link.label}
                  <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-200 ${propOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {propOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-40 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                    >
                      {link.children.map((c) => (
                        <Link key={c.href} href={c.href}
                          className="block px-4 py-3 text-[14px] font-normal text-[#4a4a4a] hover:bg-[#FAF8F4] hover:text-[#9c7c3d] transition-colors">
                          {c.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={link.href} href={link.href}
                className="text-[15px] font-normal text-[#4a4a4a] hover:text-[#9c7c3d] transition-colors py-2">
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="flex flex-col px-6 py-3">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button onClick={() => setMobilePropOpen(!mobilePropOpen)}
                      className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-700">
                      {link.label}
                      <ChevronDown size={13} className={`transition-transform ${mobilePropOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {mobilePropOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="pl-4 border-l-2 border-[#9c7c3d]/30 overflow-hidden">
                          {link.children.map((c) => (
                            <Link key={c.href} href={c.href} onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-sm text-gray-600 hover:text-[#9c7c3d]">
                              {c.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-medium text-gray-700 hover:text-[#9c7c3d] border-b border-gray-50 last:border-none">
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
